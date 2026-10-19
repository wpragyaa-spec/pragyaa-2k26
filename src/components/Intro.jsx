import { memo } from 'react';

function Intro() {
  return (
    <>
<div id="intro">
    <div className="intro-camera" id="introCamera">
      <div className="countdown-bg" id="countdownBg" style={{backgroundImage: 'url("/avengers_bg.jpg")'}}></div>
      <div className="green-ambient-glow"></div>
      <div className="god-rays"></div>
      
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
    </div>

    
    <canvas id="glassCanvas"></canvas>
  </div>
    </>
  );
}

export default memo(Intro);