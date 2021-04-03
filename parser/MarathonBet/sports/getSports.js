const puppeteer = require('puppeteer');
const appConfig = require('../../../config');
const parseConfig = require('../../parseConfig');
const utils = require('../../utils');
const parseSportsCategory = require('./parseSportsCategory');

const funcInPage = {
  parseSportsCategory
};

async function getSports() {
  const url = 'https://www.marathonbet.com/uk/';
  const devSettings = {
    devtools: true,
    headless: false,
    args: ['--window-size=1920,1070', '--window-position=-310,-1080']
  };
  const browser = await puppeteer.launch(
    Object.assign(parseConfig.browserConfig, devSettings)
  );
  const betPage = await browser.newPage();
  let result = [];
  try {
    await betPage.goto(url, {
      waitUntil: 'networkidle2'
    });
    const selector = '.sport-menu-header';
    await betPage.waitForSelector(selector);
    await betPage.addScriptTag({ content: `${utils.parseWithFunction}` });
    result = await betPage.$eval(
      '.menu-wrapper',
      async (elem, objStr) => {
        console.clear();
        try {
          const pageMethods = window.parseWithFunction(objStr);
          const listSports = pageMethods.parseSportsCategory(elem, pageMethods);
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
    return result;
  }
  await browser.close();
  return result;
}

module.exports = getSports;
