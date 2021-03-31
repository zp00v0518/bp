const cluster = require('cluster');
const createCluster = require('./createCluster');
const clusterCode = require('./clusterCode');
const listForParse = require('./listForParse');
const methods = require('../methods');
const db = require('../methods/db');
const dropCollection = require('../../backEnd/db/methods/dropCollection');
const config = require('../../config');
const { incrementStatistic } = require('../../backEnd/statistic/db');

if (cluster.isMaster) {
  console.log(`Master ${process.pid} is running`);
  start();
} else {
  clusterCode();
}

async function start() {
  const result = [];
  cluster.on('message', (worker, msg) => {
    const events = msg.result;
    result.push(...events);
  });
  await parseCicle();
  await endParsingBets(result);
  setTimeout(() => {
    console.log('*********************************************');
    console.log('');
    console.log('');
    start();
  }, 1000 * 60);
}

async function endParsingBets(result) {
  console.log('Кол-во распарсенных событий', result.length);
  const statistic = await incrementStatistic();

  const commandsDBList = await db.getCommandsByName(result);
  result = methods.setCommandsId(result, commandsDBList);

  const commands = methods.createListCommands(result);
  if (commands.length > 0) {
    await db.addUnsetCommandsToDB(commands);
  }

  await dropCollection(config.db.name, config.collections.events.name);
  await db.addEventsToDB(result);

  let forkResult = await methods.checkFork();
  forkResult = methods.addStatisticToForkResult(forkResult, statistic);
  await db.addForkResultToDB(forkResult);
  console.log(forkResult);
}

async function parseCicle() {
  for (const arr of listForParse) {
    console.time('Блок парсился:');
    const promises = arr.map((item) => {
      return createCluster({ BET: item.name });
    });
    await Promise.all(promises);
    console.timeEnd('Блок парсился:');
  }
  return true;
}
