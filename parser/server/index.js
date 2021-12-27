// сервер который менеджерит данными, которые надо парсить. Записывает результаты в БД
require('dotenv').config({ path: './parse_main_server.env' });
const WS = require('ws');
const template = require('template_func');
const { sendWSMessage } = require('../../backEnd/wsServer');
const getTournametsForParse = require('../parsingProccess/getTournametsForParse');
const endParsingBets = require('../parsingProccess/endParsingBets');
const incrementStatistic = require('../../backEnd/statistic/db/incrementStatistic');


const port = process.env.WS_PORT || 8888;
const SPLICE_NUMBER = 1;
let parsingCount = 0;
let parsingList = []
const handlers = {
  '/getUrlForParse': getUrlForParseHandler,
  '/parsingResult': parsingResultHandler,
}
const IPS = process.env.IPS ? process.env.IPS.trim().split(';') : []
if (!IPS[IPS.length - 1]) IPS.splice(IPS.length - 1)

async function start() {
  await getTournament();
  const wsServer = new WS.Server({ port }, () => {
    console.log(`WS-Сервер запущен по адресу ws://localhost:${port}`);
  });
  wsServer.on('connection', (ws, req) => {
    const ip = req.socket.remoteAddress;
    if (!IPS.includes(ip)) return;

    ws.on('message', async (ev) => {
      const data = template.tryJsonParse(ev);
      const type = data.type
      const handler = handlers[type]
      if (!type || !handler) return 
      await handler(ws, data) 
    });
  });
}

async function getTournament(){
  ++parsingCount;
  if (parsingCount % 2 === 1 ){
    console.time('Цикл парсинга');
  }
  if (parsingCount % 2 === 0){
    console.timeEnd('Цикл парсинга');
  }

  await incrementStatistic();
  parsingList = await getTournametsForParse();
  parsingList = Object.values(parsingList);
  // parsingList = parsingList.flat(Infinity);
}


async function getUrlForParseHandler(ws, data){
  const elems = getDataForParse()
  if (parsingList.length === 0) await getTournament();
  if (elems.length === 0) {
    setTimeout(()=>{
      getUrlForParseHandler(ws, data)
    },500)
    return
  }
  const tourName = elems[0][0].name
  console.time(tourName)
  data.parsingElems = elems
  data.tourName = tourName
  sendWSMessage(ws, data)
}

function getDataForParse(){
  return parsingList.splice(0, SPLICE_NUMBER)
}

async function parsingResultHandler(ws, ev){
  let {data, tourName} = ev
  console.timeEnd(tourName)
  data = await endParsingBets(data);
  console.log(data)
}

start();


