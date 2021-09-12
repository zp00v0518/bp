const { schema } = require('../../db');
const { findMethod } = require('../../db/methods');
const config = require('../../../config');

async function getAppCommandsByAppTournament(id = '') {
  const collectionName = config.collections.commands.name;
  const { refs } = schema;
  const query = {
    class: schema.class.command_app,
    [refs.tournament_app]: id //TODO: почему-то мне кажтся, что здесь должна быть проверка на tournament_app. (последствия рефакторинга)
  };
  const result = await findMethod.all(collectionName, query);
  return result.result;
}

module.exports = getAppCommandsByAppTournament;
