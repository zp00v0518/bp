const config = require('../../../config');
const dropCollection = require('../../db/methods/dropCollection');

async function dropSportCollection() {
  const dbName = config.db.name;
  const collectionName = config.collections.sports.name;
  const result = await dropCollection(dbName, collectionName);
  return result;
}

module.exports = dropSportCollection;
