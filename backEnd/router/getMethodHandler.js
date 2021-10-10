const path = require('path');
const url = require('url');
const config = require('../../config');
const { fileReader, sendResponse, mimeType } = require('../template_modules');
const { GETlist } = require('./GETrouting');
const MODE = process.env.APP_MODE;

function getMethodHandler(req, res, startPath) {
  const urlParse = url.parse(req.url, true);
  const pathName = urlParse.path;
  // блок проверяющий статические файлы
  const regPath = /.*js.*|.*img.*|.*style.*|.*ico.*|.*css.*/gi;
  const check = regPath.test(pathName);
  const pathToFile = getPathToFile(pathName, startPath);

  if (!pathToFile.includes(config.path.baseFolder)) {
    sendResponse(res, JSON.stringify({ n: '404', f: pathToFile }));
    return;
  }
  const ext = path.parse(pathToFile).ext;

  fileReader(pathToFile, (err, data) => {
    if (err) {
      console.log(err);
      return;
    }
    sendResponse(res, data, mimeType[ext] || 'plain/text');
  });
}

function getPathToFile(value, startPath) {
  let file = value;
  const parseValue = path.parse(value)
  let folder = config.path.baseFolder;
  if (value === GETlist.login) {
    folder += config.path.login.folder;
    file = config.path.login.html;
  }
  if (!parseValue.ext){
    file = config.path.app[MODE].html;
  }
  // if (value === GETlist.app) {
  //   file = config.path.app[MODE].html;
  // }
  folder += config.path.app[MODE].folder;
  const pathJoin = path.join(startPath, folder, file);
  return pathJoin;
}
module.exports = getMethodHandler;
