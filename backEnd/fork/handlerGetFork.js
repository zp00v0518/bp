const { sendWSMessage } = require('../wsServer');

function handlerGetFork(data, UserOnline) {
  const {ws} = UserOnline;
  if(!ws) return;
}

module.exports = handlerGetFork;
