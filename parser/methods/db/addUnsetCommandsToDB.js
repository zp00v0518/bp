const appConfig = require('../../../config');
const { UpdateDB, schema } = require('../../../backEnd/db');

const update = new UpdateDB();

async function addUnsetCommandsToDB(arr, sport = appConfig.sports.football.name) {
  await update.connect(appConfig.db.name);
  const collection = appConfig.collections.commands.name;
  const query = {
    class: schema.class.unset,
    sport
  };
  const doc = {
    $addToSet: { commands: { $each: arr } }
  };
  const options = {
    upsert: true
  };
  const resultUpdate = await update.one(collection, query, doc, options);
  update.close();
  return resultUpdate.result;
}

module.exports = addUnsetCommandsToDB;
