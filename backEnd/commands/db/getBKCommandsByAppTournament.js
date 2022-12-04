// const ObjectId = require('mongodb').ObjectID;
const { schema } = require('../../db');
const { findMethod } = require('../../db/methods');
const config = require('../../../config');
const { getBKTournamentByAppTournament } = require('../../tournament/db');

async function getBKCommandsByAppTournament(id = '') {
  const collectionName = config.collections.commands.name;
  const bkTournaments = await getBKTournamentByAppTournament(id);
  // const ids = bkTournaments.map(i => i._id);
  const ids = bkTournaments.map(i => i._id.toString());
  const { refs } = schema;
  const query = {
    class: schema.class.command_bk,
    [refs.tournament_bk]: {$in: ids}
  };
  const result = await findMethod.all(collectionName, query);
  return result.result;
}

module.exports = getBKCommandsByAppTournament;
