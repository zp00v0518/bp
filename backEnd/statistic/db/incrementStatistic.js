const { updateMethod } = require('../../db/methods');
const config = require('../../../config');
const { schema } = require('../../db');
const { baseStat } = schema;

async function incrementStatistic() {
  const collectionName = config.collections.statistic.name;
  const query = {
    class: baseStat.class
  };
  const doc = {
    $inc: { [baseStat.parseCount.name]: 1 },
    $set: { [baseStat.lastParse.name]: Date.now() }
  };
  const result = await updateMethod.oneAndReturn(collectionName, query, doc);
  return result.value
}

module.exports = incrementStatistic;
