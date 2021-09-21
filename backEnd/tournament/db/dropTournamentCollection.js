const config = require('../../../config');
const dropCollection = require('../../db/methods/dropCollection');

async function dropTournamentCollection() {
  const dbName = config.db.name;
  const collectionName = config.collections.tournaments.name;
  const result = await dropCollection(dbName, collectionName);
  return result;
}

module.exports = dropTournamentCollection;
