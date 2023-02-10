const setMatchCoeff = require('./setMatchCoeff');
const getDate = require('./getDate');
const getTotals = require('./getTotals');
const setNamesCommand = require('./setNamesCommand');

async function parseOneEvent(eventPage, url, option = {}) {
  const { config } = option;
  const item = {};
  try {
    eventPage.on('response', async (response) => {
      try {
        const req = response.request();
        if (
          req._method === 'POST' &&
          req._url === config.response.api1
        ) {
          const reqData = JSON.parse(req._postData);
          if (reqData.method === 'frontend/market/get') {
            const data = await response.json();
            const results = data.result;
            if (!!item.coeff) return;
            item.url = req._headers.referer;
            setMatchCoeff(results, item);
            const totals = getTotals(results, item);
            if (totals) {
              if (!item.coeff) item.coeff = {};
              item.coeff.totals = totals;
            }
          } else if (reqData.method === 'frontend/event/get' && reqData.params && reqData.params.by && typeof reqData.params.by.event_id === 'number') {
            const data = await response.json();
            const results = data.result;
            if (!!item.date) return;
            setNamesCommand(results[0], item);
            getDate(results[0], item);
          }
        }
      } catch (err) {
        console.log(`Проблема с данными: ${url}`);
        console.log(err);
      }
    });
    await eventPage.goto(url, {
      waitUntil: 'networkidle2'
    });
    const selector = '[class*="EventMarkets_markets"]';
    // const selector = '.Accordion_titleBlock__wBlra';

    await eventPage.waitForTimeout(9000);
    await eventPage.waitForSelector(selector);
    await eventPage.waitForTimeout(9000);
    return item;
  } catch (err) {
    console.log(`Проблема с урлом: ${url}`);
    console.log(err, `Проблема с урлом: ${url}`);
    return false;
  }
}

module.exports = parseOneEvent;