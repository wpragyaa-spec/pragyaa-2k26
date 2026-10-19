import { useEffect } from 'react';
import SvgDefs from './components/SvgDefs';
import Stage from './components/Stage';
import Chrome from './components/Chrome';
import Callout from './components/Callout';
import Menu from './components/Menu';
import Dossier from './components/Dossier';
import Intro from './components/Intro';
import Cursor from './components/Cursor';
import { initDossier } from './dossier';
import { initDoomsdayPortal } from './doomsday-app';

let booted = false;

export default function App() {
  useEffect(() => {
    if (booted) return;
    booted = true;
    document.body.classList.add('locked');
    initDossier();
    initDoomsdayPortal();
  }, []);

  return (
    <>
      <SvgDefs />
      <Stage />
      <Chrome />
      <Callout />
      <Menu />
      <Dossier />
      <Intro />
      <Cursor />
    </>
  );
}