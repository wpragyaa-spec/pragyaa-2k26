import './doomsday.css';
import "./index.css";
import "./pragya-rails-append.css";
import { initDoomsdayPortal } from './doomsday-app';
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        initDoomsdayPortal();
    });
}
else {
    initDoomsdayPortal();
}
