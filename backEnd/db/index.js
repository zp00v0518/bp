const InsertDB = require('./InsertDB');
const UpdateDB = require('./UpdateDB');
const FindInDB = require('./FindInDB');
const AggregateDB = require('./AggregateDB');
const DeleteDB = require('./DeleteDB');
const BulkWriteDB = require('./BulkWriteDB');
const schema = require('./schema');
const connectMongoDB = require('./connectMongoDB');

module.exports = {
  InsertDB,
  UpdateDB,
  schema,
  FindInDB,
  AggregateDB,
  BulkWriteDB,
  connectMongoDB,
  DeleteDB
};
