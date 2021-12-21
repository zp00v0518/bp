// сервер, предназначение которого парсить конторы и отправлять данные назад
const WS = require('ws');
const template = require('template_func');
const { sendWSMessage } = require('../../backEnd/wsServer');
const findBet = require('../parsingProccess/findBet');
const parseOneBet = require('../parsingProccess/parseOneBet');
let timer = null;
const handlers = {
  '/getUrlForParse': parsingData
};

async function main() {
  console.log(123);
  let wsServer = {};
  wsServer = new WS('ws://localhost:8888');
  wsServer.on('error', () => {});

  wsServer.on('open', () => {
    clearInterval(timer);
    getUrlForParse(wsServer);
  });

  wsServer.on('message', async (ev) => {
    const data = template.tryJsonParse(ev);
    const type = data.type;
    const handler = handlers[type];
    if (!type || !handlers) return;
    await handler(wsServer, data);
  });

  wsServer.on('close', () => {
    clearInterval(timer);
    timer = setTimeout(() => {
      main();
    }, 2000);
  });
}

async function parsingData(ws, data) {
  let { parsingElems, tourName } = data;
  parsingElems = parsingElems.flat(Infinity);
  let promises = parsingElems.map((item) => {
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
  const message = {
    type: '/parsingResult',
    data: result,
    tourName
  };
  sendWSMessage(ws, message);
  setTimeout(() => {
    getUrlForParse(ws);
  }, 10000);
}

function getUrlForParse(ws) {
  sendWSMessage(ws, { type: '/getUrlForParse' });
}
main();
