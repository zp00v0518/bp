const config = require("../config");
const serversList = config.db.collections.servers;

function getCollectionName(name) {
  let collection = "";
  for (let i = 0; i < serversList.length; i++) {
    if (serversList[i].name === name) {
      collection = serversList[i].collectionName;
      break;
    }
  }
  return collection;
}

module.exports = getCollectionName;
