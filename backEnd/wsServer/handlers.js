const matching = require('../matching');

const handlers = {
  get_matching: matching.getMatching,
  set_matching: matching.setMatching,
};

module.exports = handlers;
