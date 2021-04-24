const ObjectId = require('mongodb').ObjectID;
const { schema } = require('../../db');
const { findMethod } = require('../../db/methods');
const config = require('../../../config');

async function getBKCommandsByTournament(id = '') {
  const collectionName = config.collections.commands.name;
  const { base_command, command } = schema;
  const query = {
    class: command.class,
    [base_command.tournament_type.name]: new ObjectId(id)
  };
  const result = await findMethod.all(collectionName, query);
  return result.result;
}

module.exports = getBKCommandsByTournament;
