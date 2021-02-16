const sports = require('./sports');
const time = require('./time');

const config = {
  time,
  server: {
    port: {
      http: process.env.PORT || 4000,
      ws: +process.env.PORT + 1 || 4001
    },
    ready_to_work: true
  },
  path: {
    baseFolder:'frontend',
    login: {
      folder: '/login',
      html: 'login.html'
    },
    app: {
      dev: {
        folder: '',
        html: 'dev.html'
      }
    }
  },
  cookieSize: 60,
  db: {
    name: 'bets'
  },
  collections: {
    commands: { name: 'commands' },
    events: { name: 'events' },
    users: { name: 'users' },
    sessions: { name: 'sessions' }
  },
  matchKey: {
    win1: 'w1',
    win2: 'w2',
    draw: 'x',
    win1_win2: 'w1_w2',
    win1_draw: 'w1_x',
    win2_draw: 'w2_x'
  },
  sports
};

module.exports = config;
