const { findMethod } = require('../../db/methods');
const appConfig = require('../../../config');
const { schema } = require('../../db');

async function getPreviousForkByParseCount(num = 0) {
  const collectionName = appConfig.collections.results.name;
  const field = schema.baseStat.parseCount.name;
  const result = await findMethod.all(
    collectionName,
    { [field]: { $lt: num } },
    { limit: 10 }
  );
  return result.result;
}

module.exports = getPreviousForkByParseCount;
