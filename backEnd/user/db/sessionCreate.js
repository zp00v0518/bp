const { getRandomString } = require('template_func');
const { insertMethod } = require('../../db/methods');
const config = require('../../../config');

async function sessionCreate(
  { userId, req, platform = 0 },
  collectionName = config.collections.sessions.name
) {
  const headers = req.headers;
  const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
  const sessionCookie = getRandomString(config.cookieSize);
  const session = {
    date: {
      add: new Date(),
      last: new Date()
    },
    ip,
    userId,
    platform,
    agent: headers['user-agent'] || 0,
    referer: headers.referer || 0,
    accept: headers.accept || 0,
    cookie: sessionCookie
  };
  await insertMethod.one(collectionName, session);
  return sessionCookie;
}

module.exports = sessionCreate;
