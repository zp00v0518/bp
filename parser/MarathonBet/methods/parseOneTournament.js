const utils = require('../../utils');
const parseOneEvent = require('./parseOneEvent');
const parseConfig = require('../../parseConfig');

async function parseOneTournament(browser, url) {
  const tournamentPage = await browser.newPage();
  const result = [];
  try {
    await tournamentPage.goto(url, {
      waitUntil: 'domcontentloaded'
    });
    await tournamentPage.waitForSelector('.category-label');
    const hrefs = await utils.getHrefs(tournamentPage, '.member-link');
    const separate = utils.splitArrOnSmallArr(hrefs, parseConfig.splitUrls);
    for (const urls of separate) {
      const promises = urls.map(async (url) => {
        let bets = false;
        const eventPage = await browser.newPage();
        try {
          bets = await parseOneEvent(eventPage, url);
        } catch (err) {
          if (err.name !== 'TimeoutError') {
            console.log(err);
            console.log(`Проблема с ${url}`);
          }
          eventPage.close();
        }
        return bets;
      });
      const f = await Promise.all(promises);
      const arr = f.filter((i) => i);
      result.push(...arr);
    }
    await tournamentPage.close();
    return result || [];
  } catch (err) {
    console.log(err);
    console.log('Проблема при обработке адреса:  ', url);
    await tournamentPage.close();
    return result;
  }
}

module.exports = parseOneTournament;