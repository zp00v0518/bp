const Cookies = require('cookies');
const { findMethod } = require('../db/methods');
const { sendResponse } = require('../template_modules');
const config = require('../../config');
const setCookieToUser = require('./db/setCookieToUser');
const sessionCreate = require('./db/sessionCreate');

async function authForm({ req, res, postData }) {
  const collectionName = config.collections.users.name;
  const userData = postData.data;
  const findOptions = {
    query: {
      email: userData.email,
      pass: userData.pass
    }
  };
  let user = await findMethod.one(collectionName, findOptions);
  if (!user) {
    const answer = {
      status: 'authErr',
      answer: 'Авторизационные данные не верные'
    };
    sendResponse(res, JSON.stringify(answer));
    return;
  } else {
    const userId = user._id;
    const headers = req.headers;
    headers.platform = userData.platform;
    headers.ip = ip;
    headers.user_id = userId;
    const userCookies = user.cookie
      ? user.cookie
      : await setCookieToUser(userId);
    const sessionCookie = await sessionCreate({
      userId,
      req,
      platform: userData.platform
    });
    const cookies = new Cookies(req, res);
    cookies.set('user', userCookies, { maxAge: config.time.week * 2 });
    cookies.set('session', sessionCookie);
  }
}

module.exports = authForm;
