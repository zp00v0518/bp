const fileReader = require('./fileReader');
const mimeType = require('./mimeType');
const sendResponse = require('./sendResponse');
const reqOn = require('./reqOn');
const patterns = require('./patterns');
// const getCollectionName = require('./getCollectionName.js');
// const checkSchema = require('./checkSchema.js');
// const getParsePathToImg = require('./getParsePathToImg.js');
// const deepClone = require('./deepClone');
// const formatIdToCoords = require('./formatIdToCoords');
// const recursiveLoop = require('./recursiveLoop');

module.exports = {
  fileReader,
  mimeType,
  sendResponse,
  reqOn,
  patterns
  // getCollectionName,
  // checkSchema,
  // getParsePathToImg,
  // deepClone,
  // formatIdToCoords,
  // recursiveLoop
};
