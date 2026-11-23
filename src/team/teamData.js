// PRAGYAA '27 core team, shown on the Team page (opened from the "Team" button).
//
// To fill in a member:
//   name      – full name
//   role      – position shown under the name (e.g. "Head", "Co-Head")
//   photo     – image path, e.g. "/team/gauri.jpg" (put the file in public/team/).
//               Leave empty to show the placeholder silhouette.
//               Portrait photos with a plain/dark background look best (approx. 3:4).
//   linkedin, instagram, email – leave empty to hide that icon.

// Temporary: every card shows the same member until everyone's details arrive.
// Replace a slot with that person's own { name, role, photo, ... } when ready.
const slot = () => ({
  name: 'Saloni Tarone',
  role: 'Head',
  photo: '/team/saloni-tarone.jpg',
  linkedin: '',
  instagram: '',
  email: '',
});

const threeSlots = () => [slot(), slot(), slot()];

export const TEAM_TITLE = 'Core Team';
export const TEAM_SUBTITLE = "Meet the minds behind PRAGYAA '27";

export const COMMITTEES = [
  { name: 'Event Affairs', members: threeSlots() },
  { name: 'Food and Sites', members: threeSlots() },
  { name: 'Documentation', members: threeSlots() },
  { name: 'Website and Logistics', members: threeSlots() },
  { name: 'Finance and Accounting', members: threeSlots() },
  { name: 'PRC', members: threeSlots() },
  { name: 'Sponsorship', members: threeSlots() },
  { name: 'Media and Design', members: threeSlots() },
  { name: 'Guest and Hospitality', members: threeSlots() },
  { name: 'Disciplinary and Support', members: threeSlots() },
];
