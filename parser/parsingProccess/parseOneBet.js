const puppeteer = require('puppeteer');
const parseConfig = require('../parseConfig');
const schema = require('../../backEnd/db/schema');

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
  const { refs } = schema;
  arr.forEach((item) => {
    item.bkId = tournament.bkId;
    item[refs.tournament_bk] = tournament._id;
  });
}
module.exports = parseOneBet;
