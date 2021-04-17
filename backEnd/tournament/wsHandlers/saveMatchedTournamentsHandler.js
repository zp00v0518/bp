const { saveMatchedTournaments } = require('../db');

async function saveMatchedTournamentsHandler(data) {
  const result = await saveMatchedTournaments(data.data);
  const message = {
    type: data.type,
    data: result
  };
  return message;
}

module.exports = saveMatchedTournamentsHandler;
s