const config = require('../../../config');
const DeleteDB = require('../../db/DeleteDB');
const connectMongoDB = require('../../db/connectMongoDB');
const schema = require('../../db/schema');

async function deleteUnsetCommands() {
  const dbName = config.db.name;
  const collectionName = config.collections.commands.name;
  const mongo = new connectMongoDB();
  const deleteMethod = new DeleteDB(mongo);
  await deleteMethod.connect(dbName);
  const query = {
    class: schema.class.command_bk,
    [schema.refs.command_app]: { $exists: false }
  };
  const result = await deleteMethod.many(collectionName, query);
  console.log(result.result)
  await deleteMethod.close();
}
module.exports = deleteUnsetCommands;

deleteUnsetCommands();
