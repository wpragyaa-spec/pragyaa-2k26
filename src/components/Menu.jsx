import { memo } from 'react';

function Menu() {
  return (
    <>
<div id="menu">
    <div className="menu-corner top-left"></div>
    <div className="menu-corner top-right"></div>
    <div className="menu-corner bottom-left"></div>
    <div className="menu-corner bottom-right"></div>
    <div className="menu-header-tag">// SYSTEM SECTOR ACCESS // LATVERIAN DIRECTIVE</div>
    <nav>
      <a href="#" data-grid style={{'--i': 0}}><span className="m-idx">[ALL]</span> All Sections</a>
      <a href="#" data-teaser style={{'--i': 1}}><span className="m-idx">[00]</span> Live Countdown</a>
      <a href="#" data-card-idx="0" style={{'--i': 2}}><span className="m-idx">[01]</span> Junior Scientist</a>
      <a href="#" data-card-idx="1" style={{'--i': 3}}><span className="m-idx">[02]</span> About</a>
      <a href="#" data-card-idx="2" style={{'--i': 4}}><span className="m-idx">[03]</span> Events</a>
      <a href="#" data-card-idx="3" style={{'--i': 5}}><span className="m-idx">[04]</span> Team</a>
      <a href="#" data-card-idx="4" style={{'--i': 6}}><span className="m-idx">[05]</span> Schedule</a>
      <a href="#" data-card-idx="5" style={{'--i': 7}}><span className="m-idx">[06]</span> Gallery</a>
      <a href="#" data-card-idx="6" style={{'--i': 8}}><span className="m-idx">[07]</span> eVenture</a>
      <a href="#" data-card-idx="7" style={{'--i': 9}}><span className="m-idx">[08]</span> FAQ</a>
      <a href="#" data-card-idx="8" style={{'--i': 10}}><span className="m-idx">[09]</span> Sponsors</a>
      <a href="#" data-card-idx="9" style={{'--i': 11}}><span className="m-idx">[10]</span> Guests</a>
    </nav>
    <div className="addr">
      Pragya 2027 // SGGS Campus, Nanded, Maharashtra // info@sggs.ac.in
    </div>
  </div>
    </>
  );
}

export default memo(Menu);