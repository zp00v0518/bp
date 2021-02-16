const { BulkWriteDB, schema } = require('../../../backEnd/db');
const config = require('../../../config');

const bulkWrite = new BulkWriteDB();

async function addEventsToDB(data = []) {
  const arr = data.filter((i) => !!i.command_1_id && !!i.command_2_id);
  if (arr.length === 0) return;
  await bulkWrite.connect(config.db.name);
  const collectionName = config.collections.events.name;
  const bulkList = createListBulkWrite(arr);
  await bulkWrite.set(collectionName, bulkList);
  bulkWrite.close();
}

function createListBulkWrite(data) {
  const result = [];
  data.forEach((item) => {
    const template = {
      filter: {
        command_1_id: item.command_1_id,
        command_2_id: item.command_2_id,
        date: item.date,
        class: schema.class.event
      },
      update: {
        $addToSet: { coeffList: item.coeffList[0] },
        $set: {
          dateStr: item.dateStr,
          command_1: item.command_1,
          command_2: item.command_2
        }
      },
      upsert: true
    };
    result.push({ updateOne: template });
  });
  return result;
}

module.exports = addEventsToDB;
