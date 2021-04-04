const classList = {
  command: 'command',
  unset: 'unset',
  event: 'event',
  baseStat: 'baseStat',
  sport: 'sport',
  sport_category: 'sport_category'
};
const baseStat = {
  class: 'baseStat',
  parseCount: { type: Number, name: 'parseCount' },
  lastParse: { type: Number, name: 'lastParse' }
};

const sportCategory = {
  class: classList.sport_category,
  name: { type: String, name: 'name' },
  bkId: {type: String, name: 'bkId'},
  url: { type: String, name: 'url' },
  category: { type: String, name: 'category' },
};

const schema = {
  class: classList,
  baseStat,
  sportCategory
};

module.exports = schema;
