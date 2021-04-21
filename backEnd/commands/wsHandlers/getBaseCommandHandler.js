const {
  getBaseCommandsByTournament,
  getBKCommandsByTournament
} = require('../db');

async function getBaseCommandHandler(data) {
  const { id, field } = data;
  let baseCommands = [];
  let BKCommands = [];
  const message = {
    type: data.type,
    baseCommands,
    BKCommands,
    id
  };
  if (field === 'id') {
    baseCommands = await getBaseCommandsByTournament(id);
    BKCommands = await getBKCommandsByTournament(id);
  }
  return message;
}
module.exports = getBaseCommandHandler;
