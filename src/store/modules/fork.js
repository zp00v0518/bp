const fork = {
  state: {
    current: [],
    previous: []
  },
  mutations: {
    SET_CURRENT_FORK(state, payload = []) {
      state.current = sortingByMarga(forkAdapter(payload));
    },
    SET_PREVIOUS_FORK(state, payload = []) {
      state.previous = sortingByMarga(forkAdapter(payload));
    }
  },
  actions: {
    async GET_PREVIOUS_FORK(context, api) {
      const response = await api.get({ type: '/getPreviousFork' });
      if (!response.data) return;
      context.commit('SET_PREVIOUS_FORK', response.data.result);
    }
  }
};

function forkAdapter(arr) {
  const result = [];
  arr.forEach((item) => {
    const { command_1, command_2, created_at, eventDate } = item;
    item.fork.forEach((fork) => {
      const template = {
        command_1,
        command_2,
        eventDate,
        created_at
      };
      const r = Object.assign(fork, template);
      result.push(r);
    });
  });

  return result;
}

function sortingByMarga(arr) {
  arr.sort((a, b) => {
    if (a.marga > b.marga) return -1;
    if (a.marga < b.marga) return 1;
    0;
  });
  return arr;
}
export default fork;
