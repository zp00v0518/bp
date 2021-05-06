const appConfig = require('../../../config');

const matchKey = appConfig.matchKey;

function setMatchCoeff(eventData, item) {
  let baseItog = null;
  let doubleItog = null;
  eventData.forEach((i) => {
    if (i.market_template_id === 1 && i.result_type_id === 1) baseItog = i; // Основные исходы
    if (i.market_template_id === 40 && i.result_type_id === 1) doubleItog = i; // Двойные исходы
  });
  try {
    item.coeff = {};
    if (baseItog) {
      item.coeff[matchKey.win1] = baseItog.outcomes[0].outcome_coef;
      item.coeff[matchKey.draw] = baseItog.outcomes[1].outcome_coef;
      item.coeff[matchKey.win2] = baseItog.outcomes[2].outcome_coef;
    }
    if (doubleItog) {
      item.coeff[matchKey.win1_draw] = doubleItog.outcomes[0].outcome_coef;
      item.coeff[matchKey.win1_win2] = doubleItog.outcomes[1].outcome_coef;
      item.coeff[matchKey.win2_draw] = doubleItog.outcomes[2].outcome_coe;
    }
    // item.coeff = {
    //   [matchKey.win1]: baseItog.outcomes[0].outcome_coef,
    //   [matchKey.draw]: baseItog.outcomes[1].outcome_coef,
    //   [matchKey.win2]: baseItog.outcomes[2].outcome_coef,
    //   [matchKey.win1_draw]: doubleItog.outcomes[0].outcome_coef,
    //   [matchKey.win1_win2]: doubleItog.outcomes[1].outcome_coef,
    //   [matchKey.win2_draw]: doubleItog.outcomes[2].outcome_coef
    // };
    return item;
  } catch (err) {
    console.log('Favorite - setMatchCoeff', eventData);
    return {};
  }
}
module.exports = setMatchCoeff;
