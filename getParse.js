const fs = require('fs');
const MarathonBet = require('./parser/MarathonBet');
const Favorit = require('./parser/Favorit');
const PariMatch = require('./parser/PariMatch');
const methods = require('./parser/methods');
const db = require('./parser/methods/db');
const MarathonUrls = require('./parser/MarathonBet/urls_old');
const PariMatchUrls = require('./parser/PariMatch/urls');
const FavoritUrls = require('./parser/Favorit/urls');
const ConnectMongoDB = require('./backEnd/db/connectMongoDB');
const config = require('./config');

const Mongo = new ConnectMongoDB();

// getUrlsForParse
const allResults = [];
const list = [
  { bet: MarathonBet, urls: MarathonUrls, name: 'MarathonBet' },
  { bet: PariMatch, urls: PariMatchUrls, name: 'PariMatch' },
  { bet: Favorit, urls: FavoritUrls, name: 'Favorit' }
];

async function goToParse(arr = []) {
  console.time('work');
  let result = [];
  for (const item of arr) {
    const str = `time parsing  ${item.name}`;
    console.time(str);
    // item.urls.length = 1;
    const z = await parseOneBet(item.bet, item.urls);
    result.push(...z);
    console.timeEnd(str);
  }
  console.log('Кол-во распарсенных событий', result.length);
  const commandsDBList = await db.getCommandsByName(result);
  result = methods.setCommandsId(result, commandsDBList);
  const commands = methods.createListCommands(result);
  if (commands.length > 0) {
    await db.addUnsetCommandsToDB(commands);
  }
  await clearDB();
  await db.addEventsToDB(result);
  const forkResult = await methods.checkFork();
  allResults.push(...forkResult);
  console.timeEnd('work');
}
async function parseOneBet(bet, urls) {
  const result = await bet.parse(urls);
  bet.setBkId(result);
  bet.modifDataToDB(result);
  return result;
}

async function clearDB() {
  await Mongo.connect({ dbName: config.db.name });
  const collection = await Mongo.open(config.collections.events.name);
  try {
    await collection.drop();
  } catch (err) {}
  Mongo.close();
}

async function test() {
  await goToParse(list);
}

async function start() {
  setTimeout(async () => {
    await test();
    start();
  }, 20000);
}

start();
