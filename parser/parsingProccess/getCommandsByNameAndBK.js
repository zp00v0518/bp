const schema = require('../../backEnd/db/schema');
const FindInDB = require('../../backEnd/db/FindInDB');
const config = require('../../config');

const find = new FindInDB();
const collectionName = config.collections.commands.name;

async function getCommandsByName(data) {
  await find.connect(config.db.name);
  const commandsName = new Set();
  const bkIds = new Set();
  const tournaments = new Set();
  const { refs } = schema;
  const refTournamentKey = refs.tournament_bk;
  data.forEach((item) => {
    commandsName.add(item.name);
    bkIds.add(item.bkId);
    tournaments.add(item[refTournamentKey]);
  });
  const query = {
    class: schema.class.command,
    $and: [
      { name: { $in: Array.from(commandsName) } },
      { [refTournamentKey]: { $in: Array.from(tournaments) } },
      { bkId: { $in: Array.from(bkIds) } }
    ]
  };

  const result = await find.all(collectionName, query);
  find.close();
  return result.result;
}

module.exports = getCommandsByName;
