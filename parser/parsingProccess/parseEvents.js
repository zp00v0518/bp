const cluster = require('cluster');
const createCluster = require('./createCluster');
const clusterCode = require('./clusterCode');
const getTournametsForParse = require('./getTournametsForParse');
let parsingList = {};

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
  parsingList = await getTournametsForParse();
  parsingList = Object.entries(parsingList);
  await parseCicle();
}

async function parseCicle() {
  for (const arr of parsingList) {
    const tournament = arr[1][0].name;
    const str = `${tournament}  парсился: `;
    console.time(str);
    await createCluster({ BET: JSON.stringify(arr) });
    console.timeEnd(str);
  }
  return true;
}