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
    await tournamentPage.waitForTimeout(1000);
    await tournamentPage.setViewport({
      width: 1023,
      height: 1070,
    });
    const selector = '[class*="WidgetWrapper_wrapper"]';
    await tournamentPage.waitForSelector(selector);
    await tournamentPage.waitForTimeout(7000);
    // const selectorHrefs = 'a[href*="sports/event/"]';
    const selectorHrefs = '[data-role^="event-id-"]';
    let hrefs = await tournamentPage.$$eval(selectorHrefs, (arr) => {
      const hrefs = arr.map((a) => a.dataset.role.match(/[0-9]{1,}/gi)[0]);
      const set = new Set(hrefs);
      console.log(set)
      return [...set];
    })
    hrefs = hrefs.map(i => {
      const newUrl = url.replace('category', 'event').replace(/[0-9]{1,}/gi, i)
      return newUrl
    })
    // const hrefs = await utils.getHrefs(tournamentPage, `${selector} ${selectorHrefs}`);
    // TODO: закомментировать
    // if (hrefs.length > 5) hrefs.length = 5;
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
