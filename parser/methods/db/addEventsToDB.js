const { BulkWriteDB, schema } = require('../../../backEnd/db');
const config = require('../../../config');

const bulkWrite = new BulkWriteDB();

async function addEventsToDB(data = []) {
  const arr = data.filter((i) => !!i.commandId_1 && !!i.commandId_2);
  if (arr.length === 0) return;
  await bulkWrite.connect(config.db.name);
  const collectionName = config.collections.events.name;
  const bulkList = createListBulkWrite(arr);
  const bulkResult = await bulkWrite.set(collectionName, bulkList);
  bulkWrite.close();
  return bulkResult;
}

function createListBulkWrite(data) {
  const result = [];
  const { refs } = schema;
  data.forEach((item) => {
    const template = {
      filter: {
        commandId_1: item.commandId_1,
        commandId_2: item.commandId_2,
        date: item.date,
        class: schema.class.event,
        bkId: item.bkId,
        [refs.tournament_bk]: item[refs.tournament_bk]
      },
      update: {
        $set: {
          coeff: item.coeff
        }
      },
      upsert: true
    };
    result.push({ updateOne: template });
  });
  return result;
}

// function createListBulkWrite(data) {
//   const result = [];
//   data.forEach((item) => {
//     const template = {
//       filter: {
//         command_1_id: item.command_1_id,
//         command_2_id: item.command_2_id,
//         date: item.date,
//         class: schema.class.event
//       },
//       update: {
//         $addToSet: { coeffList: item.coeffList[0] },
//         $set: {
//           dateStr: item.dateStr,
//           command_1: item.command_1,
//           command_2: item.command_2
//         }
//       },
//       upsert: true
//     };
//     result.push({ updateOne: template });
//   });
//   return result;
// }

module.exports = addEventsToDB;
