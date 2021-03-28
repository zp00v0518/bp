require('../menu/db/createMenuInDB');
const createStaticticCollection = require('../statistic/db/createStaticticCollection');
createStaticticCollection();

const createBkList = require('../../parser/methods/db/createBkList');
createBkList();
