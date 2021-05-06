const appConfig = require('../../../config');
const ConnectMongoDB = require('../../db/connectMongoDB.js');
const UpdateDB = require('../../db/UpdateDB');
const mongo = new ConnectMongoDB();
const schema = require('../../db/schema');

async function createStaticticCollection() {
  const updateMethod = new UpdateDB(mongo);
  await updateMethod.connect(appConfig.db.name);
  const collectionName = appConfig.collections.statistic.name;
  const query = {
    class: schema.baseStat.class
  };
  const change = {
    parseCount: 0,
    lastParse: Date.now()
  };
  const doc = {
    $set: change
  };
  await updateMethod.one(collectionName, query, doc, { upsert: true });
  updateMethod.close();
}

module.exports = createStaticticCollection;
