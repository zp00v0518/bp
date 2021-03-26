const fork = {
  state: {
    current: []
  },
  mutations: {
    SET_CURRENT_FORK(state, payload = []) {
      state.current = sortingByMarga(forkAdapter(payload));
      // state.current.length = 2;
    }
  },
  actions: {}
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
