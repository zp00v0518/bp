const ObjectId = require('mongodb').ObjectID;
const appConfig = require('../../../config');
const { bulkWriteMethod } = require('../../db/methods');
const { schema } = require('../../db');

async function saveMatchedTournaments(data) {
  const collectionName = appConfig.collections.tournaments.name;
  const bulkList = createListBulkWrite(data);
  const result = await bulkWriteMethod.set(collectionName, bulkList);
  return result.result;
}

function createListBulkWrite(data = {}) {
  const result = [];
  const { refs } = schema;
  Object.keys(data).forEach((key) => {
    const arrIds = data[key].map((i) => new ObjectId(i));
    const template = {
      filter: {
        class: schema.class.tournament_bk,
        _id: { $in: arrIds }
      },
      update: {
        $set: {
          [refs.tournament_app]: new ObjectId(key)
        }
      },
      upsert: false
    };
    result.push({ updateMany: template });
  });
  return result;
}

module.exports = saveMatchedTournaments;
