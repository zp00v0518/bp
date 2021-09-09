const getAppTournaments = require('./getAppTournaments');
const getBkTournaments = require('./getBkTournaments');
const saveMatchedTournaments = require('./saveMatchedTournaments');
const getBKTournamentByBaseTournament = require('./getBKTournamentByBaseTournament');
const addNewTournamentsOnDB = require('./addNewTournamentsOnDB');

module.exports = {
  getAppTournaments,
  getBkTournaments,
  saveMatchedTournaments,
  getBKTournamentByBaseTournament,
  addNewTournamentsOnDB
};
