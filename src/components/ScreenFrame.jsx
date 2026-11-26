import { useLayoutEffect, useRef, useState } from 'react';
import './ScreenFrame.css';

// Minimal HUD frame around the screen: layered angular corner brackets, a thin perimeter
// that steps down after the corner tabs and rises into raised double-line tabs at the top
// and bottom centre, segmented side markings, small diagonal stripes and two tiny labels.
//
// Drawn as one SVG at the frame's real pixel size (redrawn on resize), so every cut and
// step stays crisp and lined up at any width. Purely decorative: aria-hidden and
// pointer-events: none. Mounted inside #stage (components/Stage.jsx), above the
// background art and below every button, the countdown and the rest of the UI.

// geometry per breakpoint (px)
function geometry(vw) {
  if (vw <= 600) return { cut: 12, step: 5, tab: 44, mid: 46, glow: 22, inset: 6, bracket: 26, seg: 22, bar: 46 };
  if (vw <= 900) return { cut: 18, step: 6, tab: 150, mid: 100, glow: 44, inset: 7, bracket: 40, seg: 30, bar: 70 };
  return { cut: 22, step: 7, tab: 230, mid: 150, glow: 60, inset: 8, bracket: 50, seg: 34, bar: 84 };
}

function framePaths(w, h, g) {
  const { cut: c, step: s, tab: t, mid: m, inset: i, bracket: b, seg, bar } = g;
  const x0 = 0.5, y0 = 0.5, x1 = w - 0.5, y1 = h - 0.5, cx = w / 2;
  const P = (pts) => pts.map(([x, y], n) => `${n ? 'L' : 'M'}${x} ${y}`).join(' ');

  // perimeter: corner cut -> tab at the outer edge -> step in -> edge -> step out into the centre tab
  const perimeter = P([
    [x0, y0 + c], [x0 + c, y0], [t, y0], [t + s, y0 + s], [cx - m - s, y0 + s], [cx - m, y0], [cx + m, y0],
    [cx + m + s, y0 + s], [w - t - s, y0 + s], [w - t, y0], [x1 - c, y0], [x1, y0 + c],
    [x1, y1 - c], [x1 - c, y1], [w - t, y1], [w - t - s, y1 - s], [cx + m + s, y1 - s], [cx + m, y1],
    [cx - m, y1], [cx - m - s, y1 - s], [t + s, y1 - s], [t, y1], [x0 + c, y1], [x0, y1 - c],
  ]) + ' Z';

  // layered inner brackets, one per corner
  const k = c - 4;
  const brackets = [
    P([[i, i + b], [i, i + k], [i + k, i], [i + b * 0.8, i]]),
    P([[w - i, i + b], [w - i, i + k], [w - i - k, i], [w - i - b * 0.8, i]]),
    P([[i, h - i - b], [i, h - i - k], [i + k, h - i], [i + b * 0.8, h - i]]),
    P([[w - i, h - i - b], [w - i, h - i - k], [w - i - k, h - i], [w - i - b * 0.8, h - i]]),
  ].join(' ');

  // segmented side markings: a bright segment on each side edge near every corner, plus ticks
  const sy = c + b + 14;
  const segments = [
    `M${x0} ${sy} V${sy + seg}`, `M${x1} ${sy} V${sy + seg}`,
    `M${x0} ${h - sy - seg} V${h - sy}`, `M${x1} ${h - sy - seg} V${h - sy}`,
  ].join(' ');
  const tickY = [0, 6, 12].map((d) => sy + seg + 10 + d);
  const ticks = tickY.map((y) => `M3 ${y} H8 M${w - 8} ${y} H${w - 3} M3 ${h - y} H8 M${w - 8} ${h - y} H${w - 3}`).join(' ');

  // bottom-corner bar segments, inside the edge
  const by = h - i;
  const bars = [
    `M${c + 20} ${by} H${c + 20 + bar} M${c + 26 + bar} ${by} H${c + 36 + bar}`,
    `M${w - c - 20} ${by} H${w - c - 20 - bar} M${w - c - 26 - bar} ${by} H${w - c - 36 - bar}`,
  ].join(' ');

  // second line inside the raised centre tabs (the double-line accent)
  const dy = Math.max(3, s - 3);
  const doubles = `M${cx - m + 12} ${y0 + dy} H${cx + m - 12} M${cx - m + 12} ${y1 - dy} H${cx + m - 12}`;

  // glowing centre highlights on the top and bottom tabs
  const glow = `M${cx - g.glow} ${y0} H${cx + g.glow} M${cx - g.glow} ${y1} H${cx + g.glow}`;

  // three small diagonal stripes beside "MULTIVERSE SYSTEM", just past the corner bracket
  const stripes = [0, 1, 2].map((n) => {
    const x = w - i - b * 0.8 - 10 - n * 8;
    return `M${x} 4 L${x + 5} 4 L${x + 1} 12 L${x - 4} 12 Z`;
  }).join(' ');

  return { perimeter, brackets, segments, ticks, bars, doubles, glow, stripes };
}

export default function ScreenFrame() {
  const ref = useRef(null);
  const [box, setBox] = useState(null);

  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return undefined;
    const measure = () => {
      const r = el.getBoundingClientRect();
      setBox((prev) => (prev && prev.w === Math.round(r.width) && prev.h === Math.round(r.height) && prev.vw === window.innerWidth
        ? prev
        : { w: Math.round(r.width), h: Math.round(r.height), vw: window.innerWidth }));
    };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const g = box && geometry(box.vw);
  const p = box && framePaths(box.w, box.h, g);

  return (
    <div className="pragya-screen-frame" ref={ref} aria-hidden="true">
      {p && (
        <svg className="psf-svg" width={box.w} height={box.h} viewBox={`0 0 ${box.w} ${box.h}`} focusable="false">
          <path className="psf-line" d={p.perimeter} />
          <path className="psf-line psf-dim" d={p.doubles} />
          <path className="psf-bright" d={p.brackets} />
          <path className="psf-bright" d={p.segments} />
          <path className="psf-line" d={p.ticks} />
          <path className="psf-bright" d={p.bars} />
          <path className="psf-glow" d={p.glow} />
          <path className="psf-stripes" d={p.stripes} />
        </svg>
      )}
      <div className="psf-label psf-label-left">PRAGYA // 2027</div>
      <div className="psf-label psf-label-right">MULTIVERSE SYSTEM</div>
    </div>
  );
}
