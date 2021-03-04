const menu = {
  state: {
    content: []
  },
  mutations: {
    SET_MENU_CONTENT(state, content = []) {
      state.content = content;
    }
  },
  actions: {}
};

export default menu;
