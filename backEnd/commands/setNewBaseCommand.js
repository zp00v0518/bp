const { insertMethod } = require('../db/methods');
const { schema } = require('../db');
const config = require('../../config');

async function setNewBaseCommand(unsetArr = []) {
  if (unsetArr.length === 0) return [];
  const collectionName = config.collections.commands.name;
  unsetArr.forEach((item) => {
    item.class = schema.class.bk_command;
  });
  const result = await insertMethod.many(collectionName, unsetArr);
  return result.ops;
}
module.exports = setNewBaseCommand;
