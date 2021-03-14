const listForParse = require('./listForParse');
const parseOneBet = require('./parseOneBet');
const parseConfig = require('../parseConfig');

async function clusterCode() {
  const betName = process.env.BET;
  const betTarget = findBet(betName);
  if (!betTarget) {
    console.log(`Парсинг ${betName} не начался. Что-то пошло не так. ${betName} не найдена.`)
    process.send({ result: [] });
    process.exit();
  }
  if (parseConfig.parseCount > 0) {
    betTarget.urls.length = parseConfig.parseCount;
  }
  console.time(`Парсинг ${betName} :`);
  console.log(`начался парсинг  ${betName}`)
  const result = await parseOneBet(betTarget.bet, betTarget.urls);
  console.timeEnd(`Парсинг ${betName} :`);
  process.send({ result });
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
