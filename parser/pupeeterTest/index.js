const checkFork = require('../methods/checkFork');
const appConfig = require('../../config');
const { InsertDB } = require('../../backEnd/db');

const insert = new InsertDB();

async function start(){
  const result = await checkFork();
  await addForkResultToDB(result)
}

start();

async function addForkResultToDB(docs){
  await insert.connect(appConfig.db.name);
  const collection = appConfig.collections.results.name;
  await insert.many(collection, docs);
  insert.close();
}

