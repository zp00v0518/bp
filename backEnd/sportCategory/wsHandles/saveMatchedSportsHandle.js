const { getSportsId, setSportRefsOnCategory } = require('../db');

async function saveMatchedSportsHandle(payload) {
  const { data, type } = payload;
  if (Object.keys(data).length === 0) return;
  const idsSport = await getSportsId(Object.keys(data));
  const bulkResult = await setSportRefsOnCategory(data, idsSport);
  const message = {
    type,
    bulkResult
  };
  return message;
}

module.exports = saveMatchedSportsHandle;
