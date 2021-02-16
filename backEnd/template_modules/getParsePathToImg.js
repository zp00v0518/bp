const path = require('path');
const pathParse = require('path-parse');
const frontFolder = require('../config').frontEnd.folder + '/';

function getParsePathToImg(pathToImg = '') {
  const newStr = pathToImg.replace(frontFolder, '');
  if (path.parse) {
    return path.parse(newStr);
  }
  return pathParse(newStr);
}

module.exports = getParsePathToImg;
