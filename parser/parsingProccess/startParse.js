const getSports = require('./getSports')
const getTournaments = require('./getTournaments')
const parseEventByOneBet = require('./parseEventByOneBet')


setTimeout(async () => {
	// getTournaments();
	// getSports();
	await parseEventByOneBet();
}, 1000);
