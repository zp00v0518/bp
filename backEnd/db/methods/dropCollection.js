const ConnectMongoDB = require('../connectMongoDB');

async function dropCollection(dbName = 'test', collectionName = 'test') {
  const Mongo = new ConnectMongoDB();
  await Mongo.connect({ dbName });
  const collection = await Mongo.open(collectionName);
  let flag = false;
  const x = await collection.stats()
  if (x.size > 0) { // when size === 0 MongoClient throw error
    try {
      await collection.drop();
      flag = true;
    } catch (err) {
      console.log(err)
    }
  }
  Mongo.close();
  return flag;
}

module.exports = dropCollection;
