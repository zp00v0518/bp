const Cookies = require('cookies');
const setCookieToUser = require('./db/setCookieToUser');
const sessionCreate = require('./db/sessionCreate');
const config = require('../../config');

async function addCookieToUserAndDb(req, res, userFromDB, options) {
  try {
    const userId = userFromDB._id;
    const userCookies = await setCookieToUser(userId);
    const sessionCookie = await sessionCreate({
      userId,
      req,
      platform: options.platform
    });
    const cookies = new Cookies(req, res);
    cookies.set('user', userCookies, { maxAge: config.time.week * 2 });
    cookies.set('session', sessionCookie);
    return true;
  } catch (err) {
    console.log(err);
    return false;
  }
}

module.exports = addCookieToUserAndDb;
