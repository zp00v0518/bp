const WS = require('ws');
const config = require('../../config');
const handlers = require('./handlers');
const sendWSMessage = require('./sendWSMessage');
const { getUserByCookies } = require('../user/db');
const Cookies = require('cookies');
const UserOnLine = {};

class WsServer {
  init(port) {
    this.server = new WS.Server({ port }, () => {
      console.log(`WS-Сервер запущен по адресу http://loclahost:${port}`);
    });
  }
  on(event, callback) {
    this.server.on(event, callback);
  }
}

const wsServer = new WsServer();
wsServer.init(config.server.port.ws);

wsServer.on('connection', async (ws, req) => {
  const cookies = new Cookies(req);
  const userCookies = cookies.get('user');
  const user = await getUserByCookies(userCookies);
  UserOnLine[userCookies] = {};
  UserOnLine[userCookies].user = user;
  UserOnLine[userCookies].ws = ws;
  ws.on('close', () => {
    delete UserOnLine[userCookies];
  });
  ws.on('message', (message) => {
    if (!UserOnLine[userCookies]) return;
    let data;
    try {
      data = JSON.parse(message);
      const { type } = data;
      if (handlers[type]) {
        handlers[type](data, UserOnLine[userCookies]);
        return;
      }
      sendWSMessage(ws, data);
    } catch (err) {
      console.log(err);
    }
  });
});
