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
// const results = {
//   command_1: { type: String, name: 'command_1' },
//   command_2: { type: String, name: 'command_2' },
//   created_at: { type: Number, name: 'created_at' },
//   eventDate: { type: Number, name: 'eventDate' },
//   fork: { type: Array, name: 'fork' }
// };

const schema = {
  class: classList,
  baseStat
};

module.exports = schema;
