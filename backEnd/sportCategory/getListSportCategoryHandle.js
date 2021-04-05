const { sendWSMessage } = require('../wsServer');
const { getAllSports } = require('./db');

async function getListSportCategoryHandle(data, UserOnline) {
  const { ws } = UserOnline;
  if (!ws || ws.readyState !== 1) return;
  const result = await getAllSports();
  const message = {
    type: data.type,
    data: result
  };
  sendWSMessage(ws, message);
}

module.exports = getListSportCategoryHandle;
