const appConfig = require('../../../config');
const { findMethod } = require('../../db/methods');
const { schema } = require('../../db');

async function getBkTournaments() {
  const collectionName = appConfig.collections.tournaments.name;
  const query = {
    class: schema.class.tournament_bk
  };
  const needFields = {
    class: 0
  };
  const result = await findMethod.all(collectionName, query, { needFields });
  return result.result;
}

module.exports = getBkTournaments;
