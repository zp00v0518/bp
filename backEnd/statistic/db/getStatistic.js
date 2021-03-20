const config = require('../../../config');
const { findMethod } = require('../../db/methods');

async function getStatistic(){
	const collectionName = config.collections.statistic.name;

}

module.exports = getStatistic;
