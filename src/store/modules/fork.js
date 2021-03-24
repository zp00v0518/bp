const fork = {
  state: {
    current: []
  },
  mutations: {
    SET_CURRENT_FORK(state, payload = []) {
      state.current = payload;
    }
  },
  actions: {}
};

export default fork;
