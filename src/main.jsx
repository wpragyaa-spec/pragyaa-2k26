import { createRoot } from 'react-dom/client';
import './doomsday.css';
import './index.css';
import './pragya-rails-append.css';
import './dossier.css';
import App from './App.jsx';

// No <StrictMode>: the Three.js / canvas engine attaches global listeners and
// must be initialised exactly once.
createRoot(document.getElementById('root')).render(<App />);