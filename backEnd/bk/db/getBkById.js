const config = require('../../../config');
const collectionName = config.collections.bk.name;
const { findMethod } = require('../../db/methods');

async function getBkById(arrId) {
  const query = getQuery(arrId);
  const result = await findMethod.all(collectionName, query);
  return result.result;
}
function getQuery(arr) {
  const $or = [];
  for (let h = 0; h < arr.length; h++) {
    const id = arr[h];
    const obj = {
      id
    };
    $or.push(obj);
  }
  return { $or };
}

module.exports = getBkById;
