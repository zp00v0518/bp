const config = require('../../../config');
const dropCollection = require('../../db/methods/dropCollection');

async function dropCommandsCollection() {
  const dbName = config.db.name;
  const collectionName = config.collections.commands.name;
  const result = await dropCollection(dbName, collectionName);
  return result;
}

module.exports = dropCommandsCollection;
