const appConfig = require('../../../config');
const ConnectMongoDB = require('../../db/connectMongoDB.js');
const InsertDB = require('../../db/InsertDB');
const mongo = new ConnectMongoDB();
const schema  = require('../../db/schema');


async function createStaticticCollection() {
	const insertMethod = new InsertDB(mongo);
  await insertMethod.connect(appConfig.db.name);
  const collectionName = appConfig.collections.statistic.name;
  const template = {
    parseCount: 0,
    lastParse: Date.now(),
    class: schema.baseStat.class
  };
  await insertMethod.one(collectionName, template);
  insertMethod.close();
}

module.exports = createStaticticCollection;