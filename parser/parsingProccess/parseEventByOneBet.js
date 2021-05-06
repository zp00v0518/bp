const getTournametsForParse = require('./getTournametsForParse');
const findBet = require('./findBet');
const parseOneBet = require('./parseOneBet');
const endParsingBets = require('./endParsingBets');
const incrementStatistic = require('../../backEnd/statistic/db/incrementStatistic');

let parsingList = {};

async function parseEventByOneBet() {
  parsingList = await getTournametsForParse();
  parsingList = Object.values(parsingList);
  for (const arr of parsingList) {
    const tournament = arr[0].name;
    const str = `${tournament}  парсился: `;
    console.time(str);
    let promises = arr.map((item) => {
      try {
        const betTarget = findBet(item.bkId);
        if (!betTarget) return false;
        const parseResult = parseOneBet(betTarget, item);
        return parseResult;
      } catch (err) {
        console.log(err);
        return false;
      }
    });
    promises = promises.filter((i) => !!i);
    let result = await Promise.all(promises);
    console.timeEnd(str);
    result = await endParsingBets(result);
    console.log(result);
  }
  await incrementStatistic();
}

module.exports = parseEventByOneBet;
