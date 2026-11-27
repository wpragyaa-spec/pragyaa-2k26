import { useEffect } from 'react';
import SvgDefs from './components/SvgDefs';
import Stage from './components/Stage';
import Chrome from './components/Chrome';
import Callout from './components/Callout';
import Dossier from './components/Dossier';
import Intro from './components/Intro';
import Cursor from './components/Cursor';
import { initDossier } from './dossier';
import { initDoomsdayPortal } from './doomsday-app';
import { initHeroMotion } from './motion/heroMotion';
import { initMagnetic, initStageCamera, initDossierReveal } from './motion/ambient';

let booted = false;

export default function App() {
  useEffect(() => {
    if (booted) return;
    booted = true;
    if (!document.documentElement.classList.contains('intro-seen')) {
      document.body.classList.add('locked');
    }
    initDossier();
    initDoomsdayPortal();
    // Motion layer (GSAP). Runs after the engine so its capture-phase
    // listeners and DOM hooks see the final markup.
    initHeroMotion();
    initMagnetic();
    initStageCamera();
    initDossierReveal();
  }, []);

  return (
    <>
      <SvgDefs />
      <Stage />
      <Chrome />
      <Callout />
      <Dossier />
      <Intro />
      <Cursor />
    </>
  );
}