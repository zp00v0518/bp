const puppeteer = require('puppeteer');
const parseSportsCategory = require('./parseSportsCategory');
const parseConfig = require('../../parseConfig');
const utils = require('../../utils');
const setSportOnDB = require('../../methods/db/setSportOnDB');

const funcInPage = {
  parseSportsCategory
};

async function getSports() {
  const url = 'https://parimatch.com/';
  const browser = await puppeteer.launch(parseConfig.browserConfig);
  const betPage = await browser.newPage();
  let result = [];
  try {
    await betPage.goto(url, {
      waitUntil: 'networkidle2'
    });
    const selector = '[data-id="sports-navigation-menu"]';
    // const selector = '#lobbySportsHolder';
    await betPage.waitForSelector(selector);
    await betPage.waitForTimeout(10000);
    await betPage.addScriptTag({ content: `${utils.parseWithFunction}` });
    result = await betPage.$eval(
      selector,
      async (elem, objStr) => {
        console.clear();
        try {
          const pageMethods = window.parseWithFunction(objStr);
          const listSports = pageMethods.parseSportsCategory(elem);
          return listSports;
        } catch (err) {
          console.log(err);
          return [];
        }
      },
      utils.stringifyWithFunc(funcInPage)
    );
  } catch (err) {
    console.log(err);
    await browser.close();
    return result;
  }
  await browser.close();
  await setSportOnDB.apply(this, [result]);
  return result;
}

module.exports = getSports;
