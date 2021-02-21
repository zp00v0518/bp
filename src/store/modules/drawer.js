const drawer = {
  state: {
    show: false
  },
  mutations: {
    SHOW_DRAWER(state) {
      state.show = true;
    },
    HIDE_DRAWER(state) {
      state.show = false;
    }
  },
  actions: {}
};

export default drawer;
