const sports_app = require('../../sportCategory/init/sports_app');
const list = require('../list');
const tournaments = JSON.parse(JSON.stringify(sports_app));
Object.keys(tournaments).forEach((key) => {
  delete tournaments[key].name;
  tournaments[key].list = [];
});

tournaments[sports_app.soccer.key].list = list.soccer;
// tournaments[sport.basketball.key].list = list.basketball;

module.exports = tournaments;
