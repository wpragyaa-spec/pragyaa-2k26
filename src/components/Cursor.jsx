import { memo } from 'react';

function Cursor() {
  return (
    <>
<div id="dot"></div>
  <div className="dot-trail" id="dotTrail1"></div>
  <div className="dot-trail" id="dotTrail2"></div>
  <div className="dot-trail" id="dotTrail3"></div>
    </>
  );
}

export default memo(Cursor);