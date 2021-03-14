const puppeteer = require('puppeteer');
const config = require('./config');
const utils = require('../utils');
const {
  setNamesCommand,
  setMatchCoeff,
  getDate,
  getUrlsForParse,
  getTotals
} = require('./methods');
const parseConfig = require('../parseConfig');

const params = {
  setNamesCommand,
  setMatchCoeff,
  getDate,
  getTotals
};

async function parse(urlsArr = []) {
const browser = await puppeteer.launch(parseConfig.browserConfig);
  const result = [];

  for (const url of urlsArr) {
    const bets = await parseOneTournament(browser, url);
    result.push(...bets);
  }
  await browser.close();
  return result;
}

async function parseOneTournament(browser, url) {
  const tournamentPage = await browser.newPage();
  const result = [];
  try {
    await tournamentPage.goto(url, {
      waitUntil: 'networkidle2'
    });
    await tournamentPage.waitForSelector('.category-label-link');
    const hrefs = await utils.getHrefs(tournamentPage, '.member-link');
    const separate = utils.splitArrOnSmallArr(hrefs, 4);
    for (const urls of separate) {
      const promises = urls.map(async (url) => {
        let bets = false;
        const eventPage = await browser.newPage();
        try {
          bets = await parseOneEvent(eventPage, url);
        } catch (err) {
          console.log(err);
          console.log(`Проблема с ${url}`);
          eventPage.close();
        }
        return bets;
      });
      const f = await Promise.all(promises);
      const arr = f.filter((i) => i);
      result.push(...arr);
    }
    tournamentPage.close();
    return result || [];
  } catch (err) {
    console.log(err);
    console.log('Проблема при обработке адреса:  ', url);
    tournamentPage.close();
    return result;
  }
}

async function parseOneEvent(eventPage, url) {
  await eventPage.goto(url, {
    waitUntil: 'networkidle2'
    // timeout: 20000
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
