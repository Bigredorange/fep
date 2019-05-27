const states = {
  routes: [],
  btns: [],
};

const mutations = {
  RESET(state) {
    state.routes = [];
    state.routes = [];
  },
  SET_routes(state, routes) {
    state.routes = routes;
  },
  SET_btns(state, btns) {
    state.btns = btns;
  },
};

const actions = {
  GenerateRoutes({ commit }, resourcesList) {
    // const curRoutes = [];
    const btns = [];
    const getMatchRoutes = (routes) => {
      routes.forEach((route) => {
        if (route.type === 1) {
          btns.push(route.code);
        } else {
          const meta = {
            title: '',
          };
          route.meta = meta;
          route.meta.title = route.name;
          route.path = route.code;
          if (route.children.length >= 1) {
            getMatchRoutes(route.children);
          }
        }
        commit('SET_btns', btns);
        commit('SET_routes', routes);
      });
    };
    getMatchRoutes(resourcesList);
  },
};
export default {
  state: states,
  mutations,
  actions,
  namespaced: true,
};
