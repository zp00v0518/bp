const prefix = {
  app: '_app',
  bk: '_bk',
  ref: '_ref'
};
Object.freeze(prefix);

const classList = {
  command: 'command',
  base_command: 'base_command',
  unset: 'unset',
  event: 'event',
  baseStat: 'baseStat',
  sport_app: 'sport' + prefix.app,
  sport_bk: 'sport' + prefix.bk,
  // tournament: 'tournament' + prefix.bk, // TODO: remove
  tournament_bk: 'tournament' + prefix.bk,
  // tournament_type: 'tournament' + prefix.app,// TODO: remove
  tournament_app: 'tournament' + prefix.app
};

const refs = {
  // sport: { type: String, name: 'ref_sport' },
  sport_app: classList.sport_app + prefix.ref,
  sport_bk: classList.sport_bk + prefix.ref,
  // sport_category: { type: String, name: 'sport_category' }, // TODO: remove
  // tournament: { type: String, name: 'tournament_app' }, // TODO: remove
  tournament_app: classList.tournament_app + prefix.ref,
  tournament_bk: classList.tournament_bk + prefix.ref
};

const baseCase = {
  sport_name: { type: String, name: 'sport_name' }
};

const baseStat = {
  class: 'baseStat',
  parseCount: { type: Number, name: 'parseCount' },
  lastParse: { type: Number, name: 'lastParse' }
};

const sportCategory = {
  class: classList.sport_bk,
  name: { type: String, name: 'name' },
  bkId: { type: String, name: 'bkId' },
  url: { type: String, name: 'url' },
  category: { type: String, name: 'category' },
  ref_sport_app: classList.sport_app + prefix.ref,
  name_sport: baseCase.sport_name
};

const tournament_type = {
  class: classList.tournament_bk,
  sport_name: baseCase.sport_name,
  // name_sport: baseCase.sport_name, // TODO: remove
  // type_name: { type: String, name: 'type_name' }, // TODO: remove
  name: { type: String, name: 'name' },
  // ref_sport: refs.sport_app, // TODO: remove
  ref_sport_app: refs.sport_app
};

const base_command = {
  class: classList.base_command,
  name: { type: String, name: 'name' },
  ref_tournament_app: refs.tournament_app
  // [refs.tournament.name]: refs.tournament
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
  command,
  prefix
};

module.exports = schema;
