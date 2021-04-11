const getCommandsByName = require('./getCommandsByName');
const addUnsetCommandsToDB = require('./addUnsetCommandsToDB');
const addEventsToDB = require('./addEventsToDB');
const addForkResultToDB = require('./addForkResultToDB');
const setSportOnDB = require('./setSportOnDB');
const getUrlsForParseTournament = require('./getUrlsForParseTournament');
const saveTournamentsOnDb = require('./saveTournamentsOnDb');

module.exports = {
  getCommandsByName,
  addUnsetCommandsToDB,
  addEventsToDB,
  addForkResultToDB,
  setSportOnDB,
  getUrlsForParseTournament, 
  saveTournamentsOnDb
};
