const utils = require('../../utils');
const parseOneEvent = require('./parseOneEvent');
const parseConfig = require('../../parseConfig');

async function parseOneTournament(browser, url) {
  const tournamentPage = await browser.newPage();
  const result = [];

  // const hrefs = [];
  // tournamentPage.on('response', async (response) => {
  //   try {
  //     const req = response.request();
  //     if (
  //       req._method !== 'POST' ||
  //       req._url !== 'https://www.favorit.com.ua/frontend_api2/'
  //     )
  //       return;
  //     const reqData = JSON.parse(req._postData);
  
  //     if (
  //       !reqData.params ||
  //       !reqData.params.by ||
  //       !reqData.params.by.category_id
  //     )
  //       return;
  //     const data = await response.json();
  //     const eventsData = data.result;
  //     eventsData.length = 3;
  
  //   } catch (err) {
  //     console.log(`Проблема с урлом: ${url}`);
  //   }
  // });


  await tournamentPage.goto(url, {
    waitUntil: 'networkidle2'
  });

  try {
    const selector = '.Accordion_body__2kc5I.Accordion_opened__QoZr8';
    await tournamentPage.waitForSelector(selector);
    await tournamentPage.waitForTimeout(7000);
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
          await newPage.close();
          return bets || false;
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
    console.log(`Проблема с урлом: ${url}`);
    return result;
  }
}

module.exports = parseOneTournament;
