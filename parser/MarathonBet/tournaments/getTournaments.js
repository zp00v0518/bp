const puppeteer = require('puppeteer');
const parseConfig = require('../../parseConfig');
const { getUrlsForParseTournament } = require('../../methods/db');

async function getTournaments() {
  const { config } = this;
  const result = await getUrlsForParseTournament(config.id);
	
	console.log(result);
}

module.exports = getTournaments;
