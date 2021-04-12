const dropTournamentCollection = require('../db/dropTournamentCollection');
const config = require('../../../config');
const InsertDB = require('../../db/InsertDB');
const ConnectMongoDB = require('../../db/connectMongoDB.js');
const tournamentsList = require('./tournamentsList');
const schema = require('../../db/schema');

async function createTournamentOnDb() {
  await dropTournamentCollection();
  const mongo = new ConnectMongoDB();
  const insertMethod = new InsertDB(mongo);
  await insertMethod.connect(config.db.name);
  const collectionName = config.collections.tournaments.name;
  const list = createListForInsert();
  await insertMethod.many(collectionName, list);
  await insertMethod.close();
}

function createListForInsert() {
  const type = schema.tournament_type;
  const result = [];
  Object.keys(tournamentsList).forEach((key) => {
    const item = tournamentsList[key];
    const z = item.list.map((name) => {
      return {
        class: type.class,
        [type.type_name.name]: name,
        [type.name_sport.name]: key
      };
    });
    result.push(...z);
  });
  return result;
}

module.exports = createTournamentOnDb;
