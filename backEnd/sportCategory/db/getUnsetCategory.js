const appConfig = require('../../../config');
const { findMethod } = require('../../db/methods');
const { schema } = require('../../db');

async function getUnsetCategory() {
  const collectionName = appConfig.collections.sports.name;
  const keys = schema.sportCategory;
  const query = {
    class: schema.class.sport_bk,
    $and: [
      { [keys.ref_sport_app]: { $exists: false } },
      { [keys.ref_sport_app]: { $ne: '' } }
    ]
  };
  const needFields = {
    class: 0
    // _id: 0
  };
  const result = await findMethod.all(collectionName, query, { needFields });
  return result.result;
}

module.exports = getUnsetCategory;
