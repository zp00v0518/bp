const getSports = require('./getSports')
const getTournaments = require('./getTournaments')
const parseEventByOneBet = require('./parseEventByOneBet')
const parseEventByOneBetLOOP = require('./parseEventByOneBetLOOP')


setTimeout(async () => {
	// getTournaments();
	// getSports();
	// await parseEventByOneBet();
	await parseEventByOneBetLOOP();
}, 1000);
