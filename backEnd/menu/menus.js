const menu = [
  { title: 'matching', id: 0 },
  { title: 'parse', id: 1 },
  { title: 'sport', id: 2, parent: 0 },
  { title: 'tournament', id: 3, parent: 0 },
  { title: 'commands', id: 4, parent: 0 },
  { title: 'sports', id: 5, parent: 1 },
  { title: 'tournament', id: 6, parent: 1 },
  { title: 'events', id: 7, parent: 1 }
];

module.exports = menu;
