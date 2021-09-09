const { getAppTournaments } = require('../db');

async function getAppTournamentsHandler(data) {
  const result = await getAppTournaments();
  const message = {
    type: data.type,
    data: result
  };
  return message;
}

module.exports = getAppTournamentsHandler;
