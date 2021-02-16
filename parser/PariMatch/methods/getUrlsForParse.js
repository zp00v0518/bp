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
  await page.waitForSelector('.wrapper.text.light.seosport');
  const pageFrame = page.mainFrame();
  const result = await pageFrame.$eval('.wrapper.text.light.seosport', async (elem, sksk) => {
    const elems = elem.querySelector('#sports').querySelectorAll('li a');
    return Array.from(elems).map((i) => i.href);
  });
  await browser.close();
  return result;
}

module.exports = getUrlsForParse;
