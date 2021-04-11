const puppeteer = require('puppeteer');
const config = require('./config');
const utils = require('../utils');
const { getUrlsForParse } = require('./methods');
const getCategoryUrls = require('./methods/getCategoryUrls');
const parseOneTournament = require('./methods/parseOneTournament');
const parseConfig = require('../parseConfig');
const { getSports } = require('./sports');

async function parse(urlsArr) {
  const browser = await puppeteer.launch(parseConfig.browserConfig);
  const curRuls = await getCategoryUrls(browser, config.path);
  const separate = utils.splitArrOnSmallArr(curRuls, parseConfig.splitUrls);
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
  } catch (err) {
    console.log(err);
  }
  await browser.close();
  return result;
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

module.exports = {
  parse,
  setBkId,
  modifDataToDB,
  getUrlsForParse,
  getSports,
  config
};
