const GETlist = {
  app: '/app',
  login: '/'
};

const GETroutes = {
  [GETlist.app]: () => {},
  [GETlist.login]: () => {}
};

module.exports = { GETroutes, GETlist };
