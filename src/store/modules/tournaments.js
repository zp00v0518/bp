const tournaments = {
  state: {
    baseTournaments: {}
  },
  mutations: {
    SET_BASE_TOURNAMENT(state, payload = {}) {
      state.baseTournaments = payload;
    },
    ADD_TOURNAMENT_TO_LIST(state, tour = {}) {
      const sport = tour.name_sport;
      if (!state.baseTournaments[sport]) state.baseTournaments[sport] = [];
      state.baseTournaments[sport].push(tour);
    }
  },
  actions: {
    async GET_BASE_TOURNAMENT(context, api) {
      if (api.wsInstance.readyState !== 1) return 'API not ready';
      const response = await api.get({ type: '/getAppTournaments' });
      const { data } = response;
      if (!data) return;
      const result = {};
      data.forEach((item) => {
        const sport = item.sport_name;
        if (!result[sport]) result[sport] = [];
        result[sport].push(item);
      });
      context.commit('SET_BASE_TOURNAMENT', result);
    }
  }
};

export default tournaments;
