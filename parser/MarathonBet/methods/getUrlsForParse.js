const puppeteer = require('puppeteer');
const config = require('../config');
const parseConfig = require('../../parseConfig');

async function getUrlsForParse() {
  const browser = await puppeteer.launch(parseConfig.browserConfig);
  const page = await browser.newPage();
  await page.goto(config.path, {
    waitUntil: 'domcontentloaded'
  });
  await page.waitForSelector('.category-label-link');
  const pageFrame = page.mainFrame();
  const result = await pageFrame.$eval(
    '.sport-category-content',
    async (elem) => {
      const elems = elem.querySelectorAll('.category-label-link');
      return Array.from(elems).map((i) => i.href);
    }
  );
  await browser.close();
  return result;
}

module.exports = getUrlsForParse;
