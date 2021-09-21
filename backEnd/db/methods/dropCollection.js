const ConnectMongoDB = require('../connectMongoDB');

async function dropCollection(dbName = 'test', collectionName = 'test') {
  const Mongo = new ConnectMongoDB();
  const z = await Mongo.connect({ dbName });
  const collection = await Mongo.open(collectionName);
  let flag = false;
  try {
    await collection.drop();
    flag = true;
  } catch (err) {
    console.log(err)
  }
  Mongo.close();
  return flag;
}

module.exports = dropCollection;
