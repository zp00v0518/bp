const { sendWSMessage } = require('../wsServer');
const { getListBk } = require('./db');

async function handlerGetBKList(data, UserOnline) {
  const { ws } = UserOnline;
  if (!ws || ws.readyState !== 1) return;
  const list = await getListBk();
  const message = {
    type: data.type,
    data: {
      list
    }
  };
  sendWSMessage(ws, message);
  return;
}

module.exports = handlerGetBKList;
