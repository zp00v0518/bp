const { sendWSMessage } = require('../wsServer');
const { incrementStatistic } = require('../statistic/db');
const { checkFork, addStatisticToForkResult } = require('../../parser/methods');
const db = require('../../parser/methods/db');

const getCurrentFork = require('./getCurrentFork');
const { getBkById } = require('../bk');

async function handlerGetFork(data, UserOnline) {
  const { ws } = UserOnline;
  if (!ws) return;
  // const statistic = await incrementStatistic();
  // let forkResult = await checkFork(true);
  // forkResult = addStatisticToForkResult(forkResult, statistic);
  // await db.addForkResultToDB(forkResult);
  const result = await getCurrentFork();
  const ids = formBkIdArr(result);
  const bk = await getBkById(Array.from(ids));
  const message = {
    type: data.type,
    data: {
      result,
      bk
    }
  };
  sendWSMessage(ws, message);
}

function formBkIdArr(arr) {
  const z = new Map();
  arr.forEach((item) => {
    const fork = item.fork;
    fork.forEach((el) => {
      z.set(el.firstBk.bkId, el.firstBk.bkId);
      z.set(el.secondBk.bkId, el.secondBk.bkId);
    });
  });
  return z.values();
}

module.exports = handlerGetFork;
