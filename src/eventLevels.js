// Event levels shown when the "Events" button is clicked.
// Each level lists the site sections (by title, from ITEMS in doomsday-app.js)
// whose events appear as tabs in that level's popup.
// No imports here on purpose: both doomsday-app.js and dossier.js read this file.

export const EVENT_LEVELS = {
  department: {
    label: 'Department Level',
    hint: 'Competitions organised by each department',
    desc: 'Every department of SGGS IE&T runs its own competitions, technical challenges and showcases. Pick a department to see its event.',
    sections: ['Departmental Events'],
  },
  institute: {
    label: 'Institute Level',
    hint: 'Flagship and creative events for the whole institute',
    desc: 'Institute-wide events open to everyone: the flagship challenges and the creative events of PRAGYAA 2027.',
    sections: ['Flagship Events', 'Creative Events'],
  },
};

export const EVENT_LEVEL_ORDER = ['department', 'institute'];
