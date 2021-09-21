const WS = require('ws');
const config = require('../../config');
const getRouteHandler = require('./getRouteHandler');
const { checkAccess } = require('../roles');
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
  ws.on('message', async (message) => {
    const userElem = UserOnLine[userCookies]
    if (!userElem) return;
    let data;
    try {
      data = JSON.parse(message);
      const { type } = data;
      const access = userElem.user ? checkAccess(type, userElem.user.role) : false
      const handler = getRouteHandler(type);
      if (access && handler) {
        const message = await handler(data, userElem);
        if (message) {
          sendWSMessage(ws, message);
        }
        return;
      }
      sendWSMessage(ws, data);
    } catch (err) {
      console.log(err);
    }
  });
});
