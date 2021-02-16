const FindInDB = require('../FindInDB');
const config = require('../../../config');

const findMethod = new FindInDB();
findMethod.connect(config.db.name);

module.exports = findMethod;
