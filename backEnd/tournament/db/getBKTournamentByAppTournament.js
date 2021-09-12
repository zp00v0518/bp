const ObjectId = require('mongodb').ObjectID;
const appConfig = require('../../../config');
const { findMethod } = require('../../db/methods');
const { schema } = require('../../db');

async function getBKTournamentByAppTournament(id = '') {
  const collectionName = appConfig.collections.tournaments.name;
  const query = {
    class: schema.class.tournament_bk,
    [schema.refs.tournament_app]: new ObjectId(id)
  };
  const result = await findMethod.all(collectionName, query);
  return result.result;
}

module.exports = getBKTournamentByAppTournament;
