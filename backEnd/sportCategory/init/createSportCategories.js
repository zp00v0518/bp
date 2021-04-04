const sport_category = require('./sport_category.json');
const appConfig = require('../../../config');
const { BulkWriteDB, schema } = require('../../db');

async function createSportCategories() {
  if (sport_category.length === 0) return;
  const bulkWrite = new BulkWriteDB();
  await bulkWrite.connect(appConfig.db.name);
  const collection = appConfig.collections.sports.name;
  const bulkList = createListBulkWrite(sport_category);
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
