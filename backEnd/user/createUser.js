const getHashPass = require('./getHashPass')
const rolesList = require('../roles/rolesList');

async function createUser(data) {
  const user = {};
  // const pass = await getHashPass(data);
  // user.pass = pass;
  user.pass = data.pass;
  user.email = data.email;
  user.date = {
    registr: new Date(),
    addCookie: new Date()
  };
  user.cookie = '';
  user.session = [];
  user.role = data.role || rolesList.user.name;
  return user;
}

module.exports = createUser;
