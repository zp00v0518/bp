// const { updateMethod } = require('../../db/methods');
const ConnectMongoDB = require('../../db/connectMongoDB');
const UpdateDB = require('../../db/UpdateDB');
const mongo = new ConnectMongoDB();

const config = require('../../../config');
const { schema } = require('../../db');
const { baseStat } = schema;

async function incrementStatistic() {
  const updateMethod = new UpdateDB(mongo);
  try {
    await updateMethod.connect(config.db.name);
    const collectionName = config.collections.statistic.name;
    const query = {
      class: baseStat.class
    };
    const doc = {
      $inc: { [baseStat.parseCount.name]: 1 },
      $set: { [baseStat.lastParse.name]: Date.now() }
    };
    const result = await updateMethod.oneAndReturn(collectionName, query, doc);
		updateMethod.close();
    return result.value;
  } catch (err) {}
}

module.exports = incrementStatistic;
