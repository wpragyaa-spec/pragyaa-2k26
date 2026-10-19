import { memo } from 'react';

function Stage() {
  return (
    <>
<div id="scrolltrack"></div>

  
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

    <div id="world">
      <div id="orb"></div>
      <h1 id="headline"><span className="inner"><span style={{'--i': 0}}>Every</span> <span style={{'--i': 1}}>Timeline</span> <span style={{'--i': 2}}>Bows</span> <span style={{'--i': 3}}>to</span> <span style={{'--i': 4}}>Doom</span></span></h1>
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
  </div>

  
  <div className="vig"></div>

  
  <div id="grid">
    <div className="rows" id="gridRows"></div>
  </div>
    </>
  );
}

export default memo(Stage);