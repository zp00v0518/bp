const getCommandsByName = require('./getCommandsByName');
const addUnsetCommandsToDB = require('./addUnsetCommandsToDB');
const addEventsToDB = require('./addEventsToDB');
const addForkResultToDB = require('./addForkResultToDB');
const setSportOnDB = require('./setSportOnDB');
const getUrlsForParseTournament = require('./getUrlsForParseTournament');

module.exports = {
  getCommandsByName,
  addUnsetCommandsToDB,
  addEventsToDB,
  addForkResultToDB,
  setSportOnDB,
  getUrlsForParseTournament
};
