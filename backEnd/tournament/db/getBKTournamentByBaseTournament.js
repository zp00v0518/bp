const ObjectId = require('mongodb').ObjectID;
const appConfig = require('../../../config');
const { findMethod } = require('../../db/methods');
const { schema } = require('../../db');

async function getBKTournamentByBaseTournament(id = '') {
  const collectionName = appConfig.collections.tournaments.name;
  const query = {
    class: schema.class.tournament,
    [schema.refs.tournament.name]: new ObjectId(id)
  };
  const result = await findMethod.all(collectionName, query);
  return result.result;
}

module.exports = getBKTournamentByBaseTournament;
