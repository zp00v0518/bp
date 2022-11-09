const puppeteer = require('puppeteer');
const parseConfig = require('../parseConfig');
const { getUrlsForParseTournament } = require('./db');
const utils = require('../utils');


async function getTournamentsBaseFunc(parserCallback){
	const { config } = this;
  const result = await getUrlsForParseTournament(config.id);
  if (result.length === 0) {
    const er = new Error('Распарси сначало категории спорта, лошара :)');
    throw er;
  }
  const separate = utils.splitArrOnSmallArr(result, 2);
  const tournaments = [];
  for (const items of separate) {
    let browserConfig = Object.assign({}, parseConfig.browserConfig);
    browserConfig = config.browser ? Object.assign(browserConfig, config.browser) : browserConfig
    const browser = await puppeteer.launch(browserConfig);
    const promises = items.map(async (item) => {
      let bets = false;
      const tournamentPage = await browser.newPage();
      try {
        bets = await parserCallback(tournamentPage, item, config);
      } catch (err) {
        if (err.name !== 'TimeoutError') {
          console.log(err);
          console.log(`Проблема с ${item.url}`);
        }
        tournamentPage.close();
      }
      return bets;
    });
    const f = await Promise.all(promises);
    const arr = f.filter((i) => i);
    tournaments.push(...arr);
    await browser.close();
  }
  // await browser.close();
  return tournaments;
}

module.exports = getTournamentsBaseFunc