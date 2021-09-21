const tournaments = {
  state: {
    baseTournaments: {}
  },
  mutations: {
    SET_APP_TOURNAMENT(state, payload = {}) {
      state.baseTournaments = payload;
    },
    ADD_TOURNAMENT_TO_LIST(state, tour = {}) {
      const sport = tour.name_sport;
      if (!state.baseTournaments[sport]) state.baseTournaments[sport] = [];
      state.baseTournaments[sport].unshift(tour);
    },
    REPLACE_NEW_TOURNAMENT(state, newTours) {
      const { baseTournaments } = state;
      newTours.forEach((tour) => {
        const { sport_name, name } = tour;
        const arr = baseTournaments[sport_name];
        const index = arr.findIndex((i) => i.name === name);
        arr[index] = tour;
      });
    }
  },
  actions: {
    async GET_APP_TOURNAMENT(context, api) {
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
      context.commit('SET_APP_TOURNAMENT', result);
    }
  }
};

export default tournaments;
