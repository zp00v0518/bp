const ConnectMongoDB = require('./connectMongoDB.js');
// const config = require('../../config');
const mongo = new ConnectMongoDB();

class BulkWriteDB {
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

  async set(collectionName, query = [], options = {}) {
    const collection = this.mongo.open(collectionName);
    const result = await collection.bulkWrite(query, options);
    return result;
  }
}

module.exports = BulkWriteDB;
