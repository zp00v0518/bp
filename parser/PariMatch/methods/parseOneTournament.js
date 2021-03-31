const appConfig = require('../../../config');
const utils = require('../../utils');

const setNamesCommand = require('./setNamesCommand');
const setMatchCoeff = require('./setMatchCoeff');
const getDate = require('./getDate');
const getTotatls = require('./getTotatls');
const parseOnEvent = require('./parseOnEvent');

const params = {
  setNamesCommand,
  setMatchCoeff,
  getDate,
  appConfig,
  parseOnEvent,
  getTotatls
};

async function parseOneTournament(tournamentPage, url, count = 0) {
  let result = [];
  try {
    await tournamentPage.goto(url, {
      waitUntil: 'networkidle2',
      timeout: 30000
    });
    // const btnSelector = '#oddsList img[onclick]';
    const btnSelector = '#diProps button[onclick]';
    const repeatBtnSelector = '.bet-container input[value="Повторить запрос"]';
    const ops = { visible: true };

    await tournamentPage.waitForSelector(
      `${btnSelector}, ${repeatBtnSelector}`,
      ops
    );
    let btn = await tournamentPage.$(btnSelector);
    if (!btn) {
      btn = await tournamentPage.$(repeatBtnSelector);
      await btn.click();
      await tournamentPage.waitForSelector(btnSelector, { visible: true });
      btn = await tournamentPage.$(btnSelector);
    }
    await btn.click();
    await tournamentPage.waitForSelector('[style][id].props.processed', {
      visible: true,
      timeout: 30000
    });
    const pageFrame = tournamentPage.mainFrame();
    await pageFrame.addScriptTag({ content: `${utils.parseWithFunction}` });
    result = await pageFrame.$eval(
      '.dt.twp',
      async (elem, objStr) => {
        try {
          const options = window.parseWithFunction(objStr);
          const firstLine = elem.querySelectorAll(
            '.row1.processed:not(.props)'
          );
          const secondLine = elem.querySelectorAll(
            '.row2.processed:not(.props)'
          );
          const baseRows = Array.from(firstLine).concat(Array.from(secondLine));
          const firstExtraRows = elem.querySelectorAll(
            '[style][id].props.processed.row1'
          );
          const secondExtraRows = elem.querySelectorAll(
            '[style][id].props.processed.row2'
          );
          const extraRows = Array.from(firstExtraRows).concat(
            Array.from(secondExtraRows)
          );

          const arr = Array.from(baseRows).map((row, index) => {
            const extraRow = extraRows[index];
            const item = options.parseOnEvent(row, extraRow, options);
            return item;
          });
          return arr;
        } catch (err) {
          console.log(err);
          return [];
        }
      },
      utils.stringifyWithFunc(params)
    );
  } catch (err) {
    if (err.name !== 'TimeoutError') {
      console.log(err);
      console.log('Проблема при обработке адреса:  ', url);
    }
  }
  await tournamentPage.close();
  return result;
}

module.exports = parseOneTournament;
