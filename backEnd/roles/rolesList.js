const routerList = require('../router/routerList.json');

const rolesList = {
  admin: { name: 'admin' },
  user: {
    name: 'user',
    accessList: [
      routerList.getActualFork.name,
      routerList.getPreviousFork.name,
      routerList.getMenu.name,
      routerList.get_bk_list.name
    ]
  }
};

module.exports = rolesList;
