const { findMethod } = require('../db/methods');
const { sendResponse } = require('../template_modules');
const config = require('../../config');
const addNewUserToApp = require('./addNewUserToApp');
const setCookieToUser = require('./setCookieToUser');
const sessionCreate = require('./sessionCreate');
const Cookies = require('cookies');
const {GETlist} = require('../router/GETrouting');


async function registrForm({ req, res, postData }) {
  const collectionName = config.collections.users.name;
  const findOptions = {
    query: {
      email: postData.email
    }
  };
  let user = await findMethod.one(collectionName, findOptions);
  if (!user) {
    user = await addNewUserToApp(postData.data);
    if (!user) {
      return;
    }
    try {
      const userId = user._id;
      const userCookies = await setCookieToUser(userId);
      const sessionCookie = await sessionCreate({
        userId,
        req,
        platform: postData.data.platform
      });
      const cookies = new Cookies(req, res);
      cookies.set('user', userCookies, { maxAge: config.time.week * 2 });
      cookies.set('session', sessionCookie);
      const answer = {};
      answer.status = 'registrOk';
      answer.nextStep = GETlist.app;
      // TODO: остановился здесь. Дальше надо написать правильное перенаправление и логику авторизации
      // answer.nextStep = config.listFile.html.cabinet + '.html';
      sendResponse(res, JSON.stringify(answer));
      return;
    } catch (err) {
      console.log(err);
    }
  }
  sendResponse(res, JSON.stringify(postData));
}

module.exports = registrForm;
