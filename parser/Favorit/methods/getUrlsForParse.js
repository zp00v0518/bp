const puppeteer = require('puppeteer');
const config = require('../config');
const utils = require('../../utils');
const parseConfig = require('../../parseConfig');

async function getUrlsForParse() {
  const browser = await puppeteer.launch(parseConfig.browserConfig);
  const page = await browser.newPage();
  await page.goto(config.path, {
    waitUntil: 'networkidle2'
  });
  const linkSelector = '.Categories_categoryLink__3e_ND';
  await page.waitForSelector(linkSelector, { visible: true });
  const hrefs = await utils.getHrefs(page, linkSelector);
  await browser.close();
  return hrefs;
}

module.exports = getUrlsForParse;
