const { insertMethod } = require('../db/methods');
const { schema } = require('../db');
const config = require('../../config');

async function setNewBaseCommand(unsetArr = []) {
  const collectionName = config.collections.commands.name;
  unsetArr.forEach((item) => {
    item.class = schema.class.base_command;
  });
  const result = await insertMethod.many(collectionName, unsetArr);
  return result;
}
module.exports = setNewBaseCommand;
