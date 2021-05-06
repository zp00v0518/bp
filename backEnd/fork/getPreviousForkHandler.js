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
  return message;
}

module.exports = getPreviousForkHandler;
