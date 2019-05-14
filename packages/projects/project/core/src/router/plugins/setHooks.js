import Vue from 'vue';
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';
// import cookie from 'js-cookie';
import store from '../../store/index';
import router from '../index';
// import db from '../../core/localDatabase';

/**
 * 是否需要登录
 */
const needLogin = to => !to.meta.noLoginRequired;

/**
 * 是否存在登录凭证
 */
// const existToken = () => sessionStorage.hroTokenName && cookie.get(sessionStorage.hroTokenName);

/**
 * 验证路由权限
 */
const validateRight = (to) => {
  const isRight = to.meta && to.meta.isRight;
  return isRight || store.state.permissionList.includes(to.path);
};

/**
 * 初始化数据
 */
// let inited = false;
// const initData = async () => {
//   if (!inited) {
//     inited = true;
//     await Promise.all([
//       store.dispatch('getUserInfo'), // 初始化用户信息
//       store.dispatch('getPermissionList'), // 初始化用户权限列表
//       store.dispatch('options/init'), // 初始化可选项
//       store.dispatch('getClientHeight'), // 获取客户端高度
//     ]).catch(() => { // 初始化失败时显示刷新按钮
//       NProgress.done();
//       document.querySelector('#global-loading').style.display = 'none';
//       document.querySelector('#global-reload').style.display = 'block';
//       throw (new Error('init failed'));
//     });
//     store.dispatch('socketManage/init'); // 实时推送消息
//     db.init(store.state.hroUserinfo.account); // 初始化localStorage本地缓存
//     store.dispatch('options/setDefaultSignCompanyId'); // 初始化签约公司
//   }
//   store.dispatch('getMessageCount'); // 获取站内信数量
// };

/**
 * 设置标签标题
 */
const setTitle = (to) => {
  let { systemName } = Vue.prototype;
  systemName = '灵工平台';
  const title = to.matched.reduce((name, match) => {
    const subName = match.meta && match.meta.title;
    return subName ? `${name}-${subName}` : name;
  }, systemName);
  if (title) {
    document.title = title;
  } else {
    document.title = systemName;
  }
};

const setLoading = () => {
  document.querySelector('#global-loading').style.display = 'none';
};

export default () => {
  NProgress.configure({
    showSpinner: false,
  });

  router.beforeEach(async (to, from, next) => {
    NProgress.start();
    console.log(to.path);
    if (!needLogin(to)) { // 不需要登录
      next();
      return;
    }

    // if (!existToken()) { // 不存在登录凭证
    //   next(false);
    //   store.dispatch('logout');
    //   return;
    // }

    // await initData(); // 初始化数据

    if (validateRight(to)) { // 是否通过路由权限验证
      next();
    } else {
      // next(false);
      next();
      // NProgress.done();
    }
  });

  router.afterEach((to) => {
    NProgress.done();
    setTitle(to);
    setLoading();
  });
};
