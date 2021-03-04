const config = require('../../../config');
const { findMethod } = require('../../db/methods');


async function getMenuFromDB() {
	const collectionName = config.collections.menu.name;
}

module.exports = getMenuFromDB;
