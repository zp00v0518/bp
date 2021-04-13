const tournaments = {
  state: {
    baseTournaments: {}
  },
  mutations: {
    SET_BASE_TOURNAMENT(state, payload = {}) {
      state.baseTournaments = payload;
    }
  },
  actions: {
    async GET_BASE_TOURNAMENT(context, api) {
      if (api.wsInstance.readyState !== 1) return 'API not ready';
      const response = await api.get({ type: '/getBaseTournaments' });
      const { data } = response;
      if (!data) return;
      const result = {};
      data.forEach((item) => {
        const sport = item.name_sport;
        if (!result[sport]) result[sport] = [];
        result[sport].push(item);
      });
      context.commit('SET_BASE_TOURNAMENT', result);
    }
  }
};

export default tournaments;
