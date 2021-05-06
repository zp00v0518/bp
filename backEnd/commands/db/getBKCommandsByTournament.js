const ObjectId = require('mongodb').ObjectID;
const { schema } = require('../../db');
const { findMethod } = require('../../db/methods');
const config = require('../../../config');
const { getBKTournamentByBaseTournament } = require('../../tournament/db');

async function getBKCommandsByTournament(id = '') {
  const collectionName = config.collections.commands.name;
  const bkTournaments = await getBKTournamentByBaseTournament(id);
  const ids = bkTournaments.map(i => i._id);
  // const ids = bkTournaments.map(i => i._id.toString());
  const { command } = schema;
  const query = {
    class: command.class,
    [command.ref_tournament.name]: {$in: ids}
  };
  const result = await findMethod.all(collectionName, query);
  return result.result;
}

module.exports = getBKCommandsByTournament;
