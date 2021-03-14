const schema = require('../backEnd/db/schema');
const FindInDB = require('../backEnd/db/FindInDB');
const config = require('../config');
const data = require('./data');

const findInDB = new FindInDB();
const collectionName = config.collections.events.name;
let count = 0;

const { matchKey } = config;
const matching = {
  [matchKey.win1]: [matchKey.win2_draw],
  [matchKey.win2]: [matchKey.win1_draw],
  [matchKey.draw]: [matchKey.win1_win2]
};

async function test() {
  await findInDB.connect(config.db.name);
  const query = {
    date: { $gt: Date.now() },
    class: schema.class.event
  };
  const options = {
    needFields: {
      coeffList: 1,
      date: 1,
      _id: 0,
      command_1: 1,
      command_2: 2
    }
  };
  const events = await findInDB.all(collectionName, query, options);
  findInDB.close();
  const results = events.result;
  results.forEach((item) => {
    getFork(item);
  });
  console.log(count);
}
function getFork(item) {
  const { coeffList } = item;
  if (coeffList.length < 2) return false;
  coeffList.forEach((bets) => {
    const arr = coeffList.filter((i) => i !== bets);
    getBets(arr, bets, item);
    // count++;
  });
}

function getBets(coeffList, item, data) {
  Object.keys(matching).forEach((key) => {
    const matchList = matching[key];
    const start = item.coeff[key];
    // const startItog = getWin(baseBet, start);
    coeffList.forEach((bets) => {
      matchList.forEach((matchKey) => {
        const target = bets.coeff[matchKey];
        const result = 1 / start + 1 / target;
        if (result < 1) {
          console.log(data.command_1);
          console.log(data.command_2);
          console.log(item.bk_id, bets.bk_id);
          console.log(`start: ${start}  target: ${target} result: ${result}`);
        }
        count++;
      });
    });
  });
}

setTimeout(() => {
  test();
}, 500);
