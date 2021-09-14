const matching = require('../matching');
const routerList = require('../router/routerList.json');
const { getMenu } = require('../menu');
const handlerGetActualFork = require('../fork/handlerGetActualFork');
const getPreviousForkHandler = require('../fork/getPreviousForkHandler');
const handlerGetBKList = require('../bk/handlerGetBKList');
const sportCategory = require('../sportCategory');
const tournaments = require('../tournament/wsHandlers');
const commandsHandlers = require('../commands/wsHandlers');
const parserHandlers = require('../parse/wsHandlers');

const handlers = {
  get_matching: matching.getMatching,
  set_matching: matching.setMatching,
  [routerList.getMenu.name]: getMenu,
  '/getActualFork': handlerGetActualFork,
  '/getPreviousFork': getPreviousForkHandler,
  '/get_bk_list': handlerGetBKList,
  '/getListSportCategory': sportCategory.getListSportCategoryHandle,
  '/getUnsetCategory': sportCategory.getUnsetCategoryHandle,
  '/saveMatchedSports': sportCategory.saveMatchedSportsHandle,
  '/getAppTournaments': tournaments.getAppTournamentsHandler,
  '/getBkTournaments': tournaments.getBkTournamentsHandler,
  '/saveMatchedTournaments': tournaments.saveMatchedTournamentsHandler,
  '/getBaseCommand': commandsHandlers.getBaseCommandHandler,
  '/saveMatchedCommand': commandsHandlers.saveMatchedCommandHandler,
  '/goParse': parserHandlers.goParseHandler
};

module.exports = handlers;
