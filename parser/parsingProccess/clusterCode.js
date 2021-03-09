const listForParse = require('./listForParse');
const parseOneBet = require('./parseOneBet');

async function clusterCode() {
  const betName = process.env.BET;
  const betTarget = findBet(betName);
  const result = await parseOneBet(betTarget.bet, betTarget.urls);
  process.send({result});
  process.exit();
}

function findBet(name) {
  let result = {};
  listForParse.some((arr) => {
    const item = arr.find((i) => i.name === name);
    if (item) result = item;
    return !!item;
  });
  return result;
}

module.exports = clusterCode;
