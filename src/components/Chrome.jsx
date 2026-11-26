import { memo } from 'react';
import Countdown from './Countdown';

const TITLE = 'PRAGYA'.split('');
const YEAR = '2027'.split('');

function Chrome() {
  return (
    <>
<header className="chrome" id="mainHeader">
  </header>

  <button type="button" className="navbtn" id="navBtn" aria-label="Open sections" aria-expanded="false">
    <i></i><i></i><i></i>
  </button>

  {/* Kinetic hero — animated by src/motion/heroMotion.js */}
  <section className="hero hero--kinetic" id="hero" aria-label="PRAGYA 2027">
    <i className="hero-scan" aria-hidden="true"></i>

    <div className="hk-plane hk-plane--eyebrow">
      <p className="hero-eyebrow">
        <span className="he-line" aria-hidden="true"></span>
        <span className="hero-dot"></span>
        <b>SGGS Campus</b>
        <span className="he-sep" aria-hidden="true">//</span>
        <span>Nanded</span>
        <span className="hero-dot"></span>
        <span className="he-line" aria-hidden="true"></span>
      </p>
    </div>

    <div className="hk-plane hk-plane--title">
      <div className="hero-titlewrap">
        <h1 className="hero-title hero-title--split" aria-label="PRAGYA">
          {TITLE.map((c, i) => (
            <span className="hl" key={i} style={{ '--i': i }} aria-hidden="true">
              <span className="hl-depth">{c}</span>
              <span className="hl-face">{c}</span>
            </span>
          ))}
        </h1>
      </div>
    </div>

    <div className="hk-plane hk-plane--year">
      <p className="hero-year" aria-label="2027">
        {YEAR.map((c, i) => <span className="hy-d" key={i} aria-hidden="true">{c}</span>)}
      </p>
    </div>

    <div className="hk-plane hk-plane--count">
      <Countdown />
    </div>

    <div className="hk-plane hk-plane--cue">
      <button type="button" className="hero-scroll" id="heroScroll">
        <span>Scroll</span>
        <i aria-hidden="true"></i>
      </button>
    </div>
  </section>


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