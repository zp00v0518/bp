const appConfig = require('../../../config');
const InsertDB = require('../../../backEnd/db/InsertDB');
const ConnectMongoDB = require('../../../backEnd/db/connectMongoDB.js');
const mongo = new ConnectMongoDB();

const fav = require('../../Favorit/config');
const mar = require('../../MarathonBet/config');
const par = require('../../PariMatch/config');

const list = [fav, mar, par];

const collectionName = appConfig.collections.bk.name;

async function createBkList() {
  const insertMethod = new InsertDB(mongo);
  await insertMethod.connect(appConfig.db.name);
	await dropBkCollection();
  await insertMethod.many(collectionName, list);
  insertMethod.close();
}

async function dropBkCollection() {
  const collection = await mongo.open(collectionName);
  try {
    await collection.drop();
  } catch (err) {}
}

module.exports = createBkList;
