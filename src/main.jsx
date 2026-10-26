import { createRoot } from 'react-dom/client';
import './doomsday.css';
import './index.css';
import './pragya-rails-append.css';
import './dossier.css';
import App from './App.jsx';

// Returning visitors skip the countdown + glass-break intro entirely.
// Set synchronously before first paint so the intro never flashes.
try {
  if (localStorage.getItem('pragya_intro_seen') === '1') {
    document.documentElement.classList.add('intro-seen');
  }
} catch (e) { /* storage unavailable: treat as first visit */ }

// No <StrictMode>: the Three.js / canvas engine attaches global listeners and
// must be initialised exactly once.
createRoot(document.getElementById('root')).render(<App />);