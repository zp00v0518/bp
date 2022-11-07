const utils = require('../../utils');
const parseOnEvent = require('./parseOnEvent');
const parseConfig = require('../../parseConfig');

async function parseOneTournament(browser, url) {
  let result = [];
  let tournamentPage;
  try {
    tournamentPage = browser.goto ? browser : await browser.newPage();
    await tournamentPage.goto(url, {
      waitUntil: 'networkidle2',
      timeout: 30000
    });
    // const selector = '[data-id="prematch-events-list"]';
    const selector = '[data-onboarding*="tournament"]';
    const ops = { visible: true };
    await tournamentPage.waitForSelector(selector, ops);
    const pathTohref = '[data-onboarding*="event-card"] a';
    // const pathTohref = '[data-id="event-card"] a'
    const hrefs = await utils.getHrefs(tournamentPage, pathTohref);
    const separate = utils.splitArrOnSmallArr(hrefs, parseConfig.splitUrls);
    for (const urls of separate) {
      const promises = urls.map(async (url) => {
        let bets = false;
        const eventPage = await browser.newPage();
        try {
          bets = await parseOnEvent(eventPage, url);
        } catch (err) {
          if (err.name !== 'TimeoutError') {
            console.log(err);
            console.log(`${__filename} :  Проблема с ${url}`);
          }
        }
        return bets;
      });
      const f = await Promise.all(promises);
      const arr = f.filter((i) => i);
      result.push(...arr);
    }
  } catch (err) {
    console.log(err)
    console.log('Проблема при обработке адреса:  ', url);
    if (err.name !== 'TimeoutError') {
      console.log(err);
      console.log('Проблема при обработке адреса:  ', url);
    }
  }
  await tournamentPage.close();
  return result;
}

module.exports = parseOneTournament;
