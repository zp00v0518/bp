const { sendWSMessage } = require('../wsServer');
const { incrementStatistic } = require('../statistic/db');

async function handlerGetFork(data, UserOnline) {
  const { ws } = UserOnline;
  if (!ws) return;
  const res = await incrementStatistic();
  console.log(res);
}

module.exports = handlerGetFork;
