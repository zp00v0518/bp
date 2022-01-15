const mongoClient = require('mongodb').MongoClient;

function Mongo() {
  const isLog = process.env.DB_LOW_LOG === undefined || process.env.DB_LOW_LOG === '1';
  this.client = null;
  this.open = function(collectionName) {
    this.collection = this.db.collection(collectionName); // often err  - часто возникает при hot-reload сервера, в тот момент, когда идет запрос с фронта
    return this.collection;
  };
  this.close = function() {
    this.client.close();
    if (isLog) console.log('Подключение к Монго закрыто');
  };
  this.connect = async function(options = {}) {
    const dbName = options.dbName || 'test';
    this.url = options.url || 'mongodb://localhost:27017';
    const client = await mongoClient.connect(this.url, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    if (!client) {
      console.log('!!!!!!!!!!!!!Подключение к Монго НЕПРОИЗОШЛО!!!!!!!!!!');
      return false;
    }
    if (isLog) console.log('Подключение к Монго прошло успешно');
    this.db = client.db(dbName);
    this.client = client;
    return true;
  };
}

module.exports = Mongo;
