const tournamet = {
  state: {
    baseTournaments: []
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
			const {data} = response;
			console.log(response);
	
    }
  }
};

export default tournamet;
