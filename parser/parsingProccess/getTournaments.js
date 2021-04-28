const listForParse = require('./listForParse');
const { saveTournamentsOnDb } = require('../methods/db');

async function parseCicle() {
  const list = listForParse.flat(Infinity);
  const result = [];
  for (const item of list) {
    const z = await item.getTournaments();
    result.push(...z);
  }
  await saveTournamentsOnDb(result);
  return result;
}

parseCicle();
