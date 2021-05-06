const { FindInDB, schema } = require('../../../backEnd/db');
const config = require('../../../config');

const find = new FindInDB();

async function getStatistic() {
  await find.connect(config.db.name);
  const collectionName = config.collections.statistic.name;
  const query = {
    class: schema.baseStat.class
  };
  const result = await find.one(collectionName, { query });
  find.close();
  return result;
}

module.exports = getStatistic;
