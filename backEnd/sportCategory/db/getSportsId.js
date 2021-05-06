const config = require('../../../config');
const { findMethod } = require('../../db/methods');
const { schema } = require('../../db');

async function getSportsId(arr = []) {
  const collectionName = config.collections.sports.name;
  const query = {
    class: schema.class.sport,
    name: { $in: arr }
  };
  const finded = await findMethod.all(collectionName, query);
  const result = {};
  finded.result.forEach((item) => {
    result[item.name] = item._id;
  });
  return result;
}
module.exports = getSportsId;
