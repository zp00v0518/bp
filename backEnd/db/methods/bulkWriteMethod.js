const BulkWriteDB = require('../BulkWriteDB');
const config = require('../../../config');

const bulkWriteMethod = new BulkWriteDB();
bulkWriteMethod.connect(config.db.name);

module.exports = bulkWriteMethod;