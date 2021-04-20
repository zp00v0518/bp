const matching = require('../matching');
const routerList = require('../router/routerList.json');
const { getMenu } = require('../menu');
const handlerGetActualFork = require('../fork/handlerGetActualFork');
const getPreviousForkHandler = require('../fork/getPreviousForkHandler');
const handlerGetBKList = require('../bk/handlerGetBKList');
const {
  getListSportCategoryHandle,
  getUnsetCategoryHandle,
  saveMatchedSportsHandle
} = require('../sportCategory');
const {
  getBaseTournamentsHandler,
  getBkTournamentsHandler,
  saveMatchedTournamentsHandler
} = require('../tournament/wsHandlers');
const { getCommandsByTournamentsHandler } = require('../commands/wsHandlers');

const handlers = {
  get_matching: matching.getMatching,
  set_matching: matching.setMatching,
  [routerList.getMenu.name]: getMenu,
  '/getActualFork': handlerGetActualFork,
  '/getPreviousFork': getPreviousForkHandler,
  '/get_bk_list': handlerGetBKList,
  '/getListSportCategory': getListSportCategoryHandle,
  '/getUnsetCategory': getUnsetCategoryHandle,
  '/saveMatchedSports': saveMatchedSportsHandle,
  '/getBaseTournaments': getBaseTournamentsHandler,
  '/getBkTournaments': getBkTournamentsHandler,
  '/saveMatchedTournaments': saveMatchedTournamentsHandler,
  '/getCommandsByTournaments': getCommandsByTournamentsHandler
};

module.exports = handlers;
