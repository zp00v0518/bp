const { sendWSMessage } = require('../wsServer');
const getPreviousFork = require('./getPreviousFork');


async function getPreviousForkHandler(data, UserOnline) {
  const { ws } = UserOnline;
  if (!ws) return;
  const result = await getPreviousFork();
  const message = {
    type: data.type,
    data: {
      result
    }
  };
  sendWSMessage(ws, message);
}

module.exports = getPreviousForkHandler;
