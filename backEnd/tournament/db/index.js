const getAppTournaments = require('./getAppTournaments');
const getBkTournaments = require('./getBkTournaments');
const saveMatchedTournaments = require('./saveMatchedTournaments');
const getBKTournamentByAppTournament = require('./getBKTournamentByAppTournament');
const addNewTournamentsOnDB = require('./addNewTournamentsOnDB');

module.exports = {
  getAppTournaments,
  getBkTournaments,
  saveMatchedTournaments,
  getBKTournamentByAppTournament,
  addNewTournamentsOnDB
};
