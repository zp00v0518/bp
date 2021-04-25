const { schema } = require('../../db');
const { findMethod } = require('../../db/methods');
const config = require('../../../config');

async function getBaseCommandsByTournament(id = '') {
  const collectionName = config.collections.commands.name;
  const { base_command } = schema;
  const query = {
    class: schema.class.base_command,
    [base_command.tournament_type.name]: id
  };
  const result = await findMethod.all(collectionName, query);
  return result.result;
}

module.exports = getBaseCommandsByTournament;
