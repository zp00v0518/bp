const {
  schema,
  connectMongoDB,
  BulkWriteDB
} = require('../../../../backEnd/db/');
const appConfig = require('../../../../config');
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
  const linkItem = curSchema.links.item.fields;
  const result = [];
  const linksKey = curSchema.links.name;
  const bkIdKey = linkItem.bkId.name;
  data.forEach((item) => {
    const template = {
      filter: {
        class: curSchema.class,
        [linksKey]: {
          $elemMatch: {
            [linkItem.name.name]: item[linkItem.name.name],
            [bkIdKey]: item[linksKey][0][bkIdKey]
          }
        }
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
    const template = {};
    template[baseSchema.name.name] = el.name;
    template[baseSchema.alias.name] = [];
    template[baseSchema.alias.name].push(el.name);
    template[baseSchema.links.name] = [];
    const itemSchema = baseSchema.links.item.fields;
    const bkEl = {
      [itemSchema.url.name]: el.url,
      [itemSchema.name.name]: el.name,
      [itemSchema.bkId.name]: config.id
    };
    template[baseSchema.links.name].push(bkEl);
    return template;
  });
  return list;
}

module.exports = setSportOnDB;
