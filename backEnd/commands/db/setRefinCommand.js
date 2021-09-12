const ObjectId = require('mongodb').ObjectID;
const { schema } = require('../../db');
const { bulkWriteMethod } = require('../../db/methods');
const config = require('../../../config');

async function setRefinCommand(obj = {}) {
  const collectionName = config.collections.commands.name;
  const bulkList = createListBulkWrite(obj);
  const bulkResult = await bulkWriteMethod.set(collectionName, bulkList);
	return bulkResult
}

function createListBulkWrite(data) {
  const result = [];
  const { refs } = schema;
  Object.keys(data).forEach((key) => {
    // const arrIds = data[key].map((i) => new ObjectId(i));
    const arrIds = data[key].map((i) => new ObjectId(i).toString());
    const template = {
      filter: {
        class: schema.class.command_bk,
        _id: { $in: arrIds }
      },
      update: {
        $set: {
          [refs.command_app]: new ObjectId(key)
        }
      },
      upsert: false
    };
    result.push({ updateMany: template });
  });
  return result;
}

module.exports = setRefinCommand;
