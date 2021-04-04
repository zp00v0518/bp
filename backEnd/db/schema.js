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
  alias: { type: Array, name: 'alias', item: { type: String } },
  links: {
    type: Array,
    name: 'links',
    item: {
      type: Object,
      fields: {
        url: { type: String, name: 'url' },
        name: { type: String, name: 'name' },
        bkId: { type: Number, name: 'bkId' }
      }
    }
  }
};
// const results = {
//   command_1: { type: String, name: 'command_1' },
//   command_2: { type: String, name: 'command_2' },
//   created_at: { type: Number, name: 'created_at' },
//   eventDate: { type: Number, name: 'eventDate' },
//   fork: { type: Array, name: 'fork' }
// };

const schema = {
  class: classList,
  baseStat,
  sportCategory
};

module.exports = schema;
