const appConfig = require('../../config');
const FindInDB = require('../../backEnd/db/FindInDB');
const connectMongoDB = require('../../backEnd/db/connectMongoDB');
const collectionName = appConfig.collections.bk.name;
const dbName = appConfig.db.name;

async function getBKListFromDB() {
  const mongo = new connectMongoDB();
  const find = new FindInDB(mongo);
  await find.connect(dbName);
  const result = await find.all(collectionName);
  find.close();
  return result.result;
}

module.exports = getBKListFromDB;
