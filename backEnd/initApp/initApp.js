const createStaticticCollection = require('../statistic/db/createStaticticCollection');
const createBkList = require('../../parser/methods/db/createBkList');
const createSportCategories = require('../sportCategory/init');
const createTournamentOnDb = require('../tournament/init');
const dropCommandsCollection = require('../commands/db/dropCommandsCollection');
const createMenuInDB = require('../menu/db/createMenuInDB');

async function startInit() {
  await createStaticticCollection();
  await createBkList();
  await createSportCategories();
  await createTournamentOnDb();
  await dropCommandsCollection();
  await createMenuInDB();
}

startInit();