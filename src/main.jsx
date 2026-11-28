import { createRoot } from 'react-dom/client';
import './doomsday.css';
import './index.css';
import './pragya-rails-append.css';
import './dossier.css';
import './motion/motion.css';
import './sec-beam.css';
import './eventLevels.css';
import './sphere-cards.css';
import App from './App.jsx';

// The cinematic countdown + glass-break intro is switched off for every visitor:
// hide it synchronously before first paint so it never flashes.
document.documentElement.classList.add('intro-seen');

// No <StrictMode>: the Three.js / canvas engine attaches global listeners and
// must be initialised exactly once.
createRoot(document.getElementById('root')).render(<App />);