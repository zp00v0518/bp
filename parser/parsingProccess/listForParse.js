const MarathonUrls = require('../MarathonBet/urls');
const PariMatchUrls = require('../PariMatch/urls');
const FavoritUrls = require('../Favorit/urls');
const MarathonBet = require('../MarathonBet');
const Favorit = require('../Favorit');
const PariMatch = require('../PariMatch');

const list = [
  [
    { bet: MarathonBet, urls: MarathonUrls, name: 'MarathonBet' },
    { bet: Favorit, urls: FavoritUrls, name: 'Favorit' }
  ],
  [{ bet: PariMatch, urls: PariMatchUrls, name: 'PariMatch' }]
];

module.exports = list;
