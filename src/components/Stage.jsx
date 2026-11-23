import { memo } from 'react';

function Stage() {
  return (
    <>
<div id="scrolltrack">
      <i className="snap-pt" aria-hidden="true"></i>
      <i className="snap-pt" aria-hidden="true"></i>
      <i className="snap-pt" aria-hidden="true"></i>
    </div>

  
  <div id="stage">
    
    <div className="stage-backdrop" id="stageBackdrop">
      <div className="aurora-glow"></div>
      <canvas id="emberCanvas" className="ember-canvas"></canvas>
      <div className="stage-scanlines"></div>
      <div className="stage-grain"></div>
    </div>

    
    <div id="doomHand" className="doom-hand-layer" aria-hidden="true">
      <div className="dh-crop">
        <img className="dh-art" src="/doom/doom-hand.jpg" alt="" />
      </div>
      <div className="dh-mist"></div>
      <div className="dh-shadow"></div>
      <div className="dh-glow"></div>
    </div>

    {/* Volumetric Holographic Light Cone emerging from Dr Doom's palm */}
    <div id="incursionCone" className="incursion-cone" aria-hidden="true">
      <div className="cone-beam-wrap">
        <div className="cone-beam-core"></div>
        <div className="cone-beam-rays"></div>
        <div className="cone-beam-scanlines"></div>
        <div className="cone-beam-glimmer"></div>
      </div>
      <div className="cone-cradle-wrap">
        <div className="cone-cradle-ring ring-outer"></div>
        <div className="cone-cradle-ring ring-inner"></div>
        <div className="cone-cradle-glow"></div>
      </div>
      <div className="palm-emitter-root">
        <div className="palm-emitter-flare"></div>
        <div className="palm-emitter-ring"></div>
        <div className="palm-emitter-core"></div>
      </div>
    </div>

    <div className="world-fade">
      <div id="world">
        <div id="orb"></div>
        <h1 id="headline"><span className="inner"><span style={{'--i': 0}}>Every</span> <span style={{'--i': 1}}>Timeline</span> <span style={{'--i': 2}}>Bows</span> <span style={{'--i': 3}}>to</span> <span style={{'--i': 4}}>Doom</span></span></h1>
      </div>
    </div>
    <div className="corner tl" aria-hidden="true"><svg><use href="#hud"/></svg></div>
    <div className="corner tr" aria-hidden="true"><svg><use href="#hud"/></svg></div>
    <div className="corner bl" aria-hidden="true"><svg><use href="#hud"/></svg></div>
    <div className="corner br" aria-hidden="true"><svg><use href="#hud"/></svg></div>

    <div className="rails-m">
      <nav className="rail left"  id="railL" aria-label="Sections left"></nav>
      <nav className="rail right" id="railR" aria-label="Sections right"></nav>
    </div>

    
    <div id="doomHandFront" className="doom-hand-front" aria-hidden="true">
      <div className="dh-crop">
        <img className="dh-art" src="/doom/doom-hand.jpg" alt="" />
      </div>
    </div>

    <div id="wristHud" className="wrist-hud" aria-label="Countdown to Avengers: Doomsday">
  <div className="wh-timer">
    <div className="wh-seg"><b id="wMonths">00</b><span>Months</span></div>
    <i className="wh-colon">:</i>
    <div className="wh-seg"><b id="wDays">00</b><span>Days</span></div>
    <i className="wh-colon">:</i>
    <div className="wh-seg"><b id="wHours">00</b><span>Hours</span></div>
    <i className="wh-colon">:</i>
    <div className="wh-seg"><b id="wMinutes">00</b><span>Minutes</span></div>
    <i className="wh-colon">:</i>
    <div className="wh-seg"><b id="wSeconds">00</b><span>Seconds</span></div>
  </div>
</div>
  </div>

  
  <div className="vig"></div>

  
  <div id="grid">
    <div className="rows" id="gridRows"></div>
  </div>
    </>
  );
}

export default memo(Stage);