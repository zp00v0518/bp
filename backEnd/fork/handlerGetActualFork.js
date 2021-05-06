// закомментируемый код проверяет вилки непосредственно в событиях 
// const { incrementStatistic } = require('../statistic/db');
// const { checkFork, addStatisticToForkResult } = require('../../parser/methods');
// const db = require('../../parser/methods/db');

const getActualFork = require('./getActualFork');

async function handlerGetActualFork(data, UserOnline) {
  const { ws } = UserOnline;
  if (!ws) return;
  // const statistic = await incrementStatistic();
  // let forkResult = await checkFork(true);
  // forkResult = addStatisticToForkResult(forkResult, statistic);
  // await db.addForkResultToDB(forkResult);
  const result = await getActualFork();
  const message = {
    type: data.type,
    data: {
      result
    }
  };
  return message;
}

module.exports = handlerGetActualFork;
