const ConnectMongoDB = require('./connectMongoDB.js');
// const config = require('../../config');
const mongo = new ConnectMongoDB();

class UpdateDB {
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

  async one(collectionName, query, doc, options = null) {
    const collection = this.mongo.open(collectionName);
    const result = await collection.updateOne(query, doc, options);
    return result;
  }

  async updateMany(
    collectionName,
    filter = {},
    updateDoc = {},
    options = null
  ) {
    const collection = this.mongo.open(collectionName);
    const result = await collection.updateMany(filter, updateDoc, options);
    return result;
  }
}

// function updateDB() {
//   // options  - объект с полями:
//   // collectionName = String;
//   // filtr = Object;`
//   // updateDoc = Object;
//   // ops = Object;

//   this.one = function(options, callback = function() {}) {
//     return new Promise((resolve, reject) => {
//       if (!options.collectionName || !options.filtr || !options.updateDoc) {
//         log.log('Обновить БД не представляется возможным, т.к. не переданы все необходимые параметры');
//       }
//       let collection = mongo.open(options.collectionName);
//       let ops = options.ops || null;
//       collection.updateOne(options.filtr, options.updateDoc, ops, (err, result) => {
//         if (err) {
//           reject(err);
//           return callback(err);
//         }
//         resolve(result);
//         return callback(null, result);
//       });
//     });
//   };
//   this.replaceOne = function(options, callback = function() {}) {
//     return new Promise((resolve, reject) => {
//       if (!options.collectionName || !options.filtr || !options.updateDoc) {
//         log.log('Обновить БД не представляется возможным, т.к. не переданы все необходимые параметры');
//       }
//       let collection = mongo.open(options.collectionName);
//       let ops = options.ops || null;
//       collection.replaceOne(options.filtr, options.updateDoc, ops, (err, result) => {
//         if (err) {
//           reject(err);
//           return callback(err);
//         }
//         resolve(result);
//         return callback(null, result);
//       });
//     });
//   };

//   this.updateMany = async function(options, extra = null) {
//     if (!options.collectionName || !options.filtr || !options.updateDoc) {
//       log.log('Обновить БД не представляется возможным, т.к. не переданы все необходимые параметры');
//     }
//     const collection = mongo.open(options.collectionName);
//     const result = await collection.updateMany(options.filtr, options.updateDoc, extra);
//     return result;
//   };
//   this.close = function() {
//     mongo.close();
//   };

//   this.many = function() {};
// }

module.exports = UpdateDB;
