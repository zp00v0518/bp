const listForParse = require('./listForParse');

// const MarathonBet = require('../MarathonBet');
// const Favorit = require('../Favorit');
// const PariMatch = require('../PariMatch');

// const listForParse = [
//   [
//     { bet: MarathonBet, name: 'MarathonBet' },
//     { bet: Favorit, name: 'Favorit' },
//     { bet: PariMatch, urls: PariMatchUrls, name: 'PariMatch' }
//   ]
// ];

async function parseCicle() {
  const list = listForParse.flat(Infinity);
  const result = [];
  for (const item of list) {
    const z = await item.getSports();
    result.push(z);
  }
  return result;
}

parseCicle();
