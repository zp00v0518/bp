const global = {
  state: {
    server: {
      connect: false
    },
    bkList: {}
  },
  mutations: {
    SET_SERVER_CONNECT(state, flag) {
      state.server.connect = flag;
    },
    SET_BK_LIST(state, payload = {}) {
      state.bkList = payload;
    }
  },
  actions: {
    async GET_BK_LIST(context, api) {
      const response = await api.get({ type: '/get_bk_list' });
      const { list } = response.data;
      const result = {};
      list.forEach((item) => {
        result[item.id] = item;
      });
      context.commit('SET_BK_LIST', result);
    }
  }
};

export default global;
