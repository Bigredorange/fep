import Vue from 'vue';
import dictionary from './dictionary.json';
import $db from '../../core/localDatabase';

const initDictionary = {};
Object.keys(dictionary).forEach((key) => {
  // 写死的数据字典有value值
  initDictionary[key] = dictionary[key].value || [];
});

// const fetchKeys = []; // 记录已发起字典查询的key，防止重复查询字典

export default {
  namespaced: true,
  state: {
    signCompanys: [], // 签约公司列表
    mySignCompanys: [], // 所属签约公司列表
    ...initDictionary,
  },
  mutations: {
    reset(state) {
      state.signCompanys = [];
      state.mySignCompanys = [];
      Object.assign(state, initDictionary);
    },
    setOption(state, { key, value }) {
      state[key] = value;
    },
  },
  actions: {
    async init({ dispatch }) {
      // 获取所属签约公司
      // await dispatch('getMySignCompanys');
      // 获取所有签约公司
      await dispatch('getSignCompanys');
    },
    getSignCompanys({ state, commit }) {
      if (state.signCompanys.length) return Promise.resolve();
      return Vue.prototype.$api.signCompanyFindAll().then((res) => {
        commit('setOption', {
          key: 'signCompanys',
          value: res,
        });
      });
    },
    // getMySignCompanys({ state, commit }) {
    //   if (state.mySignCompanys.length) return Promise.resolve();
    //   return Vue.prototype.$api.signCompanyListAll().then((res) => {
    //     commit('setOption', {
    //       key: 'mySignCompanys',
    //       value: res,
    //     });
    //   });
    // },
    // getDataDictionary({ state, commit }, key) {
    //   if ((state[key] && state[key].length) || fetchKeys.includes(key)) return;
    //   fetchKeys.push(key);
    //   Vue.prototype.$api.codeDictionaryGetCodeDictionary({
    //     types: key,
    //   }).then((res) => {
    //     res.forEach((item) => {
    //       commit('setOption', {
    //         key: item.type,
    //         value: item.dataList || [],
    //       });
    //     });
    //   });
    // },
    setDefaultSignCompanyId({ state }) {
      if (!$db('signCompanyId')) {
        $db('signCompanyId', state.signCompanys[0].id);
      }
      if (!$db('mySignCompanyId') && state.mySignCompanys.length) {
        $db('mySignCompanyId', state.mySignCompanys[0].id);
      }
    },
  },
};
