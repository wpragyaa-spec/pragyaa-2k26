import { memo } from 'react';

function SvgDefs() {
  return (
    <>
<svg width="0" height="0" style={{position: 'absolute'}} aria-hidden="true">
  <defs>
    <symbol id="hud" viewBox="0 0 300 190">
      <path className="plate" d="M0 0H300L252 44H128L66 108V190H0Z"/>
      <path className="thin"  d="M18 18H270L236 46H116L50 118V172H18Z"/>
      <path className="edge"  d="M2 190V2H300"/>
      <rect className="chip" x="46" y="30" width="34" height="16"/>
      <circle className="led" cx="63" cy="38" r="3"/>
      <path className="thin" d="M96 38H150M96 46H130"/>
    </symbol>
  </defs>
</svg>
    </>
  );
}

export default memo(SvgDefs);