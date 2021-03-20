const classList = {
  command: 'command',
  unset: 'unset',
  event: 'event',
  baseStat: 'baseStat'
};
const baseStat = {
  class: 'baseStat',
  parseCount: { type: Number, name: 'parseCount' },
  lastParse: { type: Number, name: 'lastParse' }
};

const schema = {
  class: classList,
  baseStat
};

module.exports = schema;
