const schema = require('../../backEnd/db/schema');
const FindInDB = require('../../backEnd/db/FindInDB');
const config = require('../../config');
const matchKey = require('../parseConfig/matchKey');

const findInDB = new FindInDB();
const collectionName = config.collections.events.name;
let count = 0;

const matching = {
  [matchKey.win1]: [matchKey.win2_draw],
  [matchKey.win2]: [matchKey.win1_draw],
  [matchKey.draw]: [matchKey.win1_win2]
};

async function checkFork() {
  await findInDB.connect(config.db.name);
  const query = {
    // date: { $gt: Date.now() },
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
  // results.length = 1;
  const forkResult = [];
  results.forEach((item) => {
    const result = getFork(item);
    const forkItem = {
      command_1: item.command_1,
      command_2: item.command_2,
      eventId: item._id,
      date: item.date,
      fork: []
    }
    forkItem.fork.push(...result);
    if (forkItem.fork.length > 0) forkResult.push(forkItem)
  });
  console.log('Проведено сравнений:  ', count);
  return forkResult;
}

function getFork(item) {
  let betsResult = [];
  const { coeffList } = item;
  if (coeffList.length < 2) return betsResult;
  coeffList.forEach((bets) => {
    const arr = coeffList.filter((i) => i !== bets);
    const result = getBets(arr, bets);
    if (result) {
      betsResult.push(...result)
    }
    count++;
  });
  return betsResult;
}

function getBets(coeffList, item) {
  let getBetsResult = [];
  const totalsResult = matchTotals(coeffList, item);
  getBetsResult.push(...totalsResult);
  Object.keys(matching).forEach((key) => {
    const matchList = matching[key];
    const start = item.coeff[key];
    coeffList.forEach((bets) => {
      matchList.forEach((matchKey) => {
        const target = bets.coeff[matchKey];
        const marga = checkMarga(start, target);
        if (marga < 1) {
          const cell = {
            marga,
            firstBk: getBkSection(item, key),
            secondBk: getBkSection(bets, matchKey)
          };
          getBetsResult.push(cell);
          // console.log('');
          // console.log('********************');
          // console.log(data.command_1);
          // console.log(data.command_2);
          // console.log(item.bk_id, bets.bk_id);
          // console.log(`start: ${start}  target: ${target} result: ${result}`);
        }
      });
    });
  });
  return getBetsResult;
}
function checkMarga(first, second) {
  return 1 / +first + 1 / +second;
}

function matchTotals(arr, item) {
  let totlasResult = [];
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
        // totlasResult = {};
        // totlasResult[goalTotal] = {};
        // console.log('');
        // console.log('********************');
        // console.log(data.command_1);
        // console.log(data.command_2);
        // console.log(item.bk_id, bets.bk_id, `    total: ${goalTotal}`);
        // totlasResult[goalTotal] = {
        //   bk: [],
        //   bets: [],
        //   urls: []
        // };
        if (d < 1) {
          const cell = {
            marga: d,
            firstBk: getBkSection(item, matchKey.less, value[0]),
            secondBk: getBkSection(bets, matchKey.more, betsTotals[goalTotal][1]),
            total: goalTotal
          };
          totlasResult.push(cell)
          // console.log(
          //   `меньше-больше coef1:${value[0]} coef2:${betsTotals[goalTotal][1]} result: ${d}`
          // );
          // totlasResult[goalTotal].bk = [item.bk_id, bets.bk_id];
          // totlasResult[goalTotal].bets = [value[0], betsTotals[goalTotal][1]];
          // totlasResult[goalTotal].urls = [item.url, bets.url];
        }
        if (z < 1) {
          const cell = {
            marga: z,
            firstBk: getBkSection(item, matchKey.more, value[1]),
            secondBk: getBkSection(bets, matchKey.less, betsTotals[goalTotal][0]),
            total: goalTotal
          };
          totlasResult.push(cell)
          // console.log(
          //   `больше-меньше coef1:${value[1]} coef2:${betsTotals[goalTotal][0]} result: ${z}`
          // );
          // totlasResult[goalTotal].bk = [bets.bk_id, item.bk_id];
          // totlasResult[goalTotal].bets = [value[1], betsTotals[goalTotal][0]];
          // totlasResult[goalTotal].urls = [bets.url, item.url];
        }
      }
    });
  });
  return totlasResult;
}

function getBkSection(bk, bet, coeff) {
  return {
    bkId: bk.bk_id,
    url: bk.url,
    bet,
    coeff: coeff !== undefined ? coeff : bk.coeff[bet]
  };
}
module.exports = checkFork;
