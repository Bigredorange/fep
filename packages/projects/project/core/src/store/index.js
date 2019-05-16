import Vue from 'vue';
import Vuex from 'vuex';
import cookie from 'js-cookie';
import $utils from '../core/utils';
import options from './modules/options';
import socketManage from './modules/socketManage';

Vue.use(Vuex);

const vuex = new Vuex.Store({
  modules: {
    options,
    socketManage,
  },
  state: {
    tableHeight: null, // 页面高度
    fepUserInfo: {}, // 用户信息
    permissionList: [], // 权限路径列表
    messageCount: 0, // 系统消息数
  },
  mutations: {
    reset(state) {
      state.fepUserInfo = {};
      state.permissionList = [];
      state.messageCount = 0;
    },
    setFepUserInfo(state, fepUserInfo) {
      state.fepUserInfo = fepUserInfo;
    },
    setTable(state, height) {
      state.tableHeight = height - 200;
    },
    setMessageCount(state, count) {
      state.messageCount = count;
    },
    setPermissionList(state, tree) {
      // 根据后台返回数据获取子路由
      const pushRoute = (routes, container = []) => {
        routes.forEach((item) => {
          if (item.children) {
            pushRoute(item.children, container);
          }
          container.push(item.path);
        });
        return container;
      };
      // 根据系统名称获取对应菜单列表
      const permissionList = pushRoute(tree);
      state.permissionList = permissionList;
    },
  },
  actions: {
    logout({ commit }) {
      commit('reset');
      commit('socketManage/reset');
      commit('reset/reset');
      sessionStorage.clear();
      cookie.remove(sessionStorage.hroTokenName);
      window.location.replace(Vue.prototype.$config.entryLink);
    },
    getMessageCount({ state, commit }) { // 获取站内信数量
      return Vue.prototype.$api.remindUnReadNum({
        receiverSys: 1,
        receiverId: state.fepUserInfo.id,
      }).then((count) => {
        commit('setMessageCount', Number(count));
      });
    },
    getUserInfo({ commit }) {
      if (sessionStorage.fepUserInfo) {
        commit('setFepUserInfo', JSON.parse(sessionStorage.fepUserInfo));
        return Promise.resolve();
      }
      return Vue.prototype.$api.getUserInfo().then((res) => {
        // 缓存用户信息
        sessionStorage.fepUserInfo = JSON.stringify(res);
        commit('setFepUserInfo', res);
      });
    },
    getPermissionList({ commit }) {
      return Vue.prototype.$api.userGetUserResourceList({
        privilege: 'CBAS', // TEMP: 后期移除
      }).then((res) => {
        // 不缓存用户权限
        commit('setPermissionList', res);
      });
    },
    getClientHeight({ commit }) {
      function setTable() {
        // 实时获取页面高度
        commit('setTable', document.body.clientHeight);
      }
      setTable();
      window.onresize = $utils.debounce(setTable, 50, true);
    },
  },
  getters: {},
});

Vue.prototype.$store = vuex;
Vue.$store = vuex;

export default vuex;
