const { BulkWriteDB, schema } = require('../../../backEnd/db');
const config = require('../../../config');

async function saveTournamentsOnDb(arr = []) {
  const bulkWrite = new BulkWriteDB();
  if (arr.length === 0) return;
  const list = arr.flat(Infinity);
  await bulkWrite.connect(config.db.name);
  const collectionName = config.collections.tournaments.name;
  list.forEach((item) => {
    item.class = schema.class.tournament_bk;
  });
  const bulkList = createListBulkWrite(list);
  await bulkWrite.set(collectionName, bulkList);
  bulkWrite.close();
}

function createListBulkWrite(data) {
  const result = [];
  data.forEach((item) => {
    const template = {
      filter: {
        ...item
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

module.exports = saveTournamentsOnDb;
