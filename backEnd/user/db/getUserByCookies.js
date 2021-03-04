const { findMethod } = require('../../db/methods');
const config = require('../../../config');

async function getUserByCookies(cookie) {
  const colectionName = config.collections.users.name;
  const query = {
    cookie
  };
  let result = null;
  try {
    result = await findMethod.one(colectionName, { query });
  } catch (err) {
    console.log(err);
  }
  return result;
}

module.exports = getUserByCookies;
