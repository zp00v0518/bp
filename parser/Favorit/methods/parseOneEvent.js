const setMatchCoeff = require('./setMatchCoeff');
const getDate = require('./getDate');
const getTotals = require('./getTotals');
const setNamesCommand = require('./setNamesCommand');

async function parseOneEvent(eventPage, url) {
  const item = {};
  console.time('asd')
  try {
    eventPage.on('response', async (response) => {
      try {
        const req = response.request();
        if (
          req._method === 'POST' &&
          req._url === 'https://www.favorit.com.ua/frontend_api2/'
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
          } else if (reqData.method === 'frontend/event/get') {
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
    
    await eventPage.waitForSelector(selector);
    await eventPage.waitForTimeout(5000);
    return item;
  } catch (err) {
    console.timeEnd('asd');
    console.log(err, `Проблема с урлом: ${url}`);
    return item;
  }
}

module.exports = parseOneEvent;