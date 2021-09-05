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
      { [sportCategory.ref_sport_app]: { $exists: true } },
      { [sportCategory.ref_sport_app]: { $ne: '' } }
    ]
  };
  const result = await find.all(collection, query);
  find.close();
  return result.result;
}

module.exports = getUrlsForParseTournament;
