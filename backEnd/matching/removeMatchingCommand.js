const { updateMethod } = require('../db/methods');
const config = require('../../config');
const { schema } = require('../db');

async function removeMatchingCommand(docs) {
  const list = {};
  docs.forEach((item) => {
    const key = item.sport;
    if (!list[key]) {
      list[key] = [];
    }
    list[key].push(...item.alias);
  });
  const collectionName = config.collections.commands.name;
  Object.keys(list).forEach(async (key) => {
    const item = list[key];
    const query = {
      class: schema.class.unset,
      sport: key
    };
    const doc = {
      $pullAll: { commands: item }
    };
    await updateMethod.one(collectionName, query, doc);
  });
}

module.exports = removeMatchingCommand;
