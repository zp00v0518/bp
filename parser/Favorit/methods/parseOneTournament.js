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
    const selector = '[class*="WidgetWrapper_wrapper"]';
    await tournamentPage.waitForSelector(selector);
    await tournamentPage.waitForTimeout(7000);
    const selectorHrefs = 'a[href*="sports/event/"]';
    const hrefs = await utils.getHrefs(tournamentPage, `${selector} ${selectorHrefs}`);
    // TODO: закомментировать
    if (hrefs.length > 5) hrefs.length = 5;
    // **********************************
    const urlsSeparate = utils.splitArrOnSmallArr(hrefs, parseConfig.splitUrls);
    for (const urls of urlsSeparate) {
      const promises = urls.map(async (url) => {
        const newPage = await browser.newPage();
        try {
          const bets = await parseOneEvent(newPage, url);
          await newPage.close();
          const emptyData = Object.keys(bets).length === 0;
          return emptyData ? false : bets;
        } catch (err) {
          console.log(err);
          await newPage.close();
          return false;
        }
      });
      const f = await Promise.all(promises);
      result.push(...f.filter((i) => i));
    }
    return result;
  } catch (err) {
    console.log(err);
    console.log(`Проблема с урлом: ${url}`);
    return result;
  }
}

module.exports = parseOneTournament;
