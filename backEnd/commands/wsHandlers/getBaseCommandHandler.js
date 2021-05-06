const {
  getBaseCommandsByTournament,
  getBKCommandsByTournament
} = require('../db');

async function getBaseCommandHandler(data) {
  const { tournamet_id } = data;
  const baseCommands = await getBaseCommandsByTournament(tournamet_id);
  const BKCommands = await getBKCommandsByTournament(tournamet_id);
  const message = {
    type: data.type,
    baseCommands,
    BKCommands
  };
  return message;
}
module.exports = getBaseCommandHandler;
