const ConnectMongoDB = require('./connectMongoDB.js');

const mongo = new ConnectMongoDB();

class FindInDB {
  constructor() {
    this.mongo = mongo;
    this.dbName = null;
    this.isReady = false;
  }

  close() {
    this.mongo.close();
  }

  async connect(dbName) {
    this.dbName = dbName;
    const result = await mongo.connect({ dbName });
    this.isReady = true;
    return result;
  }

  async one(collectionName = 'test', options = {}) {
    const collection = this.mongo.open(collectionName);
    const needFields = options.needFields || null;
    const query = options.query || null;
    const skip = options.skip || null;
    const result = await collection.findOne(query, {
      projection: needFields,
      skip
    });
    return result;
  }

  async all(collectionName = 'test', query = {}, options = {}) {
    const collection = this.mongo.open(collectionName);
    const sort = options.sort || 0;
    const limit = options.limit || 0;
    const skip = options.skip || 0;
    const needFields = options.needFields || null;
    const comment = options.comment || null;
    const itog = await collection
      .find(query, {
        projection: needFields,
        sort,
        skip,
        limit,
        comment
      })
      .toArray();

    const findResult = {
      result: itog,
      sort,
      limit,
      skip
    };
    return findResult;
  }
}

module.exports = FindInDB;
// module.exports = FindInDB;
