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
                  {
                    title: '重置密码',
                    value: '/sys/user/list/resetPassword',
                  },
                ],
              },
              component: () => import(/* webpackChunkName: "v-user" */ '../view/manage/sys/user/list/index.vue'),
            },
            {
              path: 'edit',
              meta: {
                title: '新增/编辑',
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
      redirect: 'customer/account',
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
                btnPermission: [
                  {
                    title: '编辑客户',
                    value: '/customer/cus/list/editCus',
                  },
                  {
                    title: '新增客户',
                    value: '/customer/cus/list/addCus',
                  },
                  {
                    title: '查看客户详情',
                    value: '/customer/cus/list/viewCus',
                  },
                ],
              },
              component: () => import(/* webpackChunkName: "v-customer" */ '../view/manage/customer/cus/list/index.vue'),
            },
            {
              path: 'edit',
              meta: {
                title: '新增/编辑',
              },
              component: () => import(/* webpackChunkName: "v-edit" */ '../view/manage/customer/cus/edit/index.vue'),
            },
            {
              path: 'detail',
              meta: {
                title: '客户详情',
              },
              component: () => import(/* webpackChunkName: "v-customrDetail" */ '../view/manage/customer/cus/detail/index.vue'),
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
                btnPermission: [
                  {
                    title: '充值',
                    value: '/customer/balance/list/recharge',
                  },
                  {
                    title: '查看记录',
                    value: '/customer/balance/list/viewRecord',
                  },
                ],
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
                btnPermission: [
                  {
                    title: '编辑合同',
                    value: '/customer/contract/list/editContract',
                  },
                  {
                    title: '新增合同',
                    value: '/customer/contract/list/addContract',
                  },
                  {
                    title: '查看合同',
                    value: '/customer/contract/list/viewContract',
                  },
                ],
              },
              component: () => import(/* webpackChunkName: "v-contract" */ '../view/manage/customer/contract/list/index.vue'),
            },
            {
              path: 'edit',
              meta: {
                title: '新增/编辑',
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
                btnPermission: [
                  {
                    title: '编辑客户账号',
                    value: '/customer/account/list/editCusAccount',
                  },
                  {
                    title: '新增客户账号',
                    value: '/customer/account/list/addCusAccount',
                  },
                  {
                    title: '重置密码',
                    value: '/customer/account/list/updatePassword',
                  },
                ],
              },
              component: () => import(/* webpackChunkName: "v-account" */ '../view/manage/customer/account/list/index.vue'),
            },
            {
              path: 'edit',
              meta: {
                title: '新增/编辑',
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
                btnPermission: [
                  {
                    title: '编辑HRO企业',
                    value: '/hroCompany/hro/list/editHRO',
                  },
                  {
                    title: '新增HRO企业',
                    value: '/hroCompany/hro/list/addHRO',
                  },
                ],
              },
              component: () => import(/* webpackChunkName: "v-hroCompany" */ '../view/manage/hroCompany/list/index.vue'),
            },
            {
              path: 'edit',
              meta: {
                title: '新增/编辑',
              },
              component: () => import(/* webpackChunkName: "v-edit" */ '../view/manage/hroCompany/edit/index.vue'),
            },
            {
              path: 'authentic',
              meta: {
                title: '企业认证',
              },
              component: () => import(/* webpackChunkName: "v-authentic" */ '../view/manage/hroCompany/authentic/index.vue'),
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
                btnPermission: [
                  {
                    title: '编辑合同',
                    value: '/hroCompany/contract/list/editContract',
                  },
                  {
                    title: '新增合同',
                    value: '/hroCompany/contract/list/addContract',
                  },
                  {
                    title: '查看合同',
                    value: '/hroCompany/contract/list/viewContract',
                  },
                ],
              },
              component: () => import(/* webpackChunkName: "v-contract" */ '../view/manage/hroCompany/contract/list/index.vue'),
            },
            {
              path: 'edit',
              meta: {
                title: '新增/编辑',
              },
              component: () => import(/* webpackChunkName: "v-edit" */ '../view/manage/hroCompany/contract/edit/index.vue'),
            },
          ],
        },
      ],
    },
    {
      path: 'hroCompanyDetail',
      component: RouterView,
      redirect: 'hroCompanyDetail/hroDetail',
      meta: {
        title: 'HRO企业',
      },
      children: [
        {
          path: 'hroDetail',
          meta: {
            title: 'hro详情',
          },
          component: () => import(/* webpackChunkName: "v-edit" */ '../view/manage/hroCompany/edit/index.vue'),
        },
        {
          path: 'authentic',
          meta: {
            title: '企业认证',
          },
          component: () => import(/* webpackChunkName: "v-authentic" */ '../view/manage/hroCompany/authentic/index.vue'),
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
                title: '新增/编辑',
              },
              component: () => import(/* webpackChunkName: "v-edit" */ '../view/manage/workOrder/order/edit/index.vue'),
            },
            {
              path: 'detail',
              meta: {
                title: '工单详情',
              },
              component: () => import(/* webpackChunkName: "v-detail" */ '../view/manage/workOrder/detail/index.vue'),
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
              path: 'detail',
              meta: {
                title: '工单详情',
              },
              component: () => import(/* webpackChunkName: "v-detail" */ '../view/manage/workOrder/detail/index.vue'),
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
                btnPermission: [
                  {
                    title: '编辑灵工',
                    value: '/employee/emp/list/editEmp',
                  },
                  {
                    title: '新增灵工',
                    value: '/employee/emp/list/addEmp',
                  },
                  {
                    title: '查看灵工',
                    value: '/employee/emp/list/viewEmp',
                  },
                ],
              },
              component: () => import(/* webpackChunkName: "v-employee" */ '../view/manage/employee/list/index.vue'),
            },
            {
              path: 'edit',
              meta: {
                title: '新增/编辑',
              },
              component: () => import(/* webpackChunkName: "v-edit" */ '../view/manage/employee/edit/index.vue'),
            },
            {
              path: 'detail',
              meta: {
                title: '灵工详情',
              },
              component: () => import(/* webpackChunkName: "v-empDetail" */ '../view/manage/employee/detail/index.vue'),
            },
          ],
        },
        {
          path: 'contract',
          component: () => import(/* webpackChunkName: "v-contract" */ '../view/manage/employee/contract/index.vue'),
          meta: {
            title: '合同记录',
          },
        },
      ],
    },
    {
      path: 'eSignFee',
      component: RouterView,
      redirect: 'eSignFee/fee',
      meta: {
        title: '电子签约费用',
      },
      children: [
        {
          path: 'standard',
          component: () => import(/* webpackChunkName: "v-standard" */ '../view/manage/eSignFee/standard/index.vue'),
          meta: {
            title: '签约费用标准',
          },
        },
        {
          path: 'fee',
          meta: {
            title: '签约费用',
          },
          redirect: 'fee/list',
          component: RouterView,
          children: [
            {
              path: 'list',
              meta: {
                title: '列表',
                btnPermission: [
                  {
                    title: '充值',
                    value: '/eSignFee/fee/list/recharge',
                  },
                ],
              },
              component: () => import(/* webpackChunkName: "v-fee" */ '../view/manage/eSignFee/fee/list/index.vue'),
            },
            {
              path: 'detail',
              meta: {
                title: '签约费用详情',
              },
              component: () => import(/* webpackChunkName: "v-feeDetail" */ '../view/manage/eSignFee/fee/detail/index.vue'),
            },
          ],
        },
      ],
    },
    {
      path: 'settle',
      component: RouterView,
      redirect: 'settle/cusService',
      meta: {
        title: '结算管理',
      },
      children: [
        {
          path: 'service',
          component: RouterView,
          redirect: 'service/list',
          meta: {
            title: '灵工服务结算',
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
        {
          path: 'cusService',
          meta: {
            title: '客户服务结算',
            btnPermission: [
              {
                title: '批量发送确认',
                value: '/settle/cusService/batchSend',
              },
              {
                title: '导出',
                value: '/settle/cusService/export',
              },
              {
                title: '批量确认',
                value: '/settle/cusService/batchConfirm',
              },
              {
                title: '发送确认',
                value: '/settle/cusService/send',
              },
              {
                title: '确认',
                value: '/settle/cusService/confirm',
              },
              {
                title: '编辑',
                value: '/settle/cusService/edit',
              },
            ],
          },
          component: () => import(/* webpackChunkName: "v-cusService" */ '../view/manage/settle/cusService/index.vue'),
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
                btnPermission: [
                  {
                    title: '所有操作按钮',
                    value: '/taskManage/task/list/all',
                  },
                  {
                    title: '指派任务',
                    value: '/taskManage/task/list/assignWok',
                  },
                  {
                    title: '分派任务池',
                    value: '/taskManage/task/list/distributeWok',
                  },
                  {
                    title: '撤回任务',
                    value: '/taskManage/task/list/revokeWok',
                  },
                  {
                    title: '完成任务',
                    value: '/taskManage/task/list/finshWok',
                  },
                ],
              },
              component: () => import(/* webpackChunkName: "v-task" */ '../view/manage/taskManage/task/list/index.vue'),
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
                btnPermission: [
                  {
                    title: '所有操作按钮',
                    value: '/taskManage/taskPool/list/all',
                  },
                  {
                    title: '指派任务',
                    value: '/taskManage/taskPool/list/assignWok',
                  },
                  {
                    title: '撤回任务',
                    value: '/taskManage/taskPool/list/revokeWok',
                  },
                  {
                    title: '完成任务',
                    value: '/taskManage/taskPool/list/finshWok',
                  },
                ],
              },
              component: () => import(/* webpackChunkName: "v-task" */ '../view/manage/taskManage/taskPool/list/index.vue'),
            },
            {
              path: 'edit',
              meta: {
                title: '新增/编辑',
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
          component: () => import(/* webpackChunkName: "v-company" */ '../view/manage/report/employee/index.vue'),
        },
        {
          path: 'order',
          meta: {
            title: '接单量报表',
          },
          component: () => import(/* webpackChunkName: "v-company" */ '../view/manage/report/order/index.vue'),
        },
        {
          path: 'bill',
          meta: {
            title: '日流水报表',
          },
          component: () => import(/* webpackChunkName: "v-company" */ '../view/manage/report/bill/index.vue'),
        },
      ],
    },
    {
      path: 'sign',
      component: RouterView,
      redirect: 'sign/template',
      meta: {
        title: '签约管理',
      },
      children: [
        {
          path: 'seal',
          component: RouterView,
          redirect: 'seal/list',
          meta: {
            title: '印章管理',
          },
          children: [
            {
              path: 'list',
              meta: {
                title: '列表',
              },
              component: () => import(/* webpackChunkName: "v-seal" */ '../view/manage/sign/seal/list/index.vue'),
            },
            {
              path: 'edit',
              meta: {
                title: '创建印章',
              },
              component: () => import(/* webpackChunkName: "v-edit" */ '../view/manage/sign/seal/edit/index.vue'),
            },
            {
              path: 'addManager',
              meta: {
                title: '添加人员',
              },
              component: () => import(/* webpackChunkName: "v-addManager" */ '../view/manage/sign/seal/addManager/index.vue'),
            },
          ],
        },
        {
          path: 'template',
          component: RouterView,
          redirect: 'template/list',
          meta: {
            title: '签约模板',
          },
          children: [
            {
              path: 'list',
              meta: {
                title: '列表',
              },
              component: () => import(/* webpackChunkName: "v-template" */ '../view/manage/sign/template/list/index.vue'),
            },
            {
              path: 'edit',
              meta: {
                title: '新增/编辑',
              },
              component: () => import(/* webpackChunkName: "v-edit" */ '../view/manage/sign/template/edit/index.vue'),
            },
            {
              path: 'setSeal',
              meta: {
                title: '设置盖章',
              },
              component: () => import(/* webpackChunkName: "v-setSeal" */ '../view/manage/sign/template/setSeal/index.vue'),
            },
          ],
        },
        {
          path: 'contract',
          component: RouterView,
          redirect: 'contract/list',
          meta: {
            title: '合同生成',
          },
          children: [
            {
              path: 'list',
              meta: {
                title: '列表',
              },
              component: () => import(/* webpackChunkName: "v-contract" */ '../view/manage/sign/contract/list/index.vue'),
            },
          ],
        },
        {
          path: 'signList',
          component: () => import(/* webpackChunkName: "v-signList" */ '../view/manage/sign/signList/index.vue'),
          meta: {
            title: '签约列表',
          },
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
    path: '/home',
    component: () => import(/* webpackChunkName: "v-home" */ '../view/manage/home/index.vue'),
    meta: {
      // isRight: true,
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
