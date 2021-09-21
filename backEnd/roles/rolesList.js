const routerList = require('../router/routerList.json');

const rolesList = {
  admin: { name: 'admin' },
  user: { name: 'user', accessList: [routerList.getActualFork.name, routerList.getMenu.name] }
};



module.exports = rolesList;
