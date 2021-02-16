require('./backend/wsServer/wsServer.js');
require('dotenv').config();
const http = require('http');
const config = require('./config');
const router = require('./backEnd/router');

class Server {
  init(port) {
    this.server = http.createServer();
    this.server.listen(port, () => {
      console.log(new Date().toLocaleString());
      console.log(`Сервер запущен по адресу http://localhost:${port}`);
    });
  }

  on(event, callback) {
    this.server.on(event, callback);
  }
}

const server = new Server();
server.init(config.server.port.http);
server.on('request', (req, res) => {
  if (config.server.ready_to_work) {
    const method = req.method;
    if (method === 'GET') {
      router.getMethodHandler(req, res, __dirname);
    }
    else if (method === 'POST') {
    router.postMethodHandler(req, res);
    }
    else {
      res.writeHead(200, { 'Content-Type': 'text/plain' });
      res.end('Сервер не может удовлетворить Ваши запросы');
    }
  } else {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end('Сервер не готов, поробуйте немного позже');
  }
});
