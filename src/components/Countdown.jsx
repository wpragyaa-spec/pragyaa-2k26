import { memo, useEffect, useState } from 'react';

const TARGET = new Date('2026-12-29T00:00:00+05:30').getTime();

function remaining() {
  const diff = Math.max(0, TARGET - Date.now());
  return {
    done: diff === 0,
    units: [
      ['Months', Math.floor(diff / 86400000 / 30)],
      ['Days', Math.floor(diff / 86400000) % 30],
      ['Hours', Math.floor(diff / 3600000) % 24],
      ['Minutes', Math.floor(diff / 60000) % 60],
      ['Seconds', Math.floor(diff / 1000) % 60],
    ],
  };
}

function Countdown({ style }) {
  const [t, setT] = useState(remaining);

  useEffect(() => {
    if (t.done) return undefined;
    const id = setInterval(() => setT(remaining()), 1000);
    return () => clearInterval(id);
  }, [t.done]);

  if (t.done) {
    return <p className="hero-countdown is-live" style={style}>Incursion Live</p>;
  }

  return (
    <div className="hero-countdown" style={style} role="timer" aria-label="Countdown to PRAGYA 2027">
      {t.units.map(([label, value], i) => (
        <div className="hc-unit" key={label}>
          {i > 0 && <span className="hc-sep" aria-hidden="true">:</span>}
          <div className="hc-cell">
            <b>{String(value).padStart(2, '0')}</b>
            <small>{label}</small>
          </div>
        </div>
      ))}
    </div>
  );
}

export default memo(Countdown);
