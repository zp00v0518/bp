const { schema } = require('../db');
const { findMethod } = require('../db/methods');
// const { FindInDB, schema } = require('../db');
const config = require('../../config');
const { sendWSMessage } = require('../wsServer');

// const findInDB = new FindInDB();

async function getMatching(data, UserOnline) {
  const ws = UserOnline.ws;
  const { type } = data;
  const collectionName = config.collections.commands.name;
  const query = {
    class: schema.class.unset
  };
  const result = await findMethod.all(collectionName, query);
  // const result = await findInDB.all(collectionName, query);
  result.result[0].commands.sort();
  // if (result.result[0].commands.length > 300) result.result[0].commands.length = 400;
  // console.log(result.result[0].commands.length);
  const message = {
    type,
    payload: result.result
  };
  sendWSMessage(ws, message);
}

module.exports = getMatching;
