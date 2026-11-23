import { useEffect, useState } from 'react';
import { TYPED_LINES, PHOTOS, EVENTS } from './juniorData';
import {
  PaperPlane, RocketRider, RainbowClouds, KidFace, Atom, Flask, Bulb, Gear, Sparkle, EVENT_ICONS,
} from './Doodles';

// Theme palette for the bubble letters (neon green family + silver)
const LETTER_COLORS = ['#00ff88', '#2ee6c9', '#39d0ff', '#a3ff4f', '#d2dae2', '#5cf2a8'];

const reduceMotion = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches;

function BubbleWord({ word, offset = 0, className }) {
  return (
    <span className={`js-word ${className || ''}`} aria-hidden="true">
      {[...word].map((ch, i) => (
        <span
          key={i}
          className="js-letter"
          style={{ '--c': LETTER_COLORS[(i + offset) % LETTER_COLORS.length], '--i': i + offset }}
        >
          {ch}
        </span>
      ))}
    </span>
  );
}

function Typewriter({ lines }) {
  const [text, setText] = useState(reduceMotion() ? lines[0] : '');

  useEffect(() => {
    if (reduceMotion()) return undefined;
    let line = 0;
    let pos = 0;
    let deleting = false;
    let timer;
    const tick = () => {
      const full = lines[line];
      if (!deleting) {
        pos += 1;
        setText(full.slice(0, pos));
        if (pos === full.length) {
          deleting = true;
          timer = setTimeout(tick, 1700);
          return;
        }
        timer = setTimeout(tick, 75);
      } else {
        pos -= 1;
        setText(full.slice(0, pos));
        if (pos === 0) {
          deleting = false;
          line = (line + 1) % lines.length;
          timer = setTimeout(tick, 350);
          return;
        }
        timer = setTimeout(tick, 35);
      }
    };
    timer = setTimeout(tick, 900);
    return () => clearTimeout(timer);
  }, [lines]);

  return (
    <p className="js-typed" aria-label={lines[0]}>
      <span aria-hidden="true">{text}</span>
      <i className="js-caret" aria-hidden="true" />
    </p>
  );
}

function PhotoStrip() {
  const items = PHOTOS.length
    ? PHOTOS
    : Array.from({ length: 6 }, (_, i) => ({ placeholder: true, key: i }));
  // Duplicate the set so the strip loops seamlessly
  const loop = [...items, ...items];
  const PH_ICONS = [Flask, Atom, Bulb, Gear, Flask, Atom];
  return (
    <section className="js-strip" aria-label="Photos from previous editions">
      <div className="js-strip-track">
        {loop.map((p, i) => {
          const Icon = PH_ICONS[i % PH_ICONS.length];
          return (
            <figure className="js-photo" key={i} style={{ '--r': `${[-3, 2, -1.5, 3, -2.5, 1.5][i % 6]}deg` }} aria-hidden={i >= items.length}>
              {p.placeholder ? (
                <div className="js-photo-ph">
                  <Icon className="js-photo-ph-icon" />
                  <span>Photos coming soon</span>
                </div>
              ) : (
                <img src={p.src} alt={i < items.length ? (p.alt || '') : ''} loading="lazy" />
              )}
            </figure>
          );
        })}
      </div>
    </section>
  );
}

function IndexMenu({ open, onClose }) {
  useEffect(() => {
    if (!open) return undefined;
    const onKey = (e) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open, onClose]);

  return (
    <div className={`js-index${open ? ' is-open' : ''}`} aria-hidden={!open}>
      <button type="button" className="js-index-scrim" aria-label="Close menu" tabIndex={open ? 0 : -1} onClick={onClose} />
      <nav className="js-index-panel" aria-label="Site index">
        <button type="button" className="js-index-close" onClick={onClose} tabIndex={open ? 0 : -1}>
          Close <span aria-hidden="true">×</span>
        </button>
        <a href="/" tabIndex={open ? 0 : -1}><b>01</b>Home</a>
        <a href="/junior-scientist.html" aria-current="page" tabIndex={open ? 0 : -1}><b>02</b>Junior Scientist</a>
        <a href="/team.html" tabIndex={open ? 0 : -1}><b>03</b>Core Team</a>
      </nav>
    </div>
  );
}

export default function JuniorPage() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      {/* Floating background doodles */}
      <div className="js-doodles" aria-hidden="true">
        <PaperPlane className="dd dd-plane" />
        <RocketRider className="dd dd-rocket" />
        <RainbowClouds className="dd dd-rainbow" />
        <KidFace className="dd dd-kid" />
        <Atom className="dd dd-atom" />
        <Flask className="dd dd-flask" />
        <Bulb className="dd dd-bulb" />
        <Gear className="dd dd-gear" />
        <Sparkle className="dd dd-spark dd-spark--1" />
        <Sparkle className="dd dd-spark dd-spark--2" />
        <Sparkle className="dd dd-spark dd-spark--3" />
        <Sparkle className="dd dd-spark dd-spark--4" />
      </div>

      <header className="js-topbar">
        <a className="js-back" href="/">
          <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M20 12H5M11 5l-7 7 7 7" /></svg>
          Back
        </a>
        <a className="js-logo" href="/" aria-label="PRAGYAA 2027 home">
          <small>SGGS IE&amp;T Nanded presents</small>
          <strong>PRAGYAA<span>&rsquo;27</span></strong>
        </a>
        <button type="button" className="js-index-btn" aria-expanded={menuOpen} onClick={() => setMenuOpen(true)}>
          Index
          <span className="js-index-lines" aria-hidden="true"><i /><i /></span>
        </button>
      </header>

      <IndexMenu open={menuOpen} onClose={() => setMenuOpen(false)} />

      <main>
        <section className="js-hero">
          <h1 className="js-title">
            <span className="sr-only">Junior Scientist</span>
            <BubbleWord word="JUNIOR" className="js-word--top" />
            <BubbleWord word="SCIENTIST" offset={2} className="js-word--bottom" />
          </h1>
          <Typewriter lines={TYPED_LINES} />
        </section>

        <PhotoStrip />

        <section className="js-events" aria-labelledby="js-events-title">
          <h2 className="js-events-title" id="js-events-title">Events</h2>
          <span className="js-divider" aria-hidden="true"><i /></span>
          <div className="js-event-grid">
            {EVENTS.map((ev) => {
              const Icon = EVENT_ICONS[ev.icon] || Flask;
              return (
                <article className="js-event" key={ev.name}>
                  <div className="js-event-icon" aria-hidden="true"><Icon /></div>
                  <span className="js-event-tag">{ev.tag}</span>
                  <h3>{ev.name}</h3>
                  <p className="js-event-meta">{ev.when} · {ev.where}</p>
                  <p className="js-event-details">{ev.details}</p>
                </article>
              );
            })}
          </div>
        </section>
      </main>

      <footer className="js-footer">PRAGYAA 2027 · SGGS IE&amp;T Nanded</footer>
    </>
  );
}
