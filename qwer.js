const ObjectID = require('mongodb').ObjectID;
const { FindInDB, BulkWriteDB, connectMongoDB } = require('./backEnd/db');
const config = require('./config');
const mongo = new connectMongoDB();
const find = new FindInDB(mongo);

async function start() {
  await find.connect(config.db.name);
  const tournamentsId = await getTournamentsId();
  const tournaments = await getBaseTournament(tournamentsId);
  const bulkWrite = new BulkWriteDB();
  await bulkWrite.connect(config.db.name);
  const bulkList = createListBulkWrite(tournaments);
  const result = await bulkWrite.set('commands', bulkList);
  find.close();
  bulkWrite.close();
}

async function getTournamentsId() {
  const collection = config.collections.commands.name;
  const result = await find.distinct(collection, 'ref_tournament');
  return result;
}

async function getBaseTournament(arrId) {
  const collection = config.collections.tournaments.name;
  const z = arrId.map((i) => new ObjectID(i));
  const query = {
    _id: { $in: z }
  };
  const options = {
    needFields: {
      tournament_type: 1,
      _id: 1
    }
  };
  const result = await find.all(collection, query, options);
  return result.result;
}

function createListBulkWrite(data) {
  const result = [];
  const z = {}
  data.forEach((item) => {
    z[item._id] = item.tournament_type.toString()
    const template = {
      filter: {
        ref_tournament: item._id.toString()
      },
      update: {
        $set: {
          tournament_type: item.tournament_type
        }
      }
    };
    result.push({ updateMany: template });
  });
  return result;
}

start();
