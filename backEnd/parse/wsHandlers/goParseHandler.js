const parseSports = require('../../../parser/parsingProccess/getSports');
const getTournaments = require('../../../parser/parsingProccess/getTournaments');
const parseEvents = require('../../../parser/parsingProccess/parseEvents');

const dictionary = {
  sports: parseSports,
  tournament: getTournaments,
  events: parseEvents
};

async function goParseHandler(data) {
  const { target } = data;
  const message = {
    type: data.type,
    status: false
  };
  const handler = dictionary[target];
  if (!handler) {
    message.message = 'Обработчик для парсинга не найден';
  } else {
    const result = await handler();
    message.result = result;
  }
  return message;
}

module.exports = goParseHandler;
