require('../menu/db/createMenuInDB');
const createStaticticCollection = require('../statistic/db/createStaticticCollection');
createStaticticCollection();

const createBkList = require('../../parser/methods/db/createBkList');
createBkList();

const createSportCategories = require('../sportCategory/init');
createSportCategories();

const createTournamentOnDb = require('../tournament/init');
createTournamentOnDb();

const dropCommandsCollection = require('../commands/db/dropCommandsCollection');
dropCommandsCollection();