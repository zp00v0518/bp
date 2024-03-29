const dropMenuCollection = require('./dropMenuCollection');
const menu = require('../menus');
const config = require('../../../config');
const InsertDB = require('../../db/InsertDB');
const ConnectMongoDB = require('../../db/connectMongoDB.js');
const mongo = new ConnectMongoDB();

async function createMenuInDB() {
  await dropMenuCollection();
  const insertMethod = new InsertDB(mongo);
  await insertMethod.connect(config.db.name);
  const collectionName = config.collections.menu.name;
  await insertMethod.many(collectionName, menu);
  await insertMethod.close();
}

module.exports = createMenuInDB;
