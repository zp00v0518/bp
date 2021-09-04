const schema = require('../../backEnd/db/schema');

// TODO: refactoring BD  - установить правильные ключи refs
function setInfoOnTournament(elemArrs, сategory) {
  const { refs, sportCategory } = schema;
  const ref_sport_app_key = refs.sport_app;
  const ref_sport_bp_key = refs.sport_bp;
  elemArrs.forEach((elem) => {
    elem[ref_sport_bp_key] = сategory._id;
    elem[ref_sport_app_key] = сategory[ref_sport_app_key];
    elem[sportCategory.name_sport.name] = сategory[sportCategory.name_sport.name];
    elem[sportCategory.bkId.name] = сategory[sportCategory.bkId.name];
  });
}

module.exports = setInfoOnTournament;
