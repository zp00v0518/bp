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

async function parseOneTournament(tournamentPage, url) {
  // const tournamentPage = await browser.newPage();
  try {
    await tournamentPage.goto(url, {
      waitUntil: 'networkidle2',
      timeout: 30000
    });
    await tournamentPage.waitForSelector('#oddsList img[onclick]', {
      visible: true
    });
    // await tournamentPage.waitForSelector('#oddsList');
    const btn = await tournamentPage.$('#oddsList img[onclick]');
    await btn.click();
    await tournamentPage.waitForSelector('[style][id].props.processed', {
      visible: true,
      timeout: 30000
    });
    const pageFrame = tournamentPage.mainFrame();
    await pageFrame.addScriptTag({ content: `${utils.parseWithFunction}` });

    const result = await pageFrame.$eval(
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
    await tournamentPage.close();
    return result || [];
  } catch (err) {
    console.log(err);
    console.log('Проблема при обработке адреса:  ', url);
    await tournamentPage.close();
    return [];
  }
}

module.exports = parseOneTournament;
