const ObjectId = require('mongodb').ObjectID;
const { schema } = require('../../db');
const { findMethod } = require('../../db/methods');
const config = require('../../../config');

async function getBaseCommandsByTournament(id = '') {
  const collectionName = config.collections.commands.name;
  const { command_type } = schema;
  const query = {
    class: schema.class.command_type,
    [command_type.tournament_type.name]: new ObjectId(id)
  };
  const result = await findMethod.all(collectionName, query);
  return result.result;
}

module.exports = getBaseCommandsByTournament;
