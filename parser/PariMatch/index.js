const puppeteer = require('puppeteer');
const config = require('./config');
const utils = require('../utils');
const { getUrlsForParse } = require('./methods');
const parseOneTournament = require('./methods/parseOneTournament');
const parseConfig = require('../parseConfig');

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
    // await browser.close();
    // return result;
  } catch (err) {
    console.log(err);
    // return result;
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
