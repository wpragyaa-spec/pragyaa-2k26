import { memo } from 'react';
import Countdown from './Countdown';

function Chrome() {
  return (
    <>
<header className="chrome" id="mainHeader">
  </header>

  <button type="button" className="navbtn" id="navBtn" aria-label="Open sections" aria-expanded="false">
    <i></i><i></i><i></i>
  </button>

  <section className="hero" id="hero" aria-label="PRAGYA 2027">
    <p className="hero-eyebrow" style={{'--d': 0}}>
      <span className="he-line" aria-hidden="true"></span>
      <span className="hero-dot"></span>
      <b>SGGS Campus</b>
      <span className="he-sep" aria-hidden="true">//</span>
      <span>Nanded</span>
      <span className="hero-dot"></span>
      <span className="he-line" aria-hidden="true"></span>
    </p>
    <h1 className="hero-title" style={{'--d': 1}}>PRAGYA</h1>
    <p className="hero-year" style={{'--d': 2}}>2027</p>
    <Countdown style={{'--d': 3}} />
    <button type="button" className="hero-scroll" id="heroScroll" style={{'--d': 4}}>
      <span>Scroll</span>
      <i aria-hidden="true"></i>
    </button>
  </section>

  <div className="bio chrome">
    <div className="who">
      <div className="doom-emblem" id="avatar" aria-label="Victor von Doom">
        <svg width="48" height="48" viewBox="0 0 52 52" fill="none" xmlns="http://www.w3.org/2000/svg">
          <polygon points="26,3 48,15 48,37 26,49 4,37 4,15" fill="#151a20" stroke="#8a99a8" strokeWidth="1.5" />
          <polygon points="26,8 43,18 43,34 26,44 9,34 9,18" fill="#0b0d10" stroke="rgba(138, 153, 168, 0.4)" strokeWidth="1.2" />
          <path d="M19 19 L26 14 L33 19 L33 28 L26 36 L19 28 Z" fill="#1d242b" stroke="#8a99a8" strokeWidth="1.5" />
          <circle cx="26" cy="24" r="3.5" fill="#00ff88" />
          <path d="M22 28 L30 28" stroke="#8a99a8" strokeWidth="1.5" />
          <path d="M24 32 L28 32" stroke="#00ff88" strokeWidth="1.2" />
        </svg>
      </div>
      <b>Victor von Doom</b>
    </div>
    <p>The multiverse fractures at an exponential rate. Your forces delayed the inevitable; Doom shall rewrite creation itself. All timelines are scheduled for restructuring into Battleworld.</p>
  </div>

  <div className="colophon chrome">Pragya 2027</div>
  <div className="stage-hint" aria-hidden="true">
    <span>Swipe up for sections</span>
    <i></i>
  </div>

  <div className="cue chrome">
    <span>Drag to rotate multiverse</span>
  </div>
    </>
  );
}

export default memo(Chrome);