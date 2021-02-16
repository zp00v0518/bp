const UpdateDB = require('../UpdateDB');
const config = require('../../../config');

const updateMethod = new UpdateDB();
updateMethod.connect(config.db.name);

module.exports = updateMethod;
