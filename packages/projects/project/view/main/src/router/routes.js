/**
 * 路由配置说明
 * @webpackChunkName 值为v-加路径名称
 * @param redirect 重定向路径，写在父级路由上
 * @param meta.title 标题名称
 * @param meta.hidden 在左侧菜单中是否显示当前路由
 * @param meta.noDropdown 在左侧菜单中是否显示子路由
 * @param meta.keepAlive 缓存子路由
 * @param meta.isRight 无需鉴权也可访问的路由
 */

const RouterView = {
  template: '<router-view></router-view>',
};
const whiteListRoutes = [
  {
    path: '/login',
    component: () => import(/* webpackChunkName: "v-login" */ '../view/login/index.vue'),
    meta: {
      // noLoginRequired: true,
      isRight: true,
    },
  },
];
const routes = [
  {
    path: '/manage',
    component: () => import(/* webpackChunkName: "v-manage" */ '../view/manage/index.vue'),
    children: [
      {
        path: 'sys',
        component: RouterView,
        redirect: 'sys/org',
        icon: 'sys',
        meta: {
          title: '系统管理',
        },
        children: [
          {
            path: 'org',
            // redirect: 'org',
            meta: {
              title: '组织架构',
            },
            component: () => import(/* webpackChunkName: "v-org" */ '../view/manage/sys/org/index.vue'),
          },
          {
            path: 'org2',
            // redirect: 'org',
            meta: {
              title: '组织架构2',
            },
            component: () => import(/* webpackChunkName: "v-org" */ '../view/manage/sys/org/index.vue'),
          },
        ],
      },
      {
        path: 'customer',
        component: RouterView,
        redirect: 'customer/list',
        icon: 'sys',
        meta: {
          title: '客户管理',
        },
        children: [
          {
            path: 'list',
            meta: {
              title: '列表1',
            },
            component: () => import(/* webpackChunkName: "v-customer" */ '../view/manage/customer/list/index.vue'),
          },
          {
            path: 'edit',
            meta: {
              title: '组织架构2',
            },
            component: () => import(/* webpackChunkName: "v-edit" */ '../view/manage/customer/edit/index.vue'),
          },
        ],
      },
    ],
  },
  ...whiteListRoutes,
  {
    path: '/404',
    component: () => import(/* webpackChunkName: "v-404" */ '../view/404/index.vue'),
  },
  {
    path: '/',
    redirect: '/login',
  },
  {
    path: '*',
    redirect: '/404',
  },
];

const staticRoutes = JSON.parse(JSON.stringify(routes));

module.exports = {
  routes,
  staticRoutes,
};
