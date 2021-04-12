const sport_category = require('./sport_category');
const appConfig = require('../../../config');
const { BulkWriteDB, schema } = require('../../db');
const dropSportCollection = require('../db/dropSportCollection');

async function createSportCategories() {
  const values = Object.values(sport_category);
  if (values.length === 0) return;
  await dropSportCollection();
  const bulkWrite = new BulkWriteDB();
  await bulkWrite.connect(appConfig.db.name);
  const collection = appConfig.collections.sports.name;
  const bulkList = createListBulkWrite(values);
  await bulkWrite.set(collection, bulkList);

  bulkWrite.close();
}

function createListBulkWrite(data) {
  const result = [];
  data.forEach((item) => {
    item.class = schema.class.sport;
    const template = {
      filter: {
        name: item.name
      },
      update: {
        $setOnInsert: item
      },
      upsert: true
    };
    result.push({ updateOne: template });
  });
  return result;
}
module.exports = createSportCategories;
