import { memo } from 'react';

// Dr. Doom's hooded mask — emerges from the dark during the opening.
function DoomMask() {
  return (
    <svg viewBox="0 0 300 360" className="cine-doom-svg" aria-hidden="true">
      <defs>
        <linearGradient id="cdCloth" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#1d2c26" />
          <stop offset=".55" stopColor="#08100c" />
          <stop offset="1" stopColor="#020403" />
        </linearGradient>
        <linearGradient id="cdMetal" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#f6f9fa" />
          <stop offset=".28" stopColor="#c0cace" />
          <stop offset=".6" stopColor="#66737a" />
          <stop offset="1" stopColor="#1c2427" />
        </linearGradient>
        <linearGradient id="cdSheen" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="rgba(255,255,255,0)" />
          <stop offset=".5" stopColor="rgba(220,255,240,.75)" />
          <stop offset="1" stopColor="rgba(255,255,255,0)" />
        </linearGradient>
        <radialGradient id="cdHalo">
          <stop offset="0" stopColor="rgba(0,255,150,.8)" />
          <stop offset=".45" stopColor="rgba(0,255,150,.22)" />
          <stop offset="1" stopColor="rgba(0,255,150,0)" />
        </radialGradient>
        <filter id="cdGlow" x="-100%" y="-100%" width="300%" height="300%">
          <feGaussianBlur stdDeviation="3" result="b" />
          <feMerge><feMergeNode in="b" /><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge>
        </filter>
        <filter id="cdBrushed" x="0" y="0" width="100%" height="100%">
          <feTurbulence type="fractalNoise" baseFrequency="1.5 0.05" numOctaves="2" seed="5" result="n" />
          <feColorMatrix in="n" type="matrix" values="0 0 0 0 1  0 0 0 0 1  0 0 0 0 1  .6 0 0 0 -.38" result="s" />
          <feComposite in="s" in2="SourceGraphic" operator="in" result="c" />
          <feBlend in="c" in2="SourceGraphic" mode="screen" />
        </filter>
        <clipPath id="cdMaskClip">
          <path d="M150 60 C112 62 96 92 94 132 L92 176 C92 216 108 250 128 270 L150 290 L172 270 C192 250 208 216 208 176 L206 132 C204 92 188 62 150 60 Z" />
        </clipPath>
      </defs>
      {/* hood */}
      <path d="M150 6 C88 8 52 60 46 130 C40 200 30 262 6 334 C60 356 240 356 294 334 C270 262 260 200 254 130 C248 60 212 8 150 6 Z" fill="url(#cdCloth)" />
      <path d="M150 6 C88 8 52 60 46 130 C40 200 30 262 6 334 M150 6 C212 8 248 60 254 130 C260 200 270 262 294 334" fill="none" stroke="rgba(80,240,180,.35)" strokeWidth="1.6" />
      <path d="M150 40 C100 42 78 90 76 150 C74 220 100 290 150 318 C200 290 226 220 224 150 C222 90 200 42 150 40 Z" fill="#010302" />
      {/* mask */}
      <path d="M150 60 C112 62 96 92 94 132 L92 176 C92 216 108 250 128 270 L150 290 L172 270 C192 250 208 216 208 176 L206 132 C204 92 188 62 150 60 Z" fill="url(#cdMetal)" filter="url(#cdBrushed)" />
      <path d="M94 176 L126 186 L136 262 C114 242 98 214 94 176 Z" fill="rgba(10,14,16,.4)" />
      <path d="M206 176 L174 186 L164 262 C186 242 202 214 206 176 Z" fill="rgba(10,14,16,.62)" />
      <path d="M150 150 L159 192 L150 204 L141 192 Z" fill="rgba(255,255,255,.38)" />
      <path d="M118 70 C108 86 104 108 104 128" fill="none" stroke="rgba(255,255,255,.6)" strokeWidth="1.5" />
      <path d="M94 138 L144 148 L150 142 L156 148 L206 138 L206 150 L156 160 L150 154 L144 160 L94 150 Z" fill="#141b1e" />
      <path d="M108 162 L142 170 L139 178 L112 172 Z M192 162 L158 170 L161 178 L188 172 Z" fill="#03100a" />
      <path d="M136 226 L136 254 M143 228 L143 258 M150 228 L150 260 M157 228 L157 258 M164 226 L164 254" stroke="#0b1012" strokeWidth="2.4" />
      <circle cx="100" cy="124" r="2.6" fill="#d7e0e3" />
      <circle cx="200" cy="124" r="2.6" fill="#d7e0e3" />
      <path d="M78 150 C78 100 104 52 150 50 C196 52 222 100 222 150" fill="none" stroke="#0a130f" strokeWidth="12" />
      {/* light sweeping across the metal */}
      <g clipPath="url(#cdMaskClip)">
        <rect className="cine-sheen" x="-90" y="40" width="80" height="260" fill="url(#cdSheen)" />
      </g>
      {/* eyes */}
      <g className="cine-eyes">
        <ellipse cx="125" cy="170" rx="34" ry="14" fill="url(#cdHalo)" />
        <ellipse cx="175" cy="170" rx="34" ry="14" fill="url(#cdHalo)" />
        <path d="M108 162 L142 170 L139 178 L112 172 Z M192 162 L158 170 L161 178 L188 172 Z" fill="#d4fff0" filter="url(#cdGlow)" />
      </g>
    </svg>
  );
}

const MOTES = Array.from({ length: 22 }, (_, i) => ({
  left: (i * 37) % 100,
  delay: (i * 1.37) % 9,
  dur: 9 + ((i * 2.3) % 7),
  size: 1.5 + ((i * 7) % 3),
}));

function Intro() {
  return (
    <>
<div id="intro">
    <div className="intro-camera" id="introCamera">
      <div className="countdown-bg" id="countdownBg" style={{backgroundImage: 'url("/avengers_bg.jpg")'}}></div>
      <div className="green-ambient-glow"></div>
      <div className="god-rays"></div>

      {/* cinematic layer (motion/introMotion.js) */}
      <div className="cine-motes" aria-hidden="true">
        {MOTES.map((m, i) => (
          <i key={i} style={{ left: `${m.left}%`, '--d': `${m.delay}s`, '--t': `${m.dur}s`, '--s': `${m.size}px` }} />
        ))}
      </div>
      <div className="cine-doom-plane">
        <div className="cine-doom"><DoomMask /></div>
      </div>
      <div className="cine-title-plane" aria-label="PRAGYA 2027">
        <div className="cine-word" aria-hidden="true">
          {'PRAGYA'.split('').map((c, i) => <span className="cine-l" key={i}>{c}</span>)}
        </div>
        <div className="cine-year" aria-hidden="true">2027</div>
      </div>

      <canvas id="smokeCanvas"></canvas>
      <div className="glass-crack-overlay" id="glassCrack"></div>
      <div className="glass-portal-hole" id="glassHole"></div>
      <div className="glass-blast-flare" id="blastFlare"></div>
      <div className="breach-smoke-cover" id="breachSmoke"></div>
      <div className="cinematic-vignette" id="cinVig"></div>

      <div className="countdown-container" id="countdownContainer">
        <div className="countdown-timer" id="countdownTimer">
          <div className="timer-segment">
            <span className="timer-num" id="tMonths">04</span>
            <span className="timer-lbl">MONTHS</span>
          </div>
          <span className="timer-colon">:</span>
          <div className="timer-segment">
            <span className="timer-num" id="tDays">27</span>
            <span className="timer-lbl">DAYS</span>
          </div>
          <span className="timer-colon">:</span>
          <div className="timer-segment">
            <span className="timer-num" id="tHours">15</span>
            <span className="timer-lbl">HOURS</span>
          </div>
          <span className="timer-colon">:</span>
          <div className="timer-segment">
            <span className="timer-num" id="tMinutes">59</span>
            <span className="timer-lbl">MINUTES</span>
          </div>
          <span className="timer-colon">:</span>
          <div className="timer-segment">
            <span className="timer-num" id="tSeconds">59</span>
            <span className="timer-lbl">SECONDS</span>
          </div>
        </div>
      </div>
      <div className="intro-controls">
        <span>AUTOMATIC BREACH SEQUENCE // STAND BY</span>
      </div>
      <button type="button" className="cine-cue" id="introEnter">
        <span className="cine-cue-text">Scroll to enter</span>
        <span className="cine-mouse" aria-hidden="true"><i /></span>
      </button>
    </div>

    
    <canvas id="glassCanvas"></canvas>
  </div>
    </>
  );
}

export default memo(Intro);