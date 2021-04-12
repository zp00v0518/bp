const dropMenuCollection = require('./dropMenuCollection');
const config = require('../../../config');
const InsertDB = require('../../db/InsertDB');
const ConnectMongoDB = require('../../db/connectMongoDB.js');

async function createTournamentOnDb() {
	await dropMenuCollection();
	const mongo = new ConnectMongoDB();
  const insertMethod = new InsertDB(mongo);
  await insertMethod.connect(config.db.name);
  const collectionName = config.collections.tournaments.name;
  await insertMethod.many(collectionName, menu);
  await insertMethod.close();
}

module.exports = createTournamentOnDb;
