// Hand-drawn style line-art doodles for the Junior Scientist page.
// All strokes use currentColor, so colour comes from CSS.

const line = { fill: 'none', stroke: 'currentColor', strokeWidth: 2.4, strokeLinecap: 'round', strokeLinejoin: 'round' };
const dashed = { ...line, strokeDasharray: '7 9' };

export function PaperPlane(props) {
  return (
    <svg viewBox="0 0 200 270" {...props}>
      <path {...line} d="M18 62 L156 12 L104 128 L82 84 Z" />
      <path {...line} d="M82 84 L156 12" />
      <path {...line} d="M82 84 L96 112 L104 128" />
      <path {...dashed} d="M90 136 C 86 168, 46 160, 50 186 C 54 212, 96 204, 84 180 C 72 156, 34 196, 22 252" />
    </svg>
  );
}

export function RocketRider(props) {
  return (
    <svg viewBox="0 0 240 280" {...props}>
      <g transform="rotate(32 120 140)">
        {/* rocket */}
        <path {...line} d="M120 26 C 152 58, 158 122, 142 176 L 98 176 C 82 122, 88 58, 120 26 Z" />
        <circle {...line} cx="120" cy="96" r="18" />
        <circle {...line} cx="120" cy="96" r="9" />
        <path {...line} d="M100 150 L 72 190 L 100 178" />
        <path {...line} d="M140 150 L 168 190 L 140 178" />
        <path {...line} d="M104 178 Q 120 246 136 178" />
        <path {...line} d="M112 180 Q 120 214 128 180" />
        <path {...line} d="M108 58 Q 120 48 132 58" />
      </g>
      {/* astronaut helmet */}
      <circle {...line} cx="70" cy="70" r="30" />
      <path {...line} d="M50 66 Q 70 46 90 66 Q 70 88 50 66 Z" />
      <path {...line} d="M58 62 Q 62 58 66 58" />
      <path {...line} d="M70 40 V 26" />
      <circle {...line} cx="70" cy="22" r="4" />
      <path {...line} d="M52 96 Q 60 122 86 118 Q 104 112 108 96" />
    </svg>
  );
}

function Cloud({ x, y, s = 1 }) {
  return (
    <path
      {...line}
      transform={`translate(${x} ${y}) scale(${s})`}
      d="M8 44 a14 14 0 0 1 10 -20 a20 20 0 0 1 36 -6 a16 16 0 0 1 26 10 a13 13 0 0 1 2 26 H 14 a10 10 0 0 1 -6 -10 z"
    />
  );
}

export function RainbowClouds(props) {
  return (
    <svg viewBox="0 0 320 200" {...props}>
      <path {...line} className="dd-arc dd-arc--1" d="M40 170 A 120 120 0 0 1 280 170" />
      <path {...line} className="dd-arc dd-arc--2" d="M64 170 A 96 96 0 0 1 256 170" />
      <path {...line} className="dd-arc dd-arc--3" d="M88 170 A 72 72 0 0 1 232 170" />
      <Cloud x={10} y={140} s={1.05} />
      <Cloud x={214} y={136} s={1.15} />
    </svg>
  );
}

export function KidFace(props) {
  return (
    <svg viewBox="0 0 220 220" {...props}>
      <path {...line} d="M44 108 C 40 64, 76 30, 116 32 C 160 34, 186 70, 180 114 C 176 158, 146 188, 110 188 C 72 188, 46 156, 44 108 Z" />
      <path {...line} d="M48 92 C 58 52, 104 30, 146 46 C 168 56, 180 76, 178 96 C 160 72, 140 80, 124 62 C 110 84, 86 78, 70 70 C 64 84, 56 90, 48 92 Z" />
      <path {...line} d="M44 112 C 30 112, 28 136, 46 138" />
      <path {...line} d="M84 118 q 7 -7 14 0" />
      <path {...line} d="M126 118 q 7 -7 14 0" />
      <path {...line} d="M96 150 q 16 12 32 0" />
      <path {...line} d="M74 136 q 4 2 8 0 M 142 136 q 4 2 8 0" />
    </svg>
  );
}

export function Atom(props) {
  return (
    <svg viewBox="0 0 120 120" {...props}>
      <ellipse {...line} cx="60" cy="60" rx="50" ry="18" />
      <ellipse {...line} cx="60" cy="60" rx="50" ry="18" transform="rotate(60 60 60)" />
      <ellipse {...line} cx="60" cy="60" rx="50" ry="18" transform="rotate(-60 60 60)" />
      <circle cx="60" cy="60" r="7" fill="currentColor" />
    </svg>
  );
}

export function Flask(props) {
  return (
    <svg viewBox="0 0 120 140" {...props}>
      <path {...line} d="M44 12 H 76 M 50 12 V 54 L 18 116 a 10 10 0 0 0 9 15 H 93 a 10 10 0 0 0 9 -15 L 70 54 V 12" />
      <path {...line} d="M30 94 H 90" />
      <circle {...line} cx="52" cy="110" r="5" />
      <circle {...line} cx="70" cy="104" r="3.5" />
      <circle {...line} cx="62" cy="78" r="3" />
    </svg>
  );
}

export function Bulb(props) {
  return (
    <svg viewBox="0 0 120 140" {...props}>
      <path {...line} d="M42 92 C 24 80, 22 46, 40 32 C 54 20, 74 20, 86 32 C 102 48, 98 80, 80 92 V 104 H 42 Z" />
      <path {...line} d="M44 114 H 78 M 48 124 H 74" />
      <path {...line} d="M52 92 L 56 66 L 62 76 L 68 66 L 70 92" />
      <path {...line} d="M60 6 V 14 M 16 52 H 8 M 112 52 H 104 M 26 18 L 32 24 M 96 18 L 90 24" />
    </svg>
  );
}

export function Gear(props) {
  return (
    <svg viewBox="0 0 120 120" {...props}>
      <g {...line}>
        {[0, 45, 90, 135, 180, 225, 270, 315].map((a) => (
          <rect key={a} x="53" y="8" width="14" height="18" rx="3" transform={`rotate(${a} 60 60)`} />
        ))}
      </g>
      <circle {...line} cx="60" cy="60" r="34" />
      <circle {...line} cx="60" cy="60" r="13" />
    </svg>
  );
}

export function Sparkle(props) {
  return (
    <svg viewBox="-12 -12 24 24" {...props}>
      <path fill="currentColor" d="M0 -11 L 2.6 -2.6 L 11 0 L 2.6 2.6 L 0 11 L -2.6 2.6 L -11 0 L -2.6 -2.6 Z" />
    </svg>
  );
}

export function Robot(props) {
  return (
    <svg viewBox="0 0 120 120" {...props}>
      <rect {...line} x="26" y="38" width="68" height="52" rx="12" />
      <circle {...line} cx="46" cy="62" r="7" />
      <circle {...line} cx="74" cy="62" r="7" />
      <path {...line} d="M48 80 H 72" />
      <path {...line} d="M60 38 V 24" />
      <circle {...line} cx="60" cy="19" r="5" />
      <path {...line} d="M26 60 H 16 M 94 60 H 104" />
      <path {...line} d="M40 90 V 102 M 80 90 V 102" />
    </svg>
  );
}

export function Plane(props) {
  return (
    <svg viewBox="0 0 120 120" {...props}>
      <path {...line} d="M16 54 L 104 22 L 70 98 L 56 70 Z" />
      <path {...line} d="M56 70 L 104 22" />
    </svg>
  );
}

export const EVENT_ICONS = { flask: Flask, robot: Robot, plane: Plane };
