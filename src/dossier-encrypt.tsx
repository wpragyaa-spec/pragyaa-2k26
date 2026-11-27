/**
 * Bridge between the vanilla-DOM dossier (dossier.js) and Aceternity's
 * <EncryptedText> (src/components/ui/encrypted-text.tsx).
 *
 * dossier.js renders by writing textContent / innerHTML. To let it keep doing
 * that, each element gets a fresh inline *host* span (the React root) that
 * dossier.js never touches:
 *
 *   <el><span class="enc-host"><EncryptedText text="real text" /></span></el>
 *
 * - No layout shift: the dossier typesets in JetBrains Mono (monospace), so
 *   cipher glyphs are exactly as wide as the real ones and the text flows
 *   and wraps exactly like the plain version.
 * - When dossier.js rewrites an element, the host is simply detached; the
 *   orphaned React root is unmounted on the next pass (no React errors,
 *   no leaks).
 * - el.dataset.encText keeps the true text for code that reads it back
 *   mid-scramble (CTA flash/restore handlers).
 * - prefers-reduced-motion: elements are left as plain text.
 */
import { memo, useEffect, useState } from "react";
import { createRoot, type Root } from "react-dom/client";
import { EncryptedText } from "@/src/components/ui/encrypted-text";
import "./dossier-encrypt.css";

const CHARSET = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789#%&@$/<>[]{}=+";

export type EncryptOptions = {
  /** ms to wait before this element starts decrypting (stagger). */
  delay?: number;
  /** total time the reveal should take, spread across the characters. */
  duration?: number;
  /** extra class on the host (e.g. a style variant). */
  variant?: "title" | "label" | "body" | "cta";
  /** replay even if the element still shows a previous reveal (static text). */
  restart?: boolean;
};

type Mounted = { root: Root; host: HTMLElement };
const mounted = new Map<HTMLElement, Mounted>();

const reducedMotion = () =>
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

function scrambleOnce(text: string) {
  let out = "";
  for (const ch of text) {
    out += /\s/.test(ch) ? ch : CHARSET.charAt(Math.floor(Math.random() * CHARSET.length));
  }
  return out;
}

/** Waits for its stagger slot, showing a dim static cipher, then decrypts. */
const DelayedEncrypted = memo(function DelayedEncrypted({
  text,
  delay,
  revealDelayMs,
}: {
  text: string;
  delay: number;
  revealDelayMs: number;
}) {
  const [started, setStarted] = useState(delay <= 0);
  const [cipher] = useState(() => scrambleOnce(text));

  useEffect(() => {
    if (started) return undefined;
    const t = window.setTimeout(() => setStarted(true), delay);
    return () => window.clearTimeout(t);
  }, [started, delay]);

  if (!started) {
    return (
      <span className="enc-wait" aria-label={text}>
        {cipher}
      </span>
    );
  }
  return (
    <EncryptedText
      text={text}
      revealDelayMs={revealDelayMs}
      flipDelayMs={40}
      charset={CHARSET}
      encryptedClassName="enc-scr"
      revealedClassName="enc-rev"
    />
  );
});

/** Unmount roots whose host was detached by a textContent/innerHTML write. */
export function sweepEncrypted() {
  mounted.forEach((m, el) => {
    if (!m.host.isConnected || m.host.parentElement !== el) {
      m.root.unmount();
      mounted.delete(el);
    }
  });
}

/** Decrypt-reveal the current text of `el`. Safe to call repeatedly. */
export function encryptText(el: Element | null, opts: EncryptOptions = {}) {
  if (!(el instanceof HTMLElement)) return;
  let text = "";
  const prev = mounted.get(el);
  if (prev) {
    const stillAttached = prev.host.parentElement === el;
    // already showing this host and not asked to replay → nothing to do
    if (stillAttached && !opts.restart) return;
    // replaying static text: the visible text may still be mid-scramble, so
    // use the recorded original
    if (stillAttached) text = el.dataset.encText || "";
    prev.root.unmount();
    mounted.delete(el);
  }
  if (!text) text = (el.textContent || "").replace(/\s+/g, " ").trim();
  if (!text || reducedMotion()) return;

  const { delay = 0, duration = 700, variant = "label" } = opts;
  const revealDelayMs = Math.max(6, Math.min(60, Math.round(duration / text.length)));

  const host = document.createElement("span");
  host.className = `enc-host enc-host--${variant}`;

  el.textContent = "";
  el.appendChild(host);
  // the true text, for code that reads it back while a scramble is running
  el.dataset.encText = text;

  const root = createRoot(host);
  root.render(<DelayedEncrypted text={text} delay={delay} revealDelayMs={revealDelayMs} />);
  mounted.set(el, { root, host });
}

/**
 * Encrypt every match of `selector` inside `scope`, staggered.
 * `start` is the first delay, `step` the gap between elements.
 */
export function encryptAll(
  scope: ParentNode | null,
  selector: string,
  { start = 0, step = 60, duration, variant, restart }: { start?: number; step?: number } & Omit<EncryptOptions, "delay"> = {},
) {
  if (!scope) return start;
  const els = scope.querySelectorAll(selector);
  els.forEach((el, i) => encryptText(el, { delay: start + i * step, duration, variant, restart }));
  return start + els.length * step;
}
