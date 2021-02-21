const { getRandomString } = require('template_func');
const { updateMethod } = require('../../db/methods');
const config = require('../../../config');

async function setCookieToUser(
  userId,
  cookie = getRandomString(config.cookieSize)
) {
  const collectionName = config.collections.users.name;
  const filter = {
    _id: userId
  };
  const query = {
    $set: { cookie, 'date.addCookie': new Date() }
  };

  await updateMethod.one(collectionName, filter, query);
  return cookie;
}

module.exports = setCookieToUser;
