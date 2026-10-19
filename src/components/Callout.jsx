import { memo } from 'react';

function Callout() {
  return (
    <>
<svg id="calloutLine" aria-hidden="true">
    <path className="callout-leader" d="M0 0" />
    <circle className="callout-anchor" cx="-999" cy="-999" r="2.5" />
    <rect className="callout-square" x="-999" y="-999" width="4" height="4" />
  </svg>
  <div id="callout" aria-hidden="true">
    <div className="callout-corner tl"></div>
    <div className="callout-corner tr"></div>
    <div className="callout-corner bl"></div>
    <div className="callout-corner br"></div>
    <div className="callout-notch"></div>
    <div className="callout-header" id="calloutHeader">SEC-01 // INC-001</div>
    <div className="callout-title" id="calloutTitle">Junior Scientist</div>
    <div className="callout-divider"></div>
    <div className="callout-tagline" id="calloutTagline">Where young minds ignite</div>
    <div className="callout-blurb" id="calloutBlurb">Highlights, past memories and everything for the junior innovators.</div>
    <div className="callout-chips" id="calloutChips"></div>
  </div>
    </>
  );
}

export default memo(Callout);