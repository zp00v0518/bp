const WS = require('ws');
const config = require('../../config');
const handlers = require('./handlers');

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

wsServer.on('connection', (ws) => {
  ws.on('close', function() {});
  ws.on('message', (message) => {
    let data;
    try {
      data = JSON.parse(message);
      const { type } = data;
      if (handlers[type]) handlers[type](data, ws);
      return;
    } catch (err) {
      console.log(err);
    }
  });
});
