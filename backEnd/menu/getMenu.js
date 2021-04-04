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
  }
  const collectionName = config.collections.menu.name;
  const response = await findMethod.all(collectionName);
  let menu = response.result;
  const result = [];
  menu.forEach((item, index, arr) => {
    if (!item.url) {
      item.url = '/' + item.title;
    }
    if (item.parent === undefined) {
      result.push(item);
      return;
    }
    const elem = arr.find((i) => i.id === item.parent);
    if (!Array.isArray(elem.children)) elem.children = [];
    item.url = [elem.url, item.url].join('');
    elem.children.push(item);
  });
  data.data = result;
  sendWSMessage(UserOnline.ws, data);
  return menu;
}

module.exports = getMenu;
