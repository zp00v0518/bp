const sport = require('../../sportCategory/init/sport_category');
const list = require('../list');
const tournaments = Object.assign({}, sport);
Object.keys(tournaments).forEach((key) => {
  delete tournaments[key].name;
  tournaments[key].list = [];
});

tournaments[sport.soccer.key].list = list.soccer;
tournaments[sport.basketball.key].list = list.basketball;
console.log(tournaments);

module.exports = tournaments;
