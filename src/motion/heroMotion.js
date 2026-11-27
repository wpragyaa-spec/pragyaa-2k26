// Kinetic hero (stage 0) + Victor von Doom bio.
// - Staggered 3D letter reveal for PRAGYA, independent 2027, progressive
//   eyebrow / countdown / cue, classified-dossier bio with a 3D emblem.
// - Mouse tilts the title in 3D (depth layer parallax) and drifts the year.
// - Scrolling is linked to progress: PRAGYA scales towards the camera, the
//   year and supporting text move at their own speeds, then the existing
//   #heroScroll → goStage(1) hand-off runs into the sphere stage.
import {
  gsap, prefersReducedMotion, onBodyClass, trackPointer, createScrollGate, splitChars, splitLines,
} from './core';

const clamp01 = (v) => Math.min(1, Math.max(0, v));

export function initHeroMotion() {
  const hero = document.getElementById('hero');
  if (!hero) return () => {};
  const body = document.body;
  const reduced = prefersReducedMotion();

  const q = (s) => hero.querySelector(s);
  const qa = (s) => [...hero.querySelectorAll(s)];
  const planes = {
    eyebrow: q('.hk-plane--eyebrow'),
    title: q('.hk-plane--title'),
    year: q('.hk-plane--year'),
    count: q('.hk-plane--count'),
    cue: q('.hk-plane--cue'),
  };
  const titleEl = q('.hero-title');
  const yearEl = q('.hero-year');
  const eyebrowEl = q('.hero-eyebrow');
  const scrollBtn = document.getElementById('heroScroll');

  const bio = document.querySelector('.bio--dossier');
  const bioName = bio && bio.querySelector('.bio-name');
  const bioText = bio && bio.querySelector('.bio-text');
  const nameChars = splitChars(bioName);
  let bioLinesShown = reduced;
  const bioLines = splitLines(bioText, {
    // a re-split (resize, or the card first appearing) keeps the reveal state
    onBuild: (lines) => gsap.set(lines, bioLinesShown ? { yPercent: 0, opacity: 1 } : { yPercent: 105, opacity: 0 }),
  });

  /* ---------- reveal timeline (built paused, played on body.revealed) ---------- */
  const tl = gsap.timeline({ paused: true, defaults: { ease: 'expo.out' } });
  const lines = qa('.he-line');
  tl.fromTo(lines, { scaleX: 0 }, {
    scaleX: 1, duration: 1.2, transformOrigin: (i) => (i === 0 ? '100% 50%' : '0% 50%'),
  }, 0)
    .fromTo(qa('.hero-eyebrow > :not(.he-line)'),
      { opacity: 0, y: 8, filter: 'blur(6px)' },
      { opacity: 1, y: 0, filter: 'blur(0px)', duration: 0.9, stagger: 0.06, ease: 'power3.out' }, 0.15)
    .fromTo(qa('.hl'),
      { opacity: 0, yPercent: 115, rotationX: -100, z: -120 },
      { opacity: 1, yPercent: 0, rotationX: 0, z: 0, duration: 1.6, stagger: 0.085, transformOrigin: '50% 100%' }, 0.35)
    .fromTo(qa('.hl-depth'), { opacity: 0 }, { opacity: 1, duration: 1.4, ease: 'power2.out' }, 1.1)
    .fromTo(yearEl, { letterSpacing: '1.15em' }, { letterSpacing: '0.5em', duration: 1.6, ease: 'power4.out' }, 1.0)
    .fromTo(qa('.hy-d'),
      { opacity: 0, yPercent: 70, rotationY: -75, filter: 'blur(8px)' },
      { opacity: 1, yPercent: 0, rotationY: 0, filter: 'blur(0px)', duration: 1.2, stagger: 0.09, ease: 'power4.out' }, 1.05)
    .fromTo(qa('.hc-unit'), { opacity: 0, y: 18 }, { opacity: 1, y: 0, duration: 0.9, stagger: 0.08, ease: 'power3.out' }, 1.55)
    .fromTo(scrollBtn, { opacity: 0, y: 14 }, { opacity: 1, y: 0, duration: 0.9, ease: 'power3.out' }, 2.1)
    .fromTo(q('.hero-scan'), { yPercent: -120, opacity: 0.9 }, { yPercent: 1200, opacity: 0, duration: 2.2, ease: 'power1.inOut' }, 0.6)
    .add(() => {
      if (!yearEl) return;
      yearEl.classList.add('is-glitch');
      setTimeout(() => yearEl.classList.remove('is-glitch'), 520);
    }, 2.6);

  if (bio) {
    tl.fromTo(bio.querySelector('.bio-tag'), { clipPath: 'inset(0 100% 0 0)' }, { clipPath: 'inset(0 0% 0 0)', duration: 1, ease: 'power3.inOut' }, 1.2)
      .fromTo(bio.querySelector('.doom-emblem'),
        { opacity: 0, rotationY: -130, scale: 0.6, transformPerspective: 600 },
        { opacity: 1, rotationY: 0, scale: 1, duration: 1.6, ease: 'expo.out' }, 1.35)
      .fromTo(nameChars, { opacity: 0, yPercent: 100 }, { opacity: 1, yPercent: 0, duration: 0.8, stagger: 0.03, ease: 'power3.out' }, 1.6)
      .fromTo(bio.querySelector('.bio-sub'), { opacity: 0, x: -10 }, { opacity: 1, x: 0, duration: 0.8, ease: 'power3.out' }, 1.9)
      .add(() => {
        bioLinesShown = true;
        gsap.fromTo(bioLines.lines(), { yPercent: 105, opacity: 0 }, {
          yPercent: 0, opacity: 1, duration: 0.9, stagger: 0.12, ease: 'power3.out',
        });
      }, 2.0)
      .fromTo(bio.querySelector('.bio-scan'), { xPercent: -110 }, { xPercent: 260, duration: 1.8, ease: 'power2.inOut' }, 2.2);
  }

  let played = false;
  const offClass = onBodyClass((cl) => {
    if (played || !cl.contains('revealed')) return;
    played = true;
    if (cl.contains('deep') || reduced) tl.progress(1);
    else tl.play();
  });

  /* ---------- mouse: 3D title tilt + layered drift ---------- */
  const offPointer = trackPointer((x, y) => {
    if (titleEl) gsap.set(titleEl, { rotationY: x * 9, rotationX: -y * 6 });
    if (yearEl) gsap.set(yearEl, { x: -x * 16, y: -y * 6 });
    if (eyebrowEl) gsap.set(eyebrowEl, { x: x * 8 });
  });

  /* ---------- scroll-linked exit into the sphere stage ---------- */
  let handed = false;
  const blocked = () => ['lit', 'gridview', 'navopen', 'locked', 'deep'].some((c) => body.classList.contains(c));
  const gate = createScrollGate({
    isActive: () => !handed && body.classList.contains('revealed') && !blocked(),
    threshold: 0.28,
    onUpdate(p, committed) {
      const s = reduced ? 0 : 1;
      if (planes.title) gsap.set(planes.title, {
        scale: 1 + p * 0.9 * s,
        yPercent: -p * 22 * s,
        opacity: 1 - clamp01((p - 0.45) / 0.5),
        filter: `blur(${(Math.max(0, p - 0.35) * 14 * s).toFixed(2)}px)`,
      });
      // the year sinks and spreads while PRAGYA pushes towards the camera
      if (planes.year) gsap.set(planes.year, {
        y: p * window.innerHeight * 0.14 * s,
        scaleX: 1 + p * 0.35 * s,
        opacity: 1 - clamp01(p * 2.2),
      });
      if (planes.eyebrow) gsap.set(planes.eyebrow, { y: -p * window.innerHeight * 0.14 * s, opacity: 1 - clamp01(p * 2.2) });
      if (planes.count) gsap.set(planes.count, { y: p * window.innerHeight * 0.08 * s, opacity: 1 - clamp01(p * 2.4) });
      if (planes.cue) gsap.set(planes.cue, { opacity: 1 - clamp01(p * 4) });
      if (bio) gsap.set(bio, { x: -p * 60 * s, opacity: 1 - clamp01(p * 2) });
      if (committed && p > 0.72 && !handed) {
        handed = true;
        if (scrollBtn) scrollBtn.click(); // doomsday-app: goStage(1)
      }
    },
  });

  // The visible "Scroll" button runs the same cinematic exit instead of a cut.
  const onCueClick = (e) => {
    if (handed) return;
    e.stopImmediatePropagation();
    gate.commit();
  };
  if (scrollBtn) scrollBtn.addEventListener('click', onCueClick, { capture: true });

  return () => {
    offClass();
    offPointer();
    gate.destroy();
    bioLines.destroy();
    tl.kill();
    if (scrollBtn) scrollBtn.removeEventListener('click', onCueClick, { capture: true });
  };
}
