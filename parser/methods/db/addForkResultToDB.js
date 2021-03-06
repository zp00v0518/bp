const appConfig = require('../../../config');
const { InsertDB } = require('../../../backEnd/db');

const insert = new InsertDB();

async function addForkResultToDB(docs = []) {
  if (docs.length === 0) return;
  await insert.connect(appConfig.db.name);
  const collection = appConfig.collections.results.name;
  await insert.many(collection, docs);
  insert.close();
}

module.exports = addForkResultToDB;
