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
          meta: {
            title: '用户管理',
          },
          children: [
            {
              path: 'list',
              meta: {
                title: '列表',
                btnPermission: [
                  {
                    title: '编辑用户',
                    value: '/sys/user/list/editUser',
                  },
                  {
                    title: '新增用户',
                    value: '/sys/user/list/addUser',
                  },
                ],
              },
              component: () => import(/* webpackChunkName: "v-user" */ '../view/manage/sys/user/list/index.vue'),
            },
            {
              path: 'edit',
              meta: {
                title: '详情',
                btnPermission: [
                  {
                    title: '分配客户',
                    value: '/sys/user/edit/distirbuteCus',
                  },
                  {
                    title: '组织设置',
                    value: '/sys/user/edit/setDept',
                  },
                  {
                    title: '用户设置',
                    value: '/sys/user/edit/setUser',
                  },
                ],
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
      redirect: 'customer/cus',
      meta: {
        title: '客户管理',
      },
      children: [
        {
          path: 'cus',
          component: RouterView,
          redirect: 'cus/list',
          meta: {
            title: '客户',
          },
          children: [
            {
              path: 'list',
              meta: {
                title: '列表',
              },
              component: () => import(/* webpackChunkName: "v-customer" */ '../view/manage/customer/cus/list/index.vue'),
            },
            {
              path: 'edit',
              meta: {
                title: '详情',
              },
              component: () => import(/* webpackChunkName: "v-edit" */ '../view/manage/customer/cus/edit/index.vue'),
            },
          ],
        },
        {
          path: 'balance',
          component: RouterView,
          redirect: 'balance/list',
          meta: {
            title: '余额管理',
          },
          children: [
            {
              path: 'list',
              meta: {
                title: '列表',
              },
              component: () => import(/* webpackChunkName: "v-balance" */ '../view/manage/customer/balance/list/index.vue'),
            },
            {
              path: 'record',
              meta: {
                title: '记录',
              },
              component: () => import(/* webpackChunkName: "v-record" */ '../view/manage/customer/balance/record/index.vue'),
            },
          ],
        },
        {
          path: 'contract',
          component: RouterView,
          redirect: 'contract/list',
          meta: {
            title: '合同管理',
          },
          children: [
            {
              path: 'list',
              meta: {
                title: '列表',
              },
              component: () => import(/* webpackChunkName: "v-contract" */ '../view/manage/customer/contract/list/index.vue'),
            },
            {
              path: 'edit',
              meta: {
                title: '详情',
              },
              component: () => import(/* webpackChunkName: "v-edit" */ '../view/manage/customer/contract/edit/index.vue'),
            },
          ],
        },
        {
          path: 'account',
          component: RouterView,
          redirect: 'account/list',
          meta: {
            title: '客户账号管理',
          },
          children: [
            {
              path: 'list',
              meta: {
                title: '列表',
              },
              component: () => import(/* webpackChunkName: "v-account" */ '../view/manage/customer/account/list/index.vue'),
            },
            {
              path: 'edit',
              meta: {
                title: '详情',
              },
              component: () => import(/* webpackChunkName: "v-edit" */ '../view/manage/customer/account/edit/index.vue'),
            },
          ],
        },
      ],
    },
    {
      path: 'hroCompany',
      component: RouterView,
      redirect: 'hroCompany/hro',
      meta: {
        title: 'HRO企业管理',
      },
      children: [
        {
          path: 'hro',
          meta: {
            title: 'hro企业',
          },
          redirect: 'hro/list',
          component: RouterView,
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
      ],
    },
    {
      path: 'workOrder',
      component: RouterView,
      redirect: 'workOrder/order',
      meta: {
        title: '工单管理',
      },
      children: [
        {
          path: 'order',
          component: RouterView,
          redirect: 'order/list',
          meta: {
            title: '工单管理',
          },
          children: [
            {
              path: 'list',
              meta: {
                title: '列表',
              },
              component: () => import(/* webpackChunkName: "v-order" */ '../view/manage/workOrder/order/list/index.vue'),
            },
            {
              path: 'edit',
              meta: {
                title: '详情',
              },
              component: () => import(/* webpackChunkName: "v-edit" */ '../view/manage/workOrder/order/edit/index.vue'),
            },
          ],
        },
        {
          path: 'check',
          component: RouterView,
          redirect: 'check/list',
          meta: {
            title: '工单审核',
          },
          children: [
            {
              path: 'list',
              meta: {
                title: '列表',
              },
              component: () => import(/* webpackChunkName: "v-check" */ '../view/manage/workOrder/check/list/index.vue'),
            },
            {
              path: 'edit',
              meta: {
                title: '详情',
              },
              component: () => import(/* webpackChunkName: "v-edit" */ '../view/manage/workOrder/check/edit/index.vue'),
            },
          ],
        },
      ],
    },
    {
      path: 'employee',
      component: RouterView,
      redirect: 'employee/emp',
      meta: {
        title: '灵工管理',
      },
      children: [
        {
          path: 'emp',
          meta: {
            title: '灵工',
          },
          redirect: 'emp/list',
          component: RouterView,
          children: [
            {
              path: 'list',
              meta: {
                title: '列表',
              },
              component: () => import(/* webpackChunkName: "v-employee" */ '../view/manage/employee/list/index.vue'),
            },
            {
              path: 'edit',
              meta: {
                title: '详情',
              },
              component: () => import(/* webpackChunkName: "v-edit" */ '../view/manage/employee/edit/index.vue'),
            },
          ],
        },
      ],
    },
    {
      path: 'settle',
      component: RouterView,
      redirect: 'settle/service',
      meta: {
        title: '结算管理',
      },
      children: [
        {
          path: 'service',
          component: RouterView,
          redirect: 'service/list',
          meta: {
            title: '服务报酬',
          },
          children: [
            {
              path: 'list',
              meta: {
                title: '列表',
              },
              component: () => import(/* webpackChunkName: "v-service" */ '../view/manage/settle/service/list/index.vue'),
            },
          ],
        },
      ],
    },
    {
      path: 'taskManage',
      component: RouterView,
      redirect: 'taskManage/task',
      meta: {
        title: '任务管理',
      },
      children: [
        {
          path: 'task',
          meta: {
            title: '任务',
          },
          redirect: 'task/list',
          component: RouterView,
          children: [
            {
              path: 'list',
              meta: {
                title: '列表',
              },
              component: () => import(/* webpackChunkName: "v-task" */ '../view/manage/taskManage/task/list/index.vue'),
            },
            {
              path: 'edit',
              meta: {
                title: '详情',
              },
              component: () => import(/* webpackChunkName: "v-edit" */ '../view/manage/taskManage/task/edit/index.vue'),
            },
            {
              path: 'assign',
              meta: {
                title: '指派任务',
              },
              component: () => import(/* webpackChunkName: "v-assgin" */ '../view/manage/taskManage/task/assign/index.vue'),
            },
          ],
        },
        {
          path: 'taskPool',
          meta: {
            title: '任务池',
          },
          redirect: 'taskPool/list',
          component: RouterView,
          children: [
            {
              path: 'list',
              meta: {
                title: '列表',
              },
              component: () => import(/* webpackChunkName: "v-task" */ '../view/manage/taskManage/taskPool/list/index.vue'),
            },
            {
              path: 'edit',
              meta: {
                title: '详情',
              },
              component: () => import(/* webpackChunkName: "v-edit" */ '../view/manage/taskManage/taskPool/edit/index.vue'),
            },
            {
              path: 'assign',
              meta: {
                title: '指派任务',
              },
              component: () => import(/* webpackChunkName: "v-assgin" */ '../view/manage/taskManage/taskPool/assign/index.vue'),
            },
          ],
        },
      ],
    },
    {
      path: 'report',
      component: RouterView,
      redirect: 'report/company',
      meta: {
        title: '报表管理',
      },
      children: [
        {
          path: 'company',
          meta: {
            title: '入驻企业报表',
          },
          component: () => import(/* webpackChunkName: "v-company" */ '../view/manage/report/company/index.vue'),
        },
        {
          path: 'emp',
          meta: {
            title: '入驻灵工报表',
          },
          component: () => import(/* webpackChunkName: "v-company" */ '../view/manage/report/company/index.vue'),
        },
        {
          path: 'order',
          meta: {
            title: '接单量报表',
          },
          component: () => import(/* webpackChunkName: "v-company" */ '../view/manage/report/company/index.vue'),
        },
        {
          path: 'bill',
          meta: {
            title: '日流水报表',
          },
          component: () => import(/* webpackChunkName: "v-company" */ '../view/manage/report/company/index.vue'),
        },
      ],
    },
  ],
}];
const routes = [
  ...asyncRoutes,
  ...whiteListRoutes,
  {
    path: '/404',
    component: () => import(/* webpackChunkName: "v-404" */ '../view/404/index.vue'),
    meta: {
      isRight: true,
    },
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
