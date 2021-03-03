const menu = require('../menus');
const config = require('../../../config');
const InsertDB = require('../../db/InsertDB');
const insertMethod = new InsertDB();

async function createMenuInDB() {
  await insertMethod.connect(config.db.name);
  const collectionName = config.collections.menu.name;
  await insertMethod.many(collectionName, menu);
  await insertMethod.close();
}
createMenuInDB();

module.exports = createMenuInDB;
