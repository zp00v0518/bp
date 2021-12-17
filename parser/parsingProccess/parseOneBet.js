const puppeteer = require('puppeteer');
const parseConfig = require('../parseConfig');
const schema = require('../../backEnd/db/schema');

async function parseOneBet(bet, item) {
  let result = [];
  const browser = await puppeteer.launch(parseConfig.browserConfig);
  try {
    result = await bet.parseOneTournament(browser, item.url);
  } catch (err) {
    const {name, message} = err
    console.log(`${name}:${message}     ${item.url}`);
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
