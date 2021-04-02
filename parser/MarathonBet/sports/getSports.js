const puppeteer = require('puppeteer');
const appConfig = require('../../../config');
const parseConfig = require('../../parseConfig');
const utils = require('../../utils');

async function getSports() {
  const url = 'https://www.marathonbet.com/uk/';
  const devSettings = {
    devtools: true,
    headless: false
  };
  const browser = await puppeteer.launch(
    Object.assign(parseConfig.browserConfig, devSettings)
  );
  const batPage = await browser.newPage();
  try {
    await batPage.goto(url, {
      waitUntil: 'networkidle2'
    });
    const selector = '.sport-menu-header';
    await batPage.waitForSelector(selector);
    await batPage.addScriptTag({ content: `${utils.parseWithFunction}` });
    const item = await pageFrame.$eval(
      selector,
      async (elem, objStr) => {
        try {
          const options = window.parseWithFunction(objStr);
        } catch (err) {
          console.log(err);
          return false;
        }
      }
      // utils.stringifyWithFunc(params)
    );
  } catch (err) {
    console.log(err);
  }
}

module.exports = getSports;
