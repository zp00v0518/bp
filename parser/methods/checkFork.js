const schema = require('../../backEnd/db/schema');
const FindInDB = require('../../backEnd/db/FindInDB_test');
const config = require('../../config');

const findInDB = new FindInDB();
const collectionName = config.collections.events.name;
let count = 0;

const { matchKey } = config;
const matching = {
  [matchKey.win1]: [matchKey.win2_draw],
  [matchKey.win2]: [matchKey.win1_draw],
  [matchKey.draw]: [matchKey.win1_win2]
};

async function checkFork() {
  await findInDB.connect(config.db.name);
  const query = {
    date: { $gt: Date.now() },
    class: schema.class.event
  };
  const options = {
    needFields: {
      coeffList: 1,
      date: 1,
      // _id: 0,
      command_1: 1,
      command_2: 2
    }
  };
  const events = await findInDB.all(collectionName, query, options);
  findInDB.close();
  const results = events.result;
  const forkResult = [];
  results.forEach((item) => {
    const result = getFork(item);
    if (result) forkResult.push(result);
  });
  console.log('Проведено сравнений:  ', count);
  return forkResult;
}

function getFork(item) {
  let betsResult = false;
  const { coeffList } = item;
  if (coeffList.length < 2) return false;
  coeffList.forEach((bets) => {
    const arr = coeffList.filter((i) => i !== bets);
    const result = getBets(arr, bets, item);
    if (result) {
      betsResult = [result];
    }
    count++;
  });
  return betsResult;
}

function getBets(coeffList, item, data) {
  let getBetsResult = false;
  const totalsResult = matchTotals(coeffList, item, data);
  let winsResult = false;
  Object.keys(matching).forEach((key) => {
    const matchList = matching[key];
    const start = item.coeff[key];
    coeffList.forEach((bets) => {
      matchList.forEach((matchKey) => {
        const target = bets.coeff[matchKey];
        const result = checkMarga(start, target);
        if (result < 1) {
          winsResult = {};
          winsResult.bk = [item.bk_id, bets.bk_id];
          winsResult.bets = [key, matchKey];
          winsResult.urls = [item.urk, bets.url];
          console.log('');
          console.log('********************');
          console.log(data.command_1);
          console.log(data.command_2);
          console.log(item.bk_id, bets.bk_id);
          console.log(`start: ${start}  target: ${target} result: ${result}`);
        }
      });
    });
  });
  if (totalsResult || winsResult) {
    getBetsResult = {};
    getBetsResult.command_1 = data.command_1;
    getBetsResult.command_2 = data.command_2;
    getBetsResult.eventId = data._id;
    getBetsResult.date = data.date;
  }
  if (totalsResult) getBetsResult.totlas = totalsResult;
  if (winsResult) getBetsResult.wins = winsResult;
  return getBetsResult;
}
function checkMarga(first, second) {
  return 1 / +first + 1 / +second;
}

function matchTotals(arr, item, data) {
  let totlasResult = false;
  const { totals } = item.coeff;
  if (!totals) return totlasResult;
  Object.keys(totals).forEach((goalTotal) => {
    const value = totals[goalTotal];
    arr.forEach((bets) => {
      const betsTotals = bets.coeff.totals;
      if (!betsTotals || !betsTotals[goalTotal]) return;
      const d = checkMarga(value[0], betsTotals[goalTotal][1]);
      const z = checkMarga(value[1], betsTotals[goalTotal][0]);
      if (d < 1 || z < 1) {
        totlasResult = {};
        totlasResult[goalTotal] = {};
        console.log('');
        console.log('********************');
        console.log(data.command_1);
        console.log(data.command_2);
        console.log(item.bk_id, bets.bk_id, `    total: ${goalTotal}`);
        totlasResult[goalTotal] = {
          bk: [],
          bets: [],
          urls: []
        };
        if (d < 1) {
          console.log(
            `меньше-больше coef1:${value[0]} coef2:${betsTotals[goalTotal][1]} result: ${d}`
          );
          totlasResult[goalTotal].bk = [item.bk_id, bets.bk_id];
          totlasResult[goalTotal].bets = [value[0], betsTotals[goalTotal][1]];
          totlasResult[goalTotal].urls = [item.url, bets.url];
        }
        if (z < 1) {
          console.log(
            `больше-меньше coef1:${value[1]} coef2:${betsTotals[goalTotal][0]} result: ${z}`
          );
          totlasResult[goalTotal].bk = [bets.bk_id, item.bk_id];
          totlasResult[goalTotal].bets = [value[1], betsTotals[goalTotal][0]];
          totlasResult[goalTotal].urls = [bets.url, item.url];
        }
      }
    });
  });
  return totlasResult;
}
module.exports = checkFork;
