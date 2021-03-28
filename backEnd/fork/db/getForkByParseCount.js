const { findMethod } = require('../../db/methods');
const appConfig = require('../../../config');
const { schema } = require('../../db');

async function getForkByParseCount(num = 0) {
  const collectionName = appConfig.collections.results.name;
  const field = schema.baseStat.parseCount.name;
  const result = await findMethod.all(collectionName, { [field]: num });
  return result.result;
}

module.exports = getForkByParseCount;
