const { schema, connectMongoDB, BulkWriteDB } = require('../../../backEnd/db/');
const appConfig = require('../../../config');
const collectionName = appConfig.collections.sports.name;
const dbName = appConfig.db.name;
const mongo = new connectMongoDB();

async function setSportOnDB(baseArr) {
  const { config } = this;
  const list = getListForSave(baseArr, config);
  const bulkWrite = new BulkWriteDB(mongo);
  await bulkWrite.connect(dbName);
  const bulkList = createListBulkWrite(list);
  await bulkWrite.set(collectionName, bulkList);
  bulkWrite.close();
  return;
}

function createListBulkWrite(data) {
  const curSchema = schema.sportCategory;
  const result = [];
  const bkKey = curSchema.bkId.name;
  const nameKey = curSchema.name.name;
  data.forEach((item) => {
    const template = {
      filter: {
        class: curSchema.class,
        [bkKey]: item[bkKey],
        [nameKey]: item[nameKey]
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

function getListForSave(arr, config) {
  const baseSchema = schema.sportCategory;
  const list = arr.map((el) => {
    const template = {
      class: baseSchema.class,
      [baseSchema.url.name]: el.url,
      [baseSchema.bkId.name]: config.id,
      [baseSchema.name.name]: el.name
    };
    return template;
  });
  return list;
}

module.exports = setSportOnDB;
