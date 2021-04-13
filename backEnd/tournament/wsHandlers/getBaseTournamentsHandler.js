const { getBaseTournaments } = require('../db');

async function getBaseTournamentsHandler(data) {
  const result = await getBaseTournaments();
  const message = {
    type: data.type,
    data: result
  };
  return message;
}

module.exports = getBaseTournamentsHandler;
