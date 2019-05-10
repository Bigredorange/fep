import Vue from 'vue';
import App from './App.vue';
import store from './store';
import router from './router';
import Router from './router/Router';
import Plugin from './core/plugin';
import './style/index.scss';

module.exports = {
  init(subModules) {
    const {
      config,
      component,
      ...routes
    } = subModules;
    // 初始化配置
    Vue.prototype.$config = config;
    // 初始化插件
    Vue.use(Plugin);
    // 初始化全局组件
    Vue.use(component);
    // 初始化路由
    Vue.use(Router, routes);
    // 启动
    return new Vue({
      el: '#app',
      router,
      store,
      render: h => h(App),
    });
  },
};
