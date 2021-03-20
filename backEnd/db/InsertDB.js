const ConnectMongoDB = require('./connectMongoDB.js');

const mongo = new ConnectMongoDB();

class InsertDB {
  constructor(mongoInstance = mongo) {
    this.mongo = mongoInstance;
  }

  close() {
    this.mongo.close();
  }

  async connect(dbName) {
    this.dbName = dbName;
    const result = await this.mongo.connect({ dbName });
    return result;
  }

  async one(collectionName, doc) {
    const collection = this.mongo.open(collectionName);
    const result = await collection.insertOne(doc);
    return result;
  }

  async many(collectionName, docs, options = null) {
    const collection = this.mongo.open(collectionName);
    const result = await collection.insertMany(docs, options);
    return result;
  }
}
// function InsertDB() {
//   // options  - объект с полями:
//   // collectionName = String;
//   // doc = Object;
//   this.mongo = mongo;
//   this.one = function(options, callback = function() {}) {
//     return new Promise((resolve, reject) => {
//       let collection = mongo.open(options.collectionName);
//       collection.insertOne(options.doc, (err, result) => {
//         if (err) {
//           reject(err);
//           throw err;
//         }
//         resolve(result);
//         return callback(result);
//       });
//     });
//   };
//   this.many = function(options, callback = function() {}) {
//     return new Promise((resolve, reject) => {
//       let collection = mongo.open(options.collectionName);
//       let ops = options.options || null;
//       collection.insertMany(options.doc, ops, (err, result) => {
//         if (err) {
//           reject(err);
//           throw err;
//         }
//         resolve(result);
//         return callback(result);
//       });
//     });
//   };
//   this.close = function() {
//     mongo.close();
//   };
// }

module.exports = InsertDB;
