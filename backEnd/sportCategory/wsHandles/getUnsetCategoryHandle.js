const { getUnsetCategory } = require('../db');

async function getUnsetCategoryHandle(data) {
  const result = await getUnsetCategory();
  const message = {
    type: data.type,
    data: result
  };
  return message;
}

module.exports = getUnsetCategoryHandle;
