const schema = require('../../../backEnd/db/schema');
const AggregateDB = require('../../../backEnd/db/AggregateDB');
const config = require('../../../config');

const aggregateDB = new AggregateDB();
const collectionName = config.collections.commands.name;

async function getCommandsByName(data) {
  await aggregateDB.connect(config.db.name);
  const listCommand = [];
  data.forEach((i) => {
    listCommand.push(i.command_1);
    listCommand.push(i.command_2);
  });
  const pipline = [
    { $match: { class: schema.class.command, alias: { $in: listCommand } } }
  ];
  const result = await aggregateDB.get(collectionName, pipline);
  aggregateDB.close();
  return result;
}

module.exports = getCommandsByName;
