import { memo } from 'react';

function Chrome() {
  return (
    <>
<header className="chrome" id="mainHeader">
    <a className="wordmark" href="#" aria-label="PRAGYA 2027" id="wordmarkLink">PRAGYA<em>2027</em></a>
    <button id="menuBtn" className="menu-btn" aria-expanded="false" aria-controls="menu" aria-label="Open menu">
      <span className="menu-label">Menu</span>
      <span className="bars"><i className="b1"></i><i className="b2"></i></span>
    </button>
  </header>

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

  <button id="gridBtn" className="gridbtn" aria-label="Toggle grid view">
    <b></b><b></b><b></b><b></b>
  </button>

  <div className="cue chrome">
    <s></s>
    <span>Drag to rotate the multiverse</span>
  </div>
    </>
  );
}

export default memo(Chrome);