const config = require('../../../config');
const collectionName = config.collections.bk.name;
const { findMethod } = require('../../db/methods');

async function getListBk() {
  const result = await findMethod.all(collectionName);
  return result.result;
}

module.exports = getListBk;
