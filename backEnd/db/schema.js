const classList = {
  command: 'command',
  base_command: 'base_command',
  unset: 'unset',
  event: 'event',
  baseStat: 'baseStat',
  sport: 'sport',
  sport_category: 'sport_category',
  tournament: 'tournament',
  tournament_type: 'tournament_type'
};
const refs = {
  sport: { type: String, name: 'ref_sport' },
  sport_category: { type: String, name: 'sport_category' },
  tournament: { type: String, name: 'tournament_type' }
};
const baseCase = {
  name_sport: { type: String, name: 'name_sport' }
};

const baseStat = {
  class: 'baseStat',
  parseCount: { type: Number, name: 'parseCount' },
  lastParse: { type: Number, name: 'lastParse' }
};

const sportCategory = {
  class: classList.sport_category,
  name: { type: String, name: 'name' },
  bkId: { type: String, name: 'bkId' },
  url: { type: String, name: 'url' },
  category: { type: String, name: 'category' },
  ref: refs.sport,
  name_sport: baseCase.name_sport
};
const tournament_type = {
  class: classList.tournament_type,
  name_sport: baseCase.name_sport,
  type_name: { type: String, name: 'type_name' },
  ref_sport: refs.sport
};

const base_command = {
  class: classList.base_command,
  name: { type: String, name: 'name' },
  [refs.tournament.name]: refs.tournament
};
const command = {
  class: classList.command,
  bkId: { type: Number, name: 'bkId' },
  name: { type: String, name: 'name' },
  url: { type: String, name: 'url' },
  ref_tournament: { type: String, name: 'ref_tournament' },
  ref_base_command: { type: String, name: 'ref_base_command' }
};

const schema = {
  class: classList,
  baseStat,
  sportCategory,
  refs,
  tournament_type,
  base_command,
  command
};

module.exports = schema;
