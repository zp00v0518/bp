const sportTypes = {
  state: {
    sportTypes: []
  },
  mutations: {
    SET_SPORT_TYPES(state, payload = {}) {
      state.sportTypes = payload;
    }
  },
  actions: {
    async GET_SPORT_TYPES(context, api) {
      if (api.wsInstance.readyState !== 1) return 'API not ready';
      const response = await api.get({ type: '/getListSportCategory' });
      console.log(response);
			const {data} = response;
			if (!data) return;
      context.commit('SET_SPORT_TYPES', data);
    }
  }
};

export default sportTypes;
