const appConfig = require('../../../config');
const { insertMethod } = require('../../db/methods');
const getTemplateTournament = require('../getTemplateTournament');

async function addNewTournamentsOnDB(data = {}) {
  const collectionName = appConfig.collections.tournaments.name;
  const list = [];
  Object.keys(data).forEach((key) => {
    const item = data[key];
    const tour = getTemplateTournament(item.tournamentName, item.sportName);
    list.push(tour);
  });
	const result = await insertMethod.many(collectionName, list);
  return result.ops
}

module.exports = addNewTournamentsOnDB;
