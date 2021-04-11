// const MarathonUrls = require('../MarathonBet/urls');
// const PariMatchUrls = require('../PariMatch/urls');
// const FavoritUrls = require('../Favorit/urls');
const MarathonBet = require('../MarathonBet');
const Favorit = require('../Favorit');
const PariMatch = require('../PariMatch');

const list = [
  [
    { bet: MarathonBet, name: 'MarathonBet' },
    { bet: Favorit, name: 'Favorit' }
    // { bet: PariMatch, urls: PariMatchUrls, name: 'PariMatch' }
  ],
  [{ bet: PariMatch, name: 'PariMatch' }]
];

module.exports = list;
