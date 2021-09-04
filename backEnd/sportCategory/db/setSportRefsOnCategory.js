const ObjectId = require('mongodb').ObjectID;
const config = require('../../../config');
const { schema } = require('../../db');
const { bulkWriteMethod } = require('../../db/methods');

async function setSportRefsOnCategory(data, idsSport) {
  const collectionName = config.collections.sports.name;
  const bulkList = createListBulkWrite(data, idsSport);
  const bulkResult = await bulkWriteMethod.set(collectionName, bulkList);
  return bulkResult;
}

function createListBulkWrite(data = {}, idsSports) {
  const result = [];
  const { sportCategory } = schema;
  Object.keys(data).forEach((key) => {
    const { ids } = data[key];
    const arrIds = ids.map((i) => new ObjectId(i));
    const template = {
      filter: {
        class: schema.class.sport_bp,
        _id: { $in: arrIds }
      },
      update: {
        $set: {
          [sportCategory.ref.name]: new ObjectId(idsSports[key]),
          [sportCategory.name_sport.name]: key
        }
      },
      upsert: false
    };
    result.push({ updateMany: template });
  });
  return result;
}

module.exports = setSportRefsOnCategory;
