const { rolesList } = require('../roles');
const { findMethod } = require('../db/methods');
const config = require('../../config');
const { sendWSMessage } = require('../wsServer');

async function getMenu(data, UserOnline) {
  const user = UserOnline.user;
	data.data = [];
  if (!user || user.role !== rolesList.admin.name) {
		sendWSMessage(UserOnline.ws, data);
		return;
	};
  const collectionName = config.collections.menu.name;
  const result = await findMethod.all(collectionName);
  const menu = result.result;
  menu.forEach((item) => {
    if (!item.url) {
      item.url = '/' + item.title;
    }
  });
  data.data = menu;
  sendWSMessage(UserOnline.ws, data);
  return result.result;
}

module.exports = getMenu;
