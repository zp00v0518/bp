const ConnectMongoDB = require('./connectMongoDB.js');
// const config = require('../../config');
const mongo = new ConnectMongoDB();

class AggregateDB {
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
    const result = await this.mongo.connect({ dbName });
    this.isReady = true;
    return result;
  }

  async get(collectionName, pipline = [], options = {}) {
    const collection = this.mongo.open(collectionName);
    const result = await collection.aggregate(pipline, options).toArray();
    return result;
  }
}

module.exports = AggregateDB;
