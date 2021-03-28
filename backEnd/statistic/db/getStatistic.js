const config = require('../../../config');
const { findMethod } = require('../../db/methods');
const { schema } = require('../../db');

async function getStatistic(){
	const collectionName = config.collections.statistic.name;
	const query = {
		class: schema.baseStat.class
	}
	const result = await findMethod.one(collectionName, {query});
	return result;
}

module.exports = getStatistic;
