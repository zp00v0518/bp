const getBaseTournaments = require('./getBaseTournaments');
const getBkTournaments = require('./getBkTournaments');
const saveMatchedTournaments = require('./saveMatchedTournaments');
const getBKTournamentByBaseTournament = require('./getBKTournamentByBaseTournament');
const addNewTournamentsOnDB = require('./addNewTournamentsOnDB');

module.exports = {
  getBaseTournaments,
  getBkTournaments,
  saveMatchedTournaments,
  getBKTournamentByBaseTournament,
  addNewTournamentsOnDB
};
