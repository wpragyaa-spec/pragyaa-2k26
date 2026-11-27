// Cinematic opening for the countdown intro (#intro).
// Builds the scene out of darkness — camera dolly, smoke, ambient light,
// Dr. Doom's mask, the PRAGYA 2027 title, the countdown — then waits for the
// visitor. Scrolling drives the camera deeper into the cathedral (--dive),
// and once committed hands over to the existing glass-breach reveal.
//
// Animated properties are chosen so they compose with the intro's existing
// CSS animations (bgBreathe, greenPulse, cameraRush): CSS variables feeding
// the individual `scale` / `translate` properties, and filter-based opacity.
import { gsap, prefersReducedMotion, createScrollGate } from './core';

export function initIntroCinematic({ onEnter }) {
  const intro = document.getElementById('intro');
  if (!intro) return { release() {}, destroy() {} };
  const reduced = prefersReducedMotion();
  const $ = (s) => intro.querySelector(s);
  const $$ = (s) => [...intro.querySelectorAll(s)];

  const bg = $('#countdownBg');
  const smoke = $('#smokeCanvas');
  const doom = $('.cine-doom');
  const eyes = $('.cine-eyes');
  const letters = $$('.cine-l');
  const year = $('.cine-year');
  const countdown = $('#countdownContainer');
  const segments = $$('.timer-segment, .timer-colon');
  const cue = $('#introEnter');
  const motes = $('.cine-motes');
  const all = [bg, smoke, doom, eyes, ...letters, year, countdown, ...segments, cue, motes].filter(Boolean);

  intro.classList.add('cine');
  gsap.set(intro, { '--dolly': 0, '--dive': 0, '--amb': 0 });

  const tl = gsap.timeline({ defaults: { ease: 'power2.out' } });
  tl.fromTo(bg, { filter: 'brightness(0) contrast(1.15) saturate(1.1)' },
    { filter: 'brightness(0.82) contrast(1.15) saturate(1.1)', duration: 3.6, ease: 'power1.inOut' }, 0)
    .to(intro, { '--dolly': 1, duration: 18, ease: 'sine.inOut' }, 0)
    .fromTo(smoke, { opacity: 0 }, { opacity: 1, duration: 2.8 }, 0.3)
    .to(intro, { '--amb': 1, duration: 2.8, ease: 'power1.inOut' }, 0.9)
    .fromTo(motes, { opacity: 0 }, { opacity: 1, duration: 2.4 }, 1.2)
    .fromTo(doom,
      { opacity: 0, y: 40, scale: 0.92, filter: 'brightness(0) blur(10px)' },
      { opacity: 1, y: 0, scale: 1, filter: 'brightness(1) blur(0px)', duration: 3.4 }, 1.5)
    .fromTo(eyes, { opacity: 0 }, {
      keyframes: [
        { opacity: 0.8, duration: 0.08 }, { opacity: 0.1, duration: 0.12 },
        { opacity: 1, duration: 0.12 }, { opacity: 0.3, duration: 0.08 }, { opacity: 1, duration: 0.5 },
      ],
    }, 3.9)
    .fromTo(letters,
      { opacity: 0, yPercent: 60, filter: 'blur(12px)' },
      { opacity: 1, yPercent: 0, filter: 'blur(0px)', duration: 1.6, stagger: { each: 0.08, from: 'center' }, ease: 'expo.out' }, 4.2)
    .fromTo(year, { opacity: 0, letterSpacing: '1.5em' }, { opacity: 1, letterSpacing: '0.55em', duration: 1.8, ease: 'expo.out' }, 4.8)
    .fromTo(countdown, { opacity: 0 }, { opacity: 1, duration: 1.2, clearProps: 'opacity' }, 5.3)
    .fromTo(segments, { opacity: 0, y: 14 }, { opacity: 1, y: 0, duration: 0.9, stagger: 0.06, ease: 'power3.out', clearProps: 'opacity,transform' }, 5.4)
    .fromTo(cue, { opacity: 0, y: 12 }, { opacity: 1, y: 0, duration: 1, ease: 'power3.out' }, 6.2);

  if (reduced) tl.progress(1);

  let released = false;
  let entered = false;
  const startedAt = performance.now();
  const gate = createScrollGate({
    isActive: () => !released && performance.now() - startedAt > 800,
    threshold: 0.3,
    smoothing: 0.07,
    onUpdate(p, committed) {
      intro.style.setProperty('--dive', p.toFixed(4));
      // travel a little deeper, then breach
      if (committed && p > 0.5 && !entered) {
        entered = true;
        onEnter();
      }
    },
  });
  const onCue = () => gate.commit();
  if (cue) cue.addEventListener('click', onCue);

  function release() {
    if (released) return;
    released = true;
    gate.destroy();
    if (cue) cue.removeEventListener('click', onCue);
    tl.kill();
    // hand the elements the breach CSS animates back to the stylesheet
    gsap.set([bg, countdown, ...segments].filter(Boolean), { clearProps: 'opacity,filter,transform' });
  }

  return {
    release,
    destroy() {
      release();
      gsap.set(all, { clearProps: 'all' });
      intro.classList.remove('cine');
      intro.style.removeProperty('--dive');
      intro.style.removeProperty('--dolly');
      intro.style.removeProperty('--amb');
    },
  };
}
