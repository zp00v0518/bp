const { getStatistic } = require('../statistic/db');
const { getForkByParseCount } = require('./db');

async function getLastFork() {
  const stat = await getStatistic();
  const { parseCount } = stat;
  const result = await getForkByParseCount(parseCount);
  return result;
}

module.exports = getLastFork;
