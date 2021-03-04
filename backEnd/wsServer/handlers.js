const matching = require('../matching');
const routerList = require('../router/routerList.json');
const { getMenu } = require('../menu');

const handlers = {
  get_matching: matching.getMatching,
  set_matching: matching.setMatching,
  [routerList.getMenu.name]: getMenu
};

module.exports = handlers;
