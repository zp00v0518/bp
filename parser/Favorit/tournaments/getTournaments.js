const { getTournamentsBaseFunc } = require('../../methods');
const parseSportCategoryOnTournament = require('./parseSportCategoryOnTournament');

async function getTournaments() {
  const tournaments = await getTournamentsBaseFunc.apply(this, [
    parseSportCategoryOnTournament
  ]);
  return tournaments;
}

module.exports = getTournaments;
