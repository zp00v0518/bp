const config = require('../../../config');
const dropCollection = require('../../db/methods/dropCollection');

async function dropMenuCollection() {
  const dbName = config.db.name;
  const collectionName = config.collections.menu.name;
  const result = await dropCollection(dbName, collectionName);
  return result;
}

module.exports = dropMenuCollection;
