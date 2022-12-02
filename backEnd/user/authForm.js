const { findMethod } = require('../db/methods');
const { sendResponse } = require('../template_modules');
const config = require('../../config');
const addCookieToUserAndDb = require('./addCookieToUserAndDb');
const { GETlist } = require('../router/GETrouting');
const getHashPass = require('./getHashPass');

async function authForm({ req, res, postData }) {
  const collectionName = config.collections.users.name;
  const userData = postData.data;
  const hash = await getHashPass(userData);
  const findOptions = {
    query: {
      email: userData.email,
      // pass: hash
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
    const cookiesResult = await addCookieToUserAndDb(req, res, user, postData);
    const answer = {};
    if (cookiesResult) {
      answer.status = 'authOk';
      answer.nextStep = GETlist.app;
    } else {
      answer.status = 'authErr';
      answer.answer = `Something went wrong. We cannot give access to the application`;
    }
    sendResponse(res, JSON.stringify(answer));
  }
}

module.exports = authForm;
