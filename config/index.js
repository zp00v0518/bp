const sports = require('./sports');
const time = require('./time');
const collections = require('./collections');
const matchKey = require('../parser/parseConfig/matchKey');

const config = {
  matchKey,
  time,
  server: {
    port: {
      http: process.env.PORT || 4000,
      ws: +process.env.PORT + 1 || 4001
    },
    ready_to_work: true
  },
  path: {
    baseFolder: 'frontend',
    login: {
      folder: '/login',
      html: 'login.html'
    },
    app: {
      dev: {
        folder: '',
        html: 'dev.html'
      },
      prod: {
        html: '/index.html',
        folder: '/app'
      }
    }
  },
  cookieSize: 60,
  db: {
    name: 'bets'
  },
  collections,
  sports
};

module.exports = config;
