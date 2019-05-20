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
      noLoginRequired: true,
      isRight: true,
    },
  },
];
const asyncRoutes = [{
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
          meta: {
            title: '组织架构',
          },
          component: () => import(/* webpackChunkName: "v-org" */ '../view/manage/sys/org/index.vue'),
        },
        {
          path: 'role',
          meta: {
            title: '角色管理',
          },
          component: () => import(/* webpackChunkName: "v-role" */ '../view/manage/sys/role/index.vue'),
        },
        {
          path: 'authority',
          meta: {
            title: '权限管理',
          },
          component: () => import(/* webpackChunkName: "v-authority" */ '../view/manage/sys/authority/index.vue'),
        },
        {
          path: 'user',
          component: RouterView,
          redirect: 'user/list',
          icon: 'sys',
          meta: {
            title: '用户管理',
          },
          children: [
            {
              path: 'list',
              meta: {
                title: '列表',
              },
              component: () => import(/* webpackChunkName: "v-user" */ '../view/manage/sys/user/list/index.vue'),
            },
            {
              path: 'edit',
              meta: {
                title: '详情',
              },
              component: () => import(/* webpackChunkName: "v-edit" */ '../view/manage/sys/user/edit/index.vue'),
            },
          ],
        },
        {
          path: 'dictionary',
          meta: {
            title: '数据字典',
          },
          component: () => import(/* webpackChunkName: "v-dictionary" */ '../view/manage/sys/dictionary/index.vue'),
        },
        {
          path: 'protocol',
          meta: {
            title: '协议管理',
          },
          component: () => import(/* webpackChunkName: "v-protocol" */ '../view/manage/sys/protocol/index.vue'),
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
            title: '列表',
          },
          component: () => import(/* webpackChunkName: "v-customer" */ '../view/manage/customer/list/index.vue'),
        },
        {
          path: 'edit',
          meta: {
            title: '新增',
          },
          component: () => import(/* webpackChunkName: "v-edit" */ '../view/manage/customer/edit/index.vue'),
        },
      ],
    },
    {
      path: 'hroCompany',
      component: RouterView,
      redirect: 'hroCompany/list',
      icon: 'sys',
      meta: {
        title: 'HRO企业管理',
      },
      children: [
        {
          path: 'list',
          meta: {
            title: '列表',
          },
          component: () => import(/* webpackChunkName: "v-hroCompany" */ '../view/manage/hroCompany/list/index.vue'),
        },
        {
          path: 'edit',
          meta: {
            title: '详情',
          },
          component: () => import(/* webpackChunkName: "v-edit" */ '../view/manage/hroCompany/edit/index.vue'),
        },
      ],
    },
    // {
    //   path: 'home',
    //   component: () => import(/* webpackChunkName: "v-home" */ '../view/manage/home/index.vue'),
    //   meta: {
    //     title: '首页',
    //   },
    // },
  ],
}];
const routes = [
  ...asyncRoutes,
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
  asyncRoutes,
};
