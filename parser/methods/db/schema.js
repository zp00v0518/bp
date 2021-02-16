const config = require('../../../config');

// TODO: дописать схему. Основа взята из lords. Если что не понятно - искать там

const schema = {
  command_1: { type: 'string' },
  command_2: { type: 'string' },
  url: { type: 'string' },
  date: { type: 'date' },
  // targetId: {
  //   type: 'number',
  //   min: 0,
  //   max: Math.pow(gameVariables.numSectionRegionMap, 2) - 1
  // },
  coeff: {
    type: 'object',
    fields: {}
  }
  // army: {
  //   type: 'array',
  //   all: {
  //     type: 'object',
  //     fields: {
  //       race: { type: 'string', regExp: /^.{3,25}\b/g },
  //       name: { type: 'string', regExp: /^.{3,25}\b/g },
  //       count: { type: 'number', min: 1 }
  //     }
  //   }
  // }
};
