const parseEventByOneBet = require('./parseEventByOneBet');

async function start() {
	console.time('Цикл парсинга');
  await parseEventByOneBet();
	console.timeEnd('Цикл парсинга');
  setTimeout(async () => {
		await start();
  }, 5000);

}

module.exports = start