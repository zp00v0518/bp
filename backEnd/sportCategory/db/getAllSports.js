const appConfig = require('../../../config');
const { findMethod } = require('../../db/methods');
const { schema } = require('../../db');

async function getAllSports() {
  const collectionName = appConfig.collections.sports.name;
  const query = {
    class: schema.class.sport_app
  };
  const needFields = {
    class: 0
    // _id: 0
  };
  const result = await findMethod.all(collectionName, query, { needFields });
  return result.result;
}

module.exports = getAllSports;
