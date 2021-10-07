const AggregateDB = require('../AggregateDB');
const config = require('../../../config');

const aggregateMethod = new AggregateDB();
aggregateMethod.connect(config.db.name);

module.exports = aggregateMethod;
