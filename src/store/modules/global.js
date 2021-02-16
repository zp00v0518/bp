const global = {
  state: {
    server: {
      connect: false
    }
  },
  mutations: {
    SET_SERVER_CONNECT(state, flag) {
      state.server.connect = flag;
    }
  },
  actions: {}
};

export default global;
