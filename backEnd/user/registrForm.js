const { findMethod } = require('../db/methods');
const { sendResponse } = require('../template_modules');
const config = require('../../config');
const addNewUserToApp = require('./db/addNewUserToApp');
const addCookieToUserAndDb = require('./addCookieToUserAndDb');
const { GETlist } = require('../router/GETrouting');

async function registrForm({ req, res, postData }) {
  const collectionName = config.collections.users.name;
  const findOptions = {
    query: {
      email: postData.data.email
    }
  };
  let user = await findMethod.one(collectionName, findOptions);
  if (!user) {
    user = await addNewUserToApp(postData.data);
    if (!user) {
      return;
    }
    const cookiesResult = await addCookieToUserAndDb(req, res, user, postData);
    const answer = {};
    if (cookiesResult) {
      answer.status = 'registrOk';
      answer.nextStep = GETlist.app;
    } else {
      answer.status = 'registrErr';
      answer.answer = `Can't auth. Try from login tab`;
    }

    // TODO: остановился здесь. Дальше надо написать правильное перенаправление и логику авторизации
    // answer.nextStep = config.listFile.html.cabinet + '.html';
    sendResponse(res, JSON.stringify(answer));
    return;
  } else {
    const answer = {};
    answer.status = 'registrErr';
    answer.answer = `Пользователь с таким email'ом существует`;
    sendResponse(res, JSON.stringify(answer));
    return;
  }
}

module.exports = registrForm;
