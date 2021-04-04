const { schema, InsertDB, connectMongoDB } = require('../../../../backEnd/db/');
const appConfig = require('../../../../config');
const collectionName = appConfig.collections.sports.name;
const dbName = appConfig.db.name;
const mongo = new connectMongoDB();

async function setSportOnDB(baseArr) {
  const { config } = this;
  const list = getListForSave(baseArr, config);
  const insertMethod = new InsertDB(mongo);
  await insertMethod.connect(dbName);
  await insertMethod.many(collectionName, list);
  insertMethod.close();
  return;
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
