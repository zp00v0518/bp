const appDB = require('../../backEnd/db');
const appConfig = require('../../config');
const { schema, connectMongoDB, FindInDB } = appDB;
const collectionName = appConfig.collections.tournaments.name;
const dbName = appConfig.db.name;

async function getTournametsForParse() {
  const mongo = new connectMongoDB();
  const find = new FindInDB(mongo);
  await find.connect(dbName);
  const refs = schema.refs;
  const query = {
    class: schema.class.tournament,
    [refs.tournament.name]: { $exists: true }
  };
  const result = await find.all(collectionName, query);
  const data = adapterData(result.result);
  find.close();
	return data;
}

function adapterData(arr) {
  const refs = schema.refs;
  const field = refs.tournament.name;
  const result = {};
  arr.forEach((item) => {
    const id = item[field];
    if (!result[id]) result[id] = [];
    result[id].push(item);
  });
  return result;
}

module.exports = getTournametsForParse;
