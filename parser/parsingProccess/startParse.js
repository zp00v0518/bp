// const getSports = require('./getSports')
// const getTournaments = require('./getTournaments')
const startParseEvents = require('./parseEvents')


setTimeout(async () => {
	// getTournaments();
	// getSports();
	await startParseEvents();
}, 1000);
