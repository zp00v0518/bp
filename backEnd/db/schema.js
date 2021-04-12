const classList = {
  command: 'command',
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
  sport_category: { type: String, name: 'sport_category' }
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
  name_sport: { type: String, name: 'name_sport' }
};

const schema = {
  class: classList,
  baseStat,
  sportCategory,
  refs
};

module.exports = schema;
