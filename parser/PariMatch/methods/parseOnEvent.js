const appConfig = require('../../../config');
const matchKey = appConfig.matchKey;
const utils = require('../../utils');
const setNamesCommand = require('./setNamesCommand');
const setDateEvent = require('./setDateEvent');
const setMatchCoeff = require('./setMatchCoeff');
const getTotals = require('./getTotals');

const params = {
  setNamesCommand,
  setDateEvent,
  matchKey,
  setMatchCoeff,
  getTotals
};
async function parseOnEvent(eventPage, url) {
  await eventPage.goto(url, {
    waitUntil: 'networkidle2'
  });
  const btnSelector = '[data-id="event-markets-tab-all"]';
  await eventPage.waitForSelector(btnSelector);
  let btn = await eventPage.$(btnSelector);
  await btn.click();
  await eventPage.addScriptTag({ content: `${utils.parseWithFunction}` });
  const item = await eventPage.$eval(
    '#root',
    async (document, objStr) => {
      console.clear();
      try {
        const options = window.parseWithFunction(objStr);
        const item = options.setNamesCommand(document);
        options.setDateEvent(document, item);
        item.url = window.location.href;
        item.coeff = {};
        options.setMatchCoeff(document, item, options);
        const totals = options.getTotals(document);
        if (totals) {
          item.coeff.totals = totals;
        }
        return item;
      } catch (err) {
        console.log(err);
        return false;
      }
    },
    utils.stringifyWithFunc(params)
  );
  return item
}

module.exports = parseOnEvent;
