import Vue from 'vue';
import { Notification, MessageBox } from 'element-ui';
import $router from '../../router';
import $utils from '../../core/utils';

export default {
  namespaced: true,
  state: {
    socket: null, // socket实例
    heartBeat: 60e3, // 断开时重连的心跳
    reconnectTimer: null, // 重连的计时器
  },
  mutations: {
    reset(state) {
      if (state.reconnectTimer) {
        clearTimeout(state.reconnectTimer);
      } else if (state.socket) {
        state.socket.close();
        state.socket = null;
      }
    },
    setSocket(state, instance) {
      state.socket = instance;
    },
    setReconnectTimer(state, timer) {
      state.reconnectTimer = timer;
    },
  },
  actions: {
    onopen({ commit }) {
      console.log('onopen');
      commit('setReconnectTimer', null);
    },
    onmessage(ctx, { data }) {
      const res = JSON.parse(data);
      console.log('onmessage', res);
      const { msgType, text } = res;
      if (msgType === 'TEST' || msgType === 'NORMAL_MSG') {
        Notification({
          type: 'info',
          title: '消息',
          message: text,
          duration: 0,
          onClick() {
            $router.push('/message');
            this.close();
          },
        });
      } else if (msgType === 'ALERT_MSG') {
        MessageBox.alert(text, '提示');
      }
    },
    onerror() {
      console.log('onerror');
    },
    onclose({
      state,
      commit,
      dispatch,
      rootState,
    }) {
      console.log('onclose');
      if (!rootState.fepUserInfo.account) return;
      const timer = setTimeout(() => {
        dispatch('init');
      }, state.heartBeat);
      commit('setReconnectTimer', timer);
    },
    init({ commit, dispatch, rootState }) {
      try {
        const socket = new WebSocket(`${Vue.prototype.$config.messageSocket}/${rootState.fepUserInfo.account}`);
        socket.onopen = () => dispatch('onopen');
        socket.onmessage = data => dispatch('onmessage', data);
        socket.onclose = () => dispatch('onclose');
        socket.onerror = () => dispatch('onerror');
        commit('setSocket', socket);
      } catch (e) {
        console.log(e);
      }
    },
    broadcast({ state }, content) { // 广播
      return state.socket.send(JSON.stringify({
        date: $utils.formatDate(Date.now()),
        fromUserId: 'SYS',
        msgType: 'ALERT_MSG',
        text: content,
      }));
    },
    test({ state, rootState }) { // 用于测试
      state.socket.send(JSON.stringify({
        date: $utils.formatDate(Date.now()),
        fromUserId: 'SYS',
        msgType: 'TEST',
        text: '测试',
        toUserId: rootState.fepUserInfo.account,
      }));
    },
  },
};
