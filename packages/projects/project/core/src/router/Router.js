import setHooks from './plugins/setHooks';
import setDynamicRoute from './plugins/setDynamicRoute';

export default {
  install(Vue, subModules) {
    // 设置全局钩子
    setHooks();
    // 动态设置路由
    setDynamicRoute(subModules);
  },
};
