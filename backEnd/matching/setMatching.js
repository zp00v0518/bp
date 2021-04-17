const { insertMethod } = require('../db/methods');
const { schema } = require('../db');
const config = require('../../config');
const removeMatchingCommand = require('./removeMatchingCommand');

function createCommand(sport, command) {
  const alias = command.alias || [];
  if (!alias.includes(command.base)) {
    alias.push(command.base);
  }
  const doc = {
    class: schema.class.command,
    sport,
    alias,
    name: command.base
  };
  return doc;
}

async function setMatching(payload, { ws }) {
  const { data } = payload;
  const docs = [];
  Object.keys(data).forEach((key) => {
    const commandArr = data[key];
    commandArr.forEach((item) => {
      const doc = createCommand(key, item);
      docs.push(doc);
    });
  });
  const collectionName = config.collections.commands.name;
  await insertMethod.many(collectionName, docs);
  await removeMatchingCommand(docs);
}

module.exports = setMatching;
