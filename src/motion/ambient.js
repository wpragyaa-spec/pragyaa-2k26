// Ambient micro-interactions: magnetic buttons, mouse-driven stage camera,
// cinematic dossier reveal. All are additive and use properties that the
// existing code does not touch (CSS `translate` via variables, opacity,
// clip-path), so they compose with the site's own transforms.
import { gsap, hasFinePointer, prefersReducedMotion, onBodyClass, trackPointer } from './core';

/* ---------- Magnetic buttons ---------- */
const MAGNETIC = [
  '#heroScroll',
  '#navBtn',
  '#introEnter',
  '.dz2-close-btn',
  '#litActionBtn',
].join(',');

export function initMagnetic() {
  if (!hasFinePointer() || prefersReducedMotion()) return () => {};
  let active = null;
  let setX = null, setY = null;

  function release() {
    if (!active) return;
    gsap.to(active, { '--mag-x': '0px', '--mag-y': '0px', duration: 0.6, ease: 'elastic.out(1, 0.45)' });
    active.classList.remove('is-magnetic-hot');
    active = null;
  }

  const onMove = (e) => {
    const el = e.target.closest && e.target.closest(MAGNETIC);
    if (el !== active) {
      release();
      if (el) {
        active = el;
        el.classList.add('is-magnetic', 'is-magnetic-hot');
        setX = gsap.quickTo(el, '--mag-x', { duration: 0.35, ease: 'power3.out', unit: 'px' });
        setY = gsap.quickTo(el, '--mag-y', { duration: 0.35, ease: 'power3.out', unit: 'px' });
      }
    }
    if (!active) return;
    const r = active.getBoundingClientRect();
    const dx = e.clientX - (r.left + r.width / 2);
    const dy = e.clientY - (r.top + r.height / 2);
    setX(dx * 0.28);
    setY(dy * 0.28);
  };

  window.addEventListener('pointermove', onMove, { passive: true });
  window.addEventListener('blur', release);
  return () => {
    window.removeEventListener('pointermove', onMove);
    window.removeEventListener('blur', release);
  };
}

/* ---------- Mouse-driven stage camera ---------- */
// Writes --cam-x / --cam-y (-1..1) on #stage; CSS turns them into subtle
// parallax on the backdrop and the Doom hand layers (never the sphere).
export function initStageCamera() {
  const stage = document.getElementById('stage');
  if (!stage) return () => {};
  return trackPointer((x, y) => {
    stage.style.setProperty('--cam-x', x.toFixed(4));
    stage.style.setProperty('--cam-y', y.toFixed(4));
  }, { ease: 0.06 });
}

/* ---------- Dossier (lightbox) cinematic reveal ---------- */
export function initDossierReveal() {
  const plate = document.getElementById('litPlate');
  if (!plate) return () => {};
  const reduced = prefersReducedMotion();

  // a one-shot scanning beam that sweeps the plate as it opens
  const beam = document.createElement('div');
  beam.className = 'dz-scanbeam';
  beam.setAttribute('aria-hidden', 'true');
  plate.appendChild(beam);

  let tl = null;
  let wasLit = false;

  const play = () => {
    if (reduced) return;
    if (tl) tl.kill();
    const header = plate.querySelectorAll('.dz2-header-left > *, .dz2-header-right > *');
    const blocks = plate.querySelectorAll('.dz2-body > *');
    tl = gsap.timeline({ delay: 0.34 }) // after the existing FLIP from the card
      .fromTo(beam, { yPercent: -100, opacity: 1 }, { yPercent: 2400, duration: 1.1, ease: 'power2.inOut' }, 0)
      .to(beam, { opacity: 0, duration: 0.2 }, 0.9)
      .fromTo(header, { opacity: 0, y: -10 }, { opacity: 1, y: 0, duration: 0.6, stagger: 0.05, ease: 'power3.out', clearProps: 'opacity,transform' }, 0.05)
      .fromTo(blocks,
        { opacity: 0, y: 26, clipPath: 'inset(0 0 100% 0)' },
        { opacity: 1, y: 0, clipPath: 'inset(0 0 0% 0)', duration: 0.8, stagger: 0.07, ease: 'power3.out', clearProps: 'opacity,transform,clipPath' },
        0.12);
  };

  const off = onBodyClass((cl) => {
    const lit = cl.contains('lit');
    if (lit && !wasLit) play();
    if (!lit && wasLit && tl) {
      tl.progress(1).kill();
      tl = null;
    }
    wasLit = lit;
  });

  return () => {
    off();
    if (tl) tl.kill();
    beam.remove();
  };
}
