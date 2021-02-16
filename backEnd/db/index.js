const InsertDB = require('./InsertDB');
const UpdateDB = require('./UpdateDB');
const FindInDB = require('./FindInDB');
const AggregateDB = require('./AggregateDB');
const BulkWriteDB = require('./BulkWriteDB');
const schema = require('./schema');

module.exports = {
  InsertDB,
  UpdateDB,
  schema,
  FindInDB,
  AggregateDB,
  BulkWriteDB
};
