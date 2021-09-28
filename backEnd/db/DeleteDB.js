const ConnectMongoDB = require('./connectMongoDB.js');
// const config = require('../../config');
const mongo = new ConnectMongoDB();

class DeleteDB {
  constructor(mongoInstance = mongo) {
    this.mongo = mongoInstance;
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

  async one(collectionName, query, options = null) {
    // const collection = this.mongo.open(collectionName);
    // const result = await collection.updateOne(query, doc, options);
    // return result;
  }
  async many(collectionName, query) {
    const collection = this.mongo.open(collectionName);
    if (!query || Object.keys(query).length === 0){
      console.error("deleteMany: query is empty")
      return false
    }
    const result = await collection.deleteMany(query);
    return result;
  }

}

module.exports = DeleteDB;
