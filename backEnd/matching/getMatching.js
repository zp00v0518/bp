const { schema } = require('../db');
const { findMethod } = require('../db/methods');
const config = require('../../config');
const { sendWSMessage } = require('../wsServer');

async function getMatching(data, UserOnline) {
  const ws = UserOnline.ws;
  const { type } = data;
  const collectionName = config.collections.commands.name;
  const query = {
    class: schema.class.unset
  };
  const result = await findMethod.all(collectionName, query);
  result.result[0].commands.sort();
  const message = {
    type,
    payload: result.result
  };
  sendWSMessage(ws, message);
}

module.exports = getMatching;
