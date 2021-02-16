const url = require('url');
const template = require('template_func');
const POSTrouting = require('./POSTrouting');

const { reqOn, sendResponse } = require('../template_modules');

async function postMethodHandler(req, res) {
  const urlParse = url.parse(req.url);
  const pathName = urlParse.path;
  let postData = await reqOn(req);
  postData = template.tryJsonParse(postData);
  if (!postData) {
    const requestData = {
      status: 'err',
      message: 'Информацию полученную от клиента распарсить не удалось',
      data: postData
    };
    sendResponse(res, JSON.stringify(requestData));
    return;
  }
  const handler = POSTrouting[pathName];
  if (!handler) {
    sendResponse(res, JSON.stringify({ n: '404' }));
    return;
  }
  handler({ req, res, postData });
}

module.exports = postMethodHandler;
