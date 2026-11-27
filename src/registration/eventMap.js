// Maps the event names shown on the PRAGYAA 2027 site to the stable event slugs
// used by the PHP backend (events.slug). Registration buttons open
//   register.html?event=<slug>
// in a NEW browser tab, so the original site tab stays untouched.
//
// PLACEHOLDER: these slugs are derived from the names currently displayed on the
// site. The official 2027 event list is not final. Create each event in the
// backend with EXACTLY the slug used here (admin events API), or edit the slug
// here to match. If a slug does not exist in the backend, or the event has no
// confirmed fee / is closed, the registration page says so and does not accept
// a registration.
//
// Names that are NOT listed here keep their existing (non-registration) behaviour.

const SLUG_TO_NAMES = {
  // Junior Scientist
  'quantum-sparks-exhibition': ['Quantum Sparks Exhibition'],
  'robo-junior-arena': ['Robo-Junior Arena'],
  'aero-glider-design-challenge': ['Aero-Glider Design Challenge'],

  // Events (SEC-03)
  'robowars-heavyweight': ['RoboWars // Heavyweight', 'RoboWars // Heavyweight 60KG'],
  'incursion-hackathon-36h': ['Incursion Hackathon 36H'],
  'code-blitz-algo-wars': ['Code Blitz // Algo Wars'],
  'drone-racing-league': ['Drone Racing League'],
  
  // E-Venture / Venture Catalyst (SEC-07)
  'elevator-pitch-arena': ['Elevator Pitch Arena'],
  'talent-internship-expo': ['Talent & Internship Expo'],

  // Flagship
  'innovers': ['Innovers'],
  'vision-edge': ['Vision Edge'],
  'ai-bootcamp': ['AI Bootcamp'],

  // Departmental
  'chemtrek': ['Chemtrek'],
  'mechaverse': ['Mechaverse'],
  'pesa': ['Pesa'],
  'tessa-texplorer': ['Tessa Texplorer'],
  'sessa': ['Sessa'],
  'senfest': ['Senfest'],
  'essa': ['Essa'],
  'extrospark': ['Extrospark'],
  'itza': ['Itza'],
  'hackit': ['Hackit'],

  // Creative
  'math': ['Math'],
  'e-magic': ['E-Magic'],
  'far': ['FAR'],
  'auth-6-0': ['Auth 6.0'],
  'pragya-movie-night': ['Pragya Movie Night'],

  // E-Venture (each section is one event; its three tabs share one slug)
  'startup-expo': ['Startup Showcase', 'Founder Connect', 'Innovation Showcase'],
  'lightning-pitch': ['Pitch Arena', 'Jury Evaluation', 'Pitch Finale'],
  'ipl-auction': ['Team Registration', 'Player Auction', 'Squad Evaluation'],
};

const NAME_TO_SLUG = new Map();
for (const [slug, names] of Object.entries(SLUG_TO_NAMES)) {
  for (const n of names) NAME_TO_SLUG.set(n.trim().toLowerCase(), slug);
}

/** Returns the backend event slug for a displayed sub-event name, or null. */
export function slugForName(name) {
  if (!name) return null;
  return NAME_TO_SLUG.get(String(name).trim().toLowerCase()) || null;
}

/** URL of the dedicated registration page for an event slug. */
export function registrationUrl(slug) {
  const base = import.meta.env.BASE_URL || '/';
  return `${base}register.html?event=${encodeURIComponent(slug)}`;
}

export const REGISTER_LABEL = 'REGISTER NOW';

/**
 * Opens the registration page in a new tab (the current tab is not navigated).
 * Must be called synchronously from a click handler so pop-up blockers allow it.
 * Returns true if a tab was opened.
 */
export function openRegistration(slug) {
  const w = window.open(registrationUrl(slug), '_blank');
  if (!w) return false;
  try { w.opener = null; } catch (e) { /* cross-origin guard */ }
  return true;
}

/**
 * Click handler for the lightbox action button when it belongs to a registrable event.
 * Opens the registration page in a new tab; if the browser blocks the pop-up it says so
 * on the button instead of pretending something was sent.
 */
export function handleRegisterClick(btn) {
  const slug = btn && btn.dataset ? btn.dataset.regSlug : '';
  if (!slug) return false;
  if (!openRegistration(slug)) {
    const textEl = document.getElementById('litActionBtnText');
    if (textEl && !btn.dataset.popupWarn) {
      btn.dataset.popupWarn = '1';
      // data-enc-text holds the real label if it is mid-decrypt (dossier-encrypt)
      const orig = textEl.dataset.encText || textEl.textContent;
      textEl.textContent = 'POP-UP BLOCKED // ALLOW POP-UPS';
      setTimeout(() => { textEl.textContent = orig; delete btn.dataset.popupWarn; }, 3000);
    }
  }
  return true;
}

/** Applies (or clears) the registration target on the action button for the active event. */
export function applyRegistrationTarget(subName) {
  const btn = document.getElementById('litActionBtn');
  if (!btn) return null;
  const slug = slugForName(subName);
  if (slug) {
    btn.dataset.regSlug = slug;
    const textEl = document.getElementById('litActionBtnText');
    if (textEl) textEl.textContent = REGISTER_LABEL;
  } else {
    delete btn.dataset.regSlug;
  }
  return slug;
}