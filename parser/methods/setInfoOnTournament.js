const schema = require('../../backEnd/db/schema');

function setInfoOnTournament(elemArrs, сategory) {
  const { refs, sportCategory } = schema;
  elemArrs.forEach((elem) => {
    elem[refs.sport_category.name] = сategory._id;
    elem[refs.sport.name] = сategory[refs.sport.name];
    elem[sportCategory.name_sport.name] = сategory[sportCategory.name_sport.name];
  });
}

module.exports = setInfoOnTournament;
