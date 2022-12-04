const listForParse = require('../parseConfig/listForParse');

function findBet(id) {
  let result = {};
  const list = listForParse.flat(Infinity);
  result = list.find((i) => i.config.id === id);
  return result;
}

module.exports = findBet;
