const {
  getAppCommandsByAppTournament,
  getBKCommandsByAppTournament
} = require('../db');

async function getBaseCommandHandler(data) {
  const { tournamet_id } = data;
  const baseCommands = await getAppCommandsByAppTournament(tournamet_id);
  const BKCommands = await getBKCommandsByAppTournament(tournamet_id);
  const message = {
    type: data.type,
    baseCommands,
    BKCommands
  };
  return message;
}
module.exports = getBaseCommandHandler;
