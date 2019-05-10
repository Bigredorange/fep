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

const routes = [
  {
    path: '/',
    component: () => import(/* webpackChunkName: "v-main" */ '../view/index.vue'),
    redirect: '/login',
    children: [
      {
        path: '/login',
        component: () => import(/* webpackChunkName: "v-login" */ '../view/login/index.vue'),
        meta: {
          noLoginRequired: true,
        },
      },
      {
        path: '/sys',
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
            component: () => import(/* webpackChunkName: "v-org" */ '../view/sys/org/index.vue'),
          },
        ],
      },
    ],
  },
];

const staticRoutes = JSON.parse(JSON.stringify(routes));

module.exports = {
  routes,
  staticRoutes,
};
