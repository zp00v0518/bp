const { sendWSMessage } = require('../wsServer');

async function getListSportCategoryHandle(data, UserOnline) {
  console.log(123);
  const { ws } = UserOnline;
  if (!ws || ws.readyState !== 1) return;
  const message = {
    type: data.type,
    data: {}
  };
  sendWSMessage(ws, message);
}

module.exports = getListSportCategoryHandle;
