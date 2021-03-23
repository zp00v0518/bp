const { sendWSMessage } = require('../wsServer');
const { incrementStatistic } = require('../statistic/db');
const { checkFork, addStatisticToForkResult } = require('../../parser/methods');
const db = require('../../parser/methods/db');

const getLastFork = require('./getLastFork');

async function handlerGetFork(data, UserOnline) {
  const { ws } = UserOnline;
  if (!ws) return;
  // const statistic = await incrementStatistic();
  // let forkResult = await checkFork(true);
  // forkResult = addStatisticToForkResult(forkResult, statistic);
  // await db.addForkResultToDB(forkResult);
  const result = await getLastFork();
  const message = {
    type: data.type,
    data: {
      result
    }
  };
  sendWSMessage(ws, message);
}

module.exports = handlerGetFork;
