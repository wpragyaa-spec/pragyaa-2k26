// Shared motion utilities for PRAGYA 2027.
// One GSAP instance, small helpers for text splitting, body-class watching,
// pointer tracking and a scroll-progress "gate" used by the intro and hero.
import gsap from 'gsap';

export { gsap };

export const prefersReducedMotion = () =>
  window.matchMedia('(prefers-reduced-motion: reduce)').matches;

export const hasFinePointer = () =>
  window.matchMedia('(hover: hover) and (pointer: fine)').matches;

/** Run `cb(classList)` whenever <body>'s class changes. Returns a disposer. */
export function onBodyClass(cb) {
  const mo = new MutationObserver(() => cb(document.body.classList));
  mo.observe(document.body, { attributes: true, attributeFilter: ['class'] });
  cb(document.body.classList);
  return () => mo.disconnect();
}

/**
 * Wrap each character of `el` in `<span class="m-ch">`. Returns the spans.
 * Idempotent: a second call returns the existing spans.
 */
export function splitChars(el) {
  if (!el) return [];
  if (el.dataset.splitChars) return [...el.querySelectorAll('.m-ch')];
  const text = el.textContent;
  el.textContent = '';
  const spans = [...text].map((c) => {
    const s = document.createElement('span');
    s.className = 'm-ch';
    s.textContent = c === ' ' ? ' ' : c;
    el.appendChild(s);
    return s;
  });
  el.dataset.splitChars = '1';
  el.setAttribute('aria-label', text);
  return spans;
}

/**
 * Split `el`'s text into visual lines: each line becomes
 * `<span class="m-line"><span class="m-line-in">…</span></span>` so it can be
 * revealed from behind a mask. Re-splits when the width changes (and once
 * the element first gets a width, if it started hidden); `onBuild(lines)`
 * runs after every split so the caller can restore its animation state.
 * Returns { lines(): HTMLElement[], destroy() }.
 */
export function splitLines(el, { onBuild } = {}) {
  if (!el) return { lines: () => [], destroy() {} };
  const original = el.textContent.trim();
  el.setAttribute('aria-label', original);

  function build() {
    el.textContent = '';
    const words = original.split(/\s+/).map((w) => {
      const s = document.createElement('span');
      s.textContent = w + ' ';
      s.style.display = 'inline';
      el.appendChild(s);
      return s;
    });
    // group words by their rendered line
    const groups = [];
    let lastTop = null;
    words.forEach((w) => {
      const top = w.offsetTop;
      if (lastTop === null || Math.abs(top - lastTop) > 2) groups.push([]);
      groups[groups.length - 1].push(w.textContent);
      lastTop = top;
    });
    el.textContent = '';
    groups.forEach((g) => {
      const line = document.createElement('span');
      line.className = 'm-line';
      line.setAttribute('aria-hidden', 'true');
      const inner = document.createElement('span');
      inner.className = 'm-line-in';
      inner.textContent = g.join('').trim();
      line.appendChild(inner);
      el.appendChild(line);
    });
    if (onBuild) onBuild([...el.querySelectorAll('.m-line-in')]);
  }

  build();
  let w = el.clientWidth;
  let raf = 0;
  // Re-split on the next frame (not inside the observer callback) to avoid
  // ResizeObserver loop warnings; ignore zero-width (display:none) states.
  const ro = new ResizeObserver(() => {
    cancelAnimationFrame(raf);
    raf = requestAnimationFrame(() => {
      const cw = el.clientWidth;
      if (cw === 0 || Math.abs(cw - w) <= 4) return;
      w = cw;
      build();
    });
  });
  ro.observe(el);
  return {
    lines: () => [...el.querySelectorAll('.m-line-in')],
    destroy: () => { cancelAnimationFrame(raf); ro.disconnect(); },
  };
}

/**
 * Normalised pointer position (-1..1 on both axes), eased. Calls
 * `cb(x, y)` on every animation frame while the pointer is settling.
 * Fine pointers only; returns a disposer.
 */
export function trackPointer(cb, { ease = 0.08 } = {}) {
  if (!hasFinePointer() || prefersReducedMotion()) return () => {};
  let tx = 0, ty = 0, x = 0, y = 0, raf = 0;
  const loop = () => {
    raf = 0;
    x += (tx - x) * ease;
    y += (ty - y) * ease;
    cb(x, y);
    if (Math.abs(tx - x) > 0.0005 || Math.abs(ty - y) > 0.0005) raf = requestAnimationFrame(loop);
  };
  const onMove = (e) => {
    tx = (e.clientX / window.innerWidth) * 2 - 1;
    ty = (e.clientY / window.innerHeight) * 2 - 1;
    if (!raf) raf = requestAnimationFrame(loop);
  };
  const onLeave = () => {
    tx = 0;
    ty = 0;
    if (!raf) raf = requestAnimationFrame(loop);
  };
  window.addEventListener('pointermove', onMove, { passive: true });
  document.documentElement.addEventListener('pointerleave', onLeave);
  return () => {
    cancelAnimationFrame(raf);
    window.removeEventListener('pointermove', onMove);
    document.documentElement.removeEventListener('pointerleave', onLeave);
  };
}

/**
 * Scroll-progress gate. While `isActive()` is true it captures wheel, touch
 * and keyboard scrolling (before the site's own stage handlers) and turns it
 * into a smoothed progress value 0..1 passed to `onUpdate(p, committed)`.
 *
 * - Releasing past `threshold` commits: progress glides to 1 and `onCommit`
 *   fires once. Releasing earlier eases back to 0.
 * - `commit()` can also be called directly (e.g. from a "scroll" button).
 */
export function createScrollGate({
  isActive,
  onUpdate,
  onCommit,
  threshold = 0.3,
  idleMs = 600,
  smoothing = 0.085,
  wheelDistance = () => window.innerHeight,
}) {
  let target = 0, cur = 0, committed = false, raf = 0, idleT = 0;
  let touchY = null, touchP = 0;
  const clamp = (v) => Math.min(1, Math.max(0, v));

  function tick() {
    raf = 0;
    cur += (target - cur) * smoothing;
    if (Math.abs(target - cur) < 0.0008) cur = target;
    onUpdate(cur, committed);
    if (cur !== target) raf = requestAnimationFrame(tick);
  }
  const kick = () => { if (!raf) raf = requestAnimationFrame(tick); };

  function commit() {
    if (committed) return;
    committed = true;
    clearTimeout(idleT);
    target = 1;
    kick();
    if (onCommit) onCommit();
  }
  function settle() {
    if (committed) return;
    if (target >= threshold) commit();
    else { target = 0; kick(); }
  }
  function nudge(d) {
    if (committed) return;
    target = clamp(target + d);
    if (target >= 1) commit();
    else { clearTimeout(idleT); idleT = setTimeout(settle, idleMs); }
    kick();
  }

  const swallow = (e) => { e.stopImmediatePropagation(); if (e.cancelable) e.preventDefault(); };

  const onWheel = (e) => {
    if (!isActive()) return;
    swallow(e);
    const dy = e.deltaMode === 1 ? e.deltaY * 16 : e.deltaY;
    nudge(dy / wheelDistance());
  };
  const onTouchStart = (e) => {
    if (!isActive() || e.touches.length !== 1) { touchY = null; return; }
    e.stopImmediatePropagation();
    touchY = e.touches[0].clientY;
    touchP = target;
    clearTimeout(idleT);
  };
  const onTouchMove = (e) => {
    if (touchY === null || !isActive()) return;
    swallow(e);
    if (committed) return;
    target = clamp(touchP + (touchY - e.touches[0].clientY) / (window.innerHeight * 0.85));
    kick();
  };
  const onTouchEnd = () => {
    if (touchY === null) return;
    touchY = null;
    settle();
  };
  const onKey = (e) => {
    if (!isActive()) return;
    if (['ArrowDown', 'PageDown', ' ', 'Spacebar', 'Enter'].includes(e.key)) {
      swallow(e);
      nudge(0.5);
    } else if (['ArrowUp', 'PageUp'].includes(e.key)) {
      swallow(e);
      nudge(-0.5);
    }
  };

  const opts = { capture: true, passive: false };
  window.addEventListener('wheel', onWheel, opts);
  window.addEventListener('touchstart', onTouchStart, { capture: true, passive: true });
  window.addEventListener('touchmove', onTouchMove, opts);
  window.addEventListener('touchend', onTouchEnd, { capture: true, passive: true });
  window.addEventListener('keydown', onKey, { capture: true });

  return {
    commit,
    get progress() { return cur; },
    destroy() {
      cancelAnimationFrame(raf);
      clearTimeout(idleT);
      window.removeEventListener('wheel', onWheel, opts);
      window.removeEventListener('touchstart', onTouchStart, { capture: true });
      window.removeEventListener('touchmove', onTouchMove, opts);
      window.removeEventListener('touchend', onTouchEnd, { capture: true });
      window.removeEventListener('keydown', onKey, { capture: true });
    },
  };
}
