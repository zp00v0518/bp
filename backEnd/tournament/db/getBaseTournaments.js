const appConfig = require('../../../config');
const { findMethod } = require('../../db/methods');
const { schema } = require('../../db');

async function getBaseTournaments() {
  const collectionName = appConfig.collections.tournaments.name;
  const query = {
    class: schema.class.tournament_type
  };
  const needFields = {
    class: 0
  };
  const result = await findMethod.all(collectionName, query, { needFields });
  return result.result;
}

module.exports = getBaseTournaments;
