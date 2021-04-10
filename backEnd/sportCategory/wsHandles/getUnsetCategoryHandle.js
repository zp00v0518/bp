const { getUnsetCategory } = require('../db');

async function getUnsetCategoryHandle(data, UserOnline) {
  const { ws } = UserOnline;
  if (!ws || ws.readyState !== 1) return;
  const result = await getUnsetCategory();
  const message = {
    type: data.type,
    data: result
  };
  return message;
}

module.exports = getUnsetCategoryHandle;
