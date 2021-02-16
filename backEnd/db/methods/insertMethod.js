const InsertDB = require('../InsertDB');
const config = require('../../../config');

const insertMethod = new InsertDB();
insertMethod.connect(config.db.name);

module.exports = insertMethod;
