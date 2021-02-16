const { insertMethod } = require('../db/methods');
const createUser = require('./createUser');
const config = require('../../config');

async function addNewUserToApp(userData) {
  const collectionName = config.collections.users.name;
  let user = createUser(userData);
  let insertResult;
  try {
    insertResult = await insertMethod.one(collectionName, user);
    user = insertResult.ops[0];
  } catch (err) {
    return false;
  }
  return user;
}

module.exports = addNewUserToApp;
