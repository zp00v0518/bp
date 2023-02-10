const { getStatistic } = require('../statistic/db');
const { getPreviousForkByParseCount } = require('./db');

async function getPreviousFork() {
  const stat = await getStatistic();
  const { parseCount } = stat;
  const result = await getPreviousForkByParseCount(parseCount - 1);
  return result;
}

module.exports = getPreviousFork;
