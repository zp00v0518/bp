const utils = require('../../utils');
const setNamesCommand = require('./setNamesCommand');
const setMatchCoeff = require('./setMatchCoeff');
const getDate = require('./getDate');
const getTotals = require('./getTotals');

const params = {
  setNamesCommand,
  setMatchCoeff,
  getDate,
  getTotals
};

async function parseOneEvent(eventPage, url) {
  await eventPage.goto(url, {
    waitUntil: 'domcontentloaded'
  });
  await eventPage.waitForSelector('.left-indentation');
  // await eventPage.waitForSelector('.category-label-link');
  await eventPage.addScriptTag({ content: `${utils.parseWithFunction}` });
  const pageFrame = eventPage.mainFrame();
  const item = await pageFrame.$eval(
    '.category-content',
    async (elem, objStr) => {
      try {
        const options = window.parseWithFunction(objStr);
        const row = elem.querySelector('.coupon-row');
        const item = options.setNamesCommand(row);
        item.url = window.location.href;
        item.coeff = {};
        options.getDate(row, item);
        const cells = row.querySelectorAll('[data-selection-key]');
        Array.from(cells).forEach((el) => {
          options.setMatchCoeff(el, item);
        });
        const totals = options.getTotals(row);
        if (totals) {
          item.coeff.totals = totals;
        }
        return item;
      } catch (err) {
        console.log('Проблема при обработке адреса:  ', url);
        return false;
      }
    },
    utils.stringifyWithFunc(params)
  );
  await eventPage.close();
  return item;
}

module.exports = parseOneEvent;
