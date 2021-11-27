const insertMethod = require('../../db/methods/insertMethod');
const createUser = require('../createUser');
const config = require('../../../config');

async function addNewUserToApp(userData) {
  const collectionName = config.collections.users.name;
  let user = await createUser(userData);
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
