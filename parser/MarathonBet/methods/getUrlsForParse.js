const puppeteer = require('puppeteer');
const config = require('../config');

async function getUrlsForParse() {
  const browser = await puppeteer.launch({
    devtools: true,
    args: ['--log-level="0"']
  });
  const page = await browser.newPage();
  await page.goto(config.path, {
    waitUntil: 'networkidle2'
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
