const appConfig = require('../../../config');
const { findMethod } = require('../../db/methods');
const { schema } = require('../../db');

async function getUnsetCategory() {
  const collectionName = appConfig.collections.sports.name;
  const keys = schema.sportCategory;
  const query = {
    class: schema.class.sport_category,
    $and: [
      { [keys.ref.name]: { $exists: false } },
      { [keys.ref.name]: { $ne: '' } }
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
