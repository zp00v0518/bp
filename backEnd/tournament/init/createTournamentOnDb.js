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
  if (!list || list.length === 0) {
    await insertMethod.close();
    return;
  }
  await insertMethod.many(collectionName, list);
  await insertMethod.close();
}

function createListForInsert() {
  const { tournament_type } = schema;
  const classList = schema.class;
  const result = [];
  Object.keys(tournamentsList).forEach((key) => {
    const item = tournamentsList[key];
    const z = item.list.map((name) => {
      return {
        class: classList.tournament_app,
        [tournament_type.name.name]: name,
        [tournament_type.sport_name.name]: key
      };
    });
    result.push(...z);
  });
  return result;
}

module.exports = createTournamentOnDb;
