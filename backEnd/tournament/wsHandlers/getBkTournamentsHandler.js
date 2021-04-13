const { getBkTournaments } = require('../db');

async function getBkTournamentsHandler(data) {
  const result = await getBkTournaments();
  const message = {
    type: data.type,
    data: result
  };
  return message;
}

module.exports = getBkTournamentsHandler;
