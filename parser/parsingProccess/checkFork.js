const matchKey = require('../parseConfig/matchKey');
const schema = require('../../backEnd/db/schema');
const forkFabrica = require('./forkFabrica');
const { refs } = schema;

const matching = {
  [matchKey.win1]: [matchKey.win2_draw],
  [matchKey.win2]: [matchKey.win1_draw],
  [matchKey.draw]: [matchKey.win1_win2]
};
function checkFork(data) {
  const events = modifyEventsForCherk(data);
  const forkResult = [];

  events.forEach((item) => {
    const result = getFork(item);
    const forkItem = forkFabrica(item);
    forkItem.fork.push(...result);
    if (forkItem.fork.length > 0) forkResult.push(forkItem);
  });
  return forkResult;
}

function modifyEventsForCherk(data) {
  const result = {};
  data.forEach((item) => {
    const { commandId_1, commandId_2, date } = item;
    const key = '' + commandId_1 + commandId_2 + date;
    if (!result[key]) result[key] = [];
    result[key].push(item);
  });
  return Object.values(result);
}

function getFork(arrEvents) {
  let betsResult = [];
  if (arrEvents.length < 2) return betsResult;
  const lengthLoop = Math.ceil(arrEvents.length / 2);
  for (let i = 0; i < lengthLoop; i++) {
    const item = arrEvents[i];
    const checkArr = arrEvents.filter((i) => i !== item);
    const result = getBets(checkArr, item);
    if (result) {
      betsResult.push(...result);
    }
  }
  return betsResult;
}

function getBets(checkArr, item) {
  let getBetsResult = [];
  if (!item.coeff) return false
  const totalsResult = matchTotals(checkArr, item);
  getBetsResult.push(...totalsResult);

  Object.keys(matching).forEach((key) => {
    const matchList = matching[key];
    const start = item.coeff[key];
    checkArr.forEach((bets) => {
      matchList.forEach((matchKey) => {
        try {
          const target = bets.coeff[matchKey];
          const marga = checkMarga(start, target);
          if (marga < 1) {
            const cell = {
              marga,
              firstBk: getBkSection(item, key),
              secondBk: getBkSection(bets, matchKey)
            };
            getBetsResult.push(cell);
          }
        } catch (error) {
          console.log(`bkId:${bets.bkId}  command_1:'${bets.command_1}'   command_2:'${bets.command_2}'  date:${bets.date}`)
        }

      });
    });
  });
  return getBetsResult;
}

function matchTotals(arr, item) {
  let totlasResult = [];
  const { totals } = item.coeff;
  if (!totals) return totlasResult;
  Object.keys(totals).forEach((goalTotal) => {
    const value = totals[goalTotal];
    arr.forEach((bets) => {
      if (!bets.coeff) return
      const betsTotals = bets.coeff.totals;
      if (!betsTotals || !betsTotals[goalTotal]) return;
      const d = checkMarga(value[0], betsTotals[goalTotal][1]);
      const z = checkMarga(value[1], betsTotals[goalTotal][0]);
      if (d < 1) {
        const cell = {
          marga: d,
          firstBk: getBkSection(item, matchKey.less, value[0]),
          secondBk: getBkSection(bets, matchKey.more, betsTotals[goalTotal][1]),
          total: goalTotal
        };
        totlasResult.push(cell);
      }
      if (z < 1) {
        const cell = {
          marga: z,
          firstBk: getBkSection(item, matchKey.more, value[1]),
          secondBk: getBkSection(bets, matchKey.less, betsTotals[goalTotal][0]),
          total: goalTotal
        };
        totlasResult.push(cell);
      }
    });
  });
  return totlasResult;
}

function checkMarga(first, second) {
  return 1 / +first + 1 / +second;
}

function getBkSection(bk, bet, coeff) {
  return {
    bkId: bk.bkId,
    url: bk.url,
    [refs.tournament_bk]: bk[refs.tournament_bk],
    bet,
    coeff: coeff !== undefined ? coeff : bk.coeff[bet]
  };
}
module.exports = checkFork;
