const { getAllSports } = require('../db');

async function getListSportCategoryHandle(data) {
  const result = await getAllSports();
  const message = {
    type: data.type,
    data: result
  };
  return message;
}

module.exports = getListSportCategoryHandle;
