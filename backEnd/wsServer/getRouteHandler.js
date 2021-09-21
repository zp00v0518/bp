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
  // get_matching: matching.getMatching,
  // set_matching: matching.setMatching,
  [routerList.getMenu.name]: getMenu,
  [routerList.getActualFork.name]: handlerGetActualFork,
  [routerList.getPreviousFork.name]: getPreviousForkHandler,
  [routerList.get_bk_list.name]: handlerGetBKList,
  [routerList.getListSportCategory.name]: sportCategory.getListSportCategoryHandle,
  [routerList.getUnsetCategory.name]: sportCategory.getUnsetCategoryHandle,
  [routerList.saveMatchedSports.name]: sportCategory.saveMatchedSportsHandle,
  [routerList.getAppTournaments.name]: tournaments.getAppTournamentsHandler,
  [routerList.getBkTournaments.name]: tournaments.getBkTournamentsHandler,
  [routerList.saveMatchedTournaments.name]: tournaments.saveMatchedTournamentsHandler,
  [routerList.getBaseCommand.name]: commandsHandlers.getBaseCommandHandler,
  [routerList.saveMatchedCommand.name]: commandsHandlers.saveMatchedCommandHandler,
  [routerList.goParse.name]: parserHandlers.goParseHandler
};

function getRouteHandler(routeName) {
  return handlers[routeName] || false;
}

module.exports = getRouteHandler;
