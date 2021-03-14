const checkFork = require('../methods/checkFork');

async function start(){
  const result = await checkFork();
  console.log(result);
}

start();