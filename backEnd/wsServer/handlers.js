const matching = require('../matching');
const routerList = require('../router/routerList.json');
const { getMenu } = require('../menu');
const handlerGetFork = require('../fork/handlerGetFork');
const handlerGetBKList = require('../bk/handlerGetBKList');

const handlers = {
  get_matching: matching.getMatching,
  set_matching: matching.setMatching,
  [routerList.getMenu.name]: getMenu,
  '/getFork': handlerGetFork,
  '/get_bk_list': handlerGetBKList
};

module.exports = handlers;
