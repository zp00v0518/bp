const utils = require('../../utils');
const parseOneEvent = require('./parseOneEvent');
const parseConfig = require('../../parseConfig');

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
    // if (hrefs.length > 10) hrefs.length = 10;
    // **********************************
    const urlsSeparate = utils.splitArrOnSmallArr(hrefs, parseConfig.splitUrls);
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

module.exports = parseOneTournament;