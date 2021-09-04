const schema = require('../../../backEnd/db/schema');
const { FindInDB } = require('../../../backEnd/db');
const appConfig = require('../../../config');

async function getUrlsForParseTournament(bkId) {
  const find = new FindInDB();
  await find.connect(appConfig.db.name);
  const collection = appConfig.collections.sports.name;
  const { sportCategory } = schema;
  const query = {
    class: sportCategory.class,
    [sportCategory.bkId.name]: bkId,
    $and: [
      { [sportCategory.sport_app_ref]: { $exists: true } },
      { [sportCategory.sport_app_ref]: { $ne: '' } }
    ]
  };
  const result = await find.all(collection, query);
  find.close();
  return result.result;
}

module.exports = getUrlsForParseTournament;
