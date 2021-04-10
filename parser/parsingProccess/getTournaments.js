const listForParse = require('./listForParse');

async function parseCicle() {
  const list = listForParse.flat(Infinity);
  const result = [];
  for (const item of list) {
    const z = await item.bet.getTournaments();
    result.push(z);
  }
  return result;
}

parseCicle();
