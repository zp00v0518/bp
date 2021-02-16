const puppeteer = require('puppeteer');
const config = require('./config');
const utils = require('../utils');
const {
  setMatchCoeff,
  getDate,
  getUrlsForParse,
  getTotals,
  setNamesCommand
} = require('./methods');

async function parse(urlsArr = []) {
  const browser = await puppeteer.launch({
    // devtools: true
    // args: ['--log-level="0"']
    // headless: true
  });
  const result = [];
  for (const url of urlsArr) {
    const bets = await parseOneTournament(browser, url);
    result.push(...bets);
    // return bets;
  }
  await browser.close();
  return result;
}

async function parseOneTournament(browser, url) {
  const tournamentPage = await browser.newPage();
  const result = [];
  await tournamentPage.goto(url, {
    waitUntil: 'networkidle2'
  });
  try {
    const selector = '.Accordion_body__2kc5I.Accordion_opened__QoZr8';
    await tournamentPage.waitForSelector(selector);
    const hrefs = await utils.getHrefs(tournamentPage, `${selector} > a`);
    // *********************************
    if (hrefs.length > 30) hrefs.length = 30;
    // **********************************
    const urlsSeparate = utils.splitArrOnSmallArr(hrefs, 3);
    for (const urls of urlsSeparate) {
      const promises = urls.map(async (url) => {
        const newPage = await browser.newPage();
        try {
          const bets = await parseOneEvent(newPage, url);
          newPage.close();
          return bets || false;
        } catch (err) {
          console.log(err);
          newPage.close();
          return false;
        }
      });
      const f = await Promise.all(promises);
      result.push(...f.filter((i) => i));
    }
    return result;
  } catch (err) {
    console.log(`Проблема с урлом: ${url}`);
    return result;
  }
}

async function parseOneEvent(eventPage, url) {
  try {
    const item = {};
    eventPage.on('response', async (response) => {
      try {
        const req = response.request();
        if (
          req._method === 'POST' &&
          req._url === 'https://www.favorit.com.ua/frontend_api2/'
        ) {
          const reqData = JSON.parse(req._postData);
          if (reqData.method === 'frontend/market/get') {
            const data = await response.json();
            const results = data.result;
            if (!!item.coeff) return;
            item.url = req._headers.referer;
            setMatchCoeff(results, item);
            const totals = getTotals(results, item);
            if (totals) {
              if (!item.coeff) item.coeff = {};
              item.coeff.totals = totals;
            }
          } else if (reqData.method === 'frontend/event/get') {
            const data = await response.json();
            const results = data.result;
            if (!!item.date) return;
            setNamesCommand(results[0], item);
            getDate(results[0], item);
          }
        }
      } catch (err) {
        console.log(`Проблема с данными: ${url}`);
        console.log(err);
      }
    });
    await eventPage.goto(url, {
      waitUntil: 'networkidle2'
    });
    const selector = '.Accordion_titleBlock__wBlra';
    await eventPage.waitForSelector(selector);
    await eventPage.waitForTimeout(5000);
    return item;
  } catch (err) {
    // console.log(`Проблема с урлом: ${url}`);
    return false;
  }
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
