const puppeteer = require('puppeteer');
const config = require('./config');
const { getUrlsForParse } = require('./methods');
const parseOneTournament = require('./methods/parseOneTournament');
const getCategoryUrls = require('./methods/getCategoryUrls');
const parseConfig = require('../parseConfig');

async function parse(urlsArr = []) {
  const browser = await puppeteer.launch(parseConfig.browserConfig);
  const result = [];
  const currArr = await getCategoryUrls(browser, config.path);
  for (const url of currArr) {
    const bets = await parseOneTournament(browser, url);
    result.push(...bets);
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

module.exports = { parse, setBkId, modifDataToDB, getUrlsForParse };
