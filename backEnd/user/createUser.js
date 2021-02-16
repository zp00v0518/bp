function createUser(data) {
  const user = {};
  user.pass = data.pass;
  user.email = data.email;
  user.date = {
    registr: new Date(),
    addCookie: new Date()
  };
  user.cookie = '';
  user.session = [];
  return user;
}

module.exports = createUser;
