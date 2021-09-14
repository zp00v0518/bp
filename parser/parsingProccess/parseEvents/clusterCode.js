const listForParse = require('../listForParse');
const parseOneBet = require('../parseOneBet');
const endParsingBets = require('../endParsingBets');

async function clusterCode() {
  const betName = process.env.BET;
  const data = JSON.parse(betName);
  const listTournaments = data[1];
  if (!listTournaments) {
    console.log('Турниры для парсинга отсутствуют');
    process.exit();
  }
  let promises = listTournaments.map((item) => {
    try {
      const betTarget = findBet(item.bkId);
      if (!betTarget) return false;
      return parseOneBet(betTarget, item);
    } catch (err) {
      return false;
    }
  });
  promises = promises.filter((i) => !!i);
  let result = await Promise.all(promises);
  result = await endParsingBets(result);
  console.log(result)
  process.send({ result });
  process.exit();
}

function findBet(id) {
  let result = {};
  const list = listForParse.flat(Infinity);
  result = list.find((i) => i.config.id === id);
  return result || {};
}

module.exports = clusterCode;
