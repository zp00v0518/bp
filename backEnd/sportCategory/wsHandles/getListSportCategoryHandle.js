const { getAllSports } = require('../db');

async function getListSportCategoryHandle(data, UserOnline) {
  const { ws } = UserOnline;
  if (!ws || ws.readyState !== 1) return;
  const result = await getAllSports();
  const message = {
    type: data.type,
    data: result
  };
  return message;
}

module.exports = getListSportCategoryHandle;
