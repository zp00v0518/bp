const schema = require('../db/schema');

function getTemplateTournament(tourName, sportName) {
  const type = schema.tournament_type;
  return {
    class: type.class,
    [type.type_name.name]: tourName,
    [type.name_sport.name]: sportName
  };
}

module.exports = getTemplateTournament;
