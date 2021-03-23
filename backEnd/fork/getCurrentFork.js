const { getStatistic } = require('../statistic/db');
const { getForkByParseCount } = require('./db');

async function getCurrentFork() {
  const stat = await getStatistic();
  const { parseCount } = stat;
  const result = await getForkByParseCount(parseCount);
  return result;
}

module.exports = getCurrentFork;
