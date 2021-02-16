const ConnectMongoDB = require('./connectMongoDB.js');
const config = require('../../config');

const mongo = new ConnectMongoDB();
mongo.connect({ dbName: config.db.name });

function FindInDB() {
  this.one = async function(collectionName = 'test', options = {}) {
    const collection = mongo.open(collectionName);
    const needFields = options.needFields || null;
    const query = options.query || null;
    const skip = options.skip || null;
    const result = await collection.findOne(query, {
      projection: needFields,
      skip
    });
    return result;
  };

  this.all = async function(collectionName = 'test', query = {}, options = {}) {
    const collection = mongo.open(collectionName);
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
  };
  this.count = function(options, callback = function() {}) {
    return new Promise((resolve, reject) => {
      const collection = mongo.open(options.collectionName);
      const query = options.query || null;
      collection.countDocuments(query, (err, count) => {
        if (err) {
          reject(err);
          throw err;
        }
        resolve(count);
        return callback(count);
      });
    });
  };

  this.close = function() {
    mongo.close();
  };
}

module.exports = FindInDB;
