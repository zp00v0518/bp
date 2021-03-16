const puppeteer = require('puppeteer');
const config = require('./config');
const appConfig = require('../../config');
const utils = require('../utils');
const {
  setNamesCommand,
  setMatchCoeff,
  getDate,
  getUrlsForParse
} = require('./methods');
const parseConfig = require('../parseConfig');

const params = {
  setNamesCommand,
  setMatchCoeff,
  getDate,
  appConfig,
  parseOnEvent,
  getTotatls
};

async function parse(urlsArr) {
  const browser = await puppeteer.launch(parseConfig.browserConfig);
  const separate = utils.splitArrOnSmallArr(urlsArr, parseConfig.splitUrls);
  const result = [];
  try {
    for (const urls of separate) {
      const promises = urls.map(async (url) => {
        let bets = false;
        const tournamentPage = await browser.newPage();
        try {
          bets = await parseOneTournament(tournamentPage, url);
        } catch (err) {
          console.log(`Проблема с обработкой: ${url}`);
        }
        return bets;
      });
      const f = await Promise.all(promises);
      const arr = f.filter((i) => i);
      arr.forEach((bets) => {
        result.push(...bets);
      });
    }
    await browser.close();
    return result;
  } catch (err) {
    console.log(err);
    return result;
  }
}

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

function parseOnEvent(row, extraRow, options) {
  const item = options.setNamesCommand(row);
  item.url = window.location.href;
  item.coeff = {};
  options.getDate(row, item);
  options.setMatchCoeff(row, item, options.appConfig);
  const totals = options.getTotatls(extraRow);
  if (totals) {
    item.coeff.totals = totals;
  }
  return item;
}

function getTotatls(elem) {
  const totals = {};
  const tabel = elem.querySelectorAll('tr .ps .ps')[1];
  const row = tabel.rows[1];
  const str = row.innerText;
  const allTotals = str.match(/\([\d.]{1,}\)[^\(]{0,}/gi);
  allTotals.forEach((txt) => {
    const nums = txt.match(/[\d\.]{1,}/gi);
    const key = nums.splice(0, 1)[0];
    if (+key % 0.5 === 0) {
      totals[key] = [nums[1], nums[0]];
    }
  });
  return totals;
}

function setBkId(arr) {
  arr.forEach((item) => {
    item.bk_id = config.id;
  });
}

function modifDataToDB(data) {
  data.forEach((item) => {
    item.coeffList = [];
    const template = {
      bk_id: item.bk_id,
      coeff: item.coeff,
      url: item.url
    };
    item.coeffList.push(template);
    delete item.url;
    delete item.bk_id;
    delete item.coeff;
  });
  return data;
}

module.exports = { parse, setBkId, modifDataToDB, getUrlsForParse };
