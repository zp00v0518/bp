const puppeteer = require('puppeteer');
const parseConfig = require('../parseConfig');

async function parseOneBet(bet, item) {
  let result = [];
  const browser = await puppeteer.launch(parseConfig.browserConfig);
  try {
    result = await bet.parseOneTournament(browser, item.url);
  } catch (err) {
    console.log(err);
  }
  setExtraDataToItem(result, item);
  await browser.close();
  return result;
}

function setExtraDataToItem(arr = [], tournament) {
  arr.forEach((item) => {
    item.bkId = tournament.bkId;
    item.ref_tournament = tournament._id;
  });
}
module.exports = parseOneBet;
