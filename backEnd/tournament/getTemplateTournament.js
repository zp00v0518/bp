const schema = require('../db/schema');

function getTemplateTournament(tourName, sportName) {
  const type = schema.tournament_type;
  return {
    class: schema.class.tournament_app,
    // class: type.class,
    [type.name.name]: tourName,
    [type.sport_name.name]: sportName
  };
}

module.exports = getTemplateTournament;
