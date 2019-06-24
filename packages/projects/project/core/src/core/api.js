import $utils from './utils';

const {
  get,
  // post,
  // put,
  postForm,
  del,
  postJson,
  postBlob,
  getBlob,
  putJson,
} = require('./ajax');

const api = {
  // 1.1 登录
  login: args => postJson('login', args),
  // 1.2 获取验证码
  verificationCode: args => getBlob('kaptcha', args),
  // 1.3 获取用户信息
  getUserInfo: args => get('user/profile', args),
  // 1.4 获取账号列表
  getAccountList: args => get('user/accounts', args),
  // 1.5 添加用户
  addUser: args => postJson('user', args),
  // 1.6 修改用户
  updateUser: ({ id, ...arg }) => putJson(`user/${id}`, arg),
  // 1.7 根据ID查用户
  getUserById: ({ id, ...arg }) => get(`user/${id}`, arg),
  // 查询用户未拥有的客户
  getCustomerNotOwn: ({ id, ...arg }) => get(`user/${id}/customer/not_own`, arg),
  // 查询用户拥有的客户
  getCustomerOwn: ({ id, ...arg }) => get(`user/${id}/customer/own`, arg),
  // 分配客户给用户
  assignCustomer: ({ id, arr }) => postJson(`user/${id}/customer/assign`, arr),
  // 取消用户已分配的客户
  delAssginCustomer: ({ customerId, ...arg }) => del(`user/customer/assign/${customerId}`, arg),
  /*
    组织架构
  */
  // 2.1 查询企业的部门树
  getDepartTree: args => get('org/department/tree', args),
  // 2.2 添加部门
  addDepart: args => postJson('org/department', args),
  // 2.3 更新部门
  updateDepart: ({ id, ...arg }) => putJson(`org/department/${id}`, arg),
  // 2.4 删除部门
  delDepart: ({ id, ...arg }) => del(`org/department/${id}`, arg),
  // 2.5 查询部门
  getDepart: ({ id, ...arg }) => get(`org/department/${id}`, arg),
  // 2.6 查询用户个人部门树
  getUserDepartTree: args => get('org/department/tree/for_personal', args),
  // 查询我管理部门组织人员
  getUserDepartTreeById: args => get('org/department/user_dept_tree', args),
  /*
    角色管理
  */
  // 3.1 查询企业角色列表
  getAllRole: args => get('sys/role/list', args),
  // 3.2 添加角色
  addRole: args => postJson('sys/role', args),
  // 3.3 更新角色
  updateRole: ({ id, ...arg }) => putJson(`sys/role/${id}`, arg),
  // 3.4 启用/禁用角色
  disableRole: ({ id, ...arg }) => putJson(`sys/role/${id}/disable`, arg),
  // 3.5 查询角色
  getRole: ({ id, ...arg }) => get(`sys/role/${id}`, arg),

  /*
    权限管理
  */
  // 4.1 查询权限树
  getPermissionTree: args => get('sys/permission/tree', args),
  // 4.2 添加权限
  addPermission: args => postJson('sys/permission', args),
  // 4.3 更新权限
  updatePermission: ({ id, ...arg }) => putJson(`sys/permission/${id}`, arg),
  // 4.4 删除权限
  delPermission: ({ id, ...arg }) => del(`sys/permission/${id}`, arg),
  // 4.5 查询权限
  getPermission: ({ id, ...arg }) => get(`sys/permission/${id}`, arg),
  // 4.6 根据用户级别查询权限
  getRolePermission: args => get('sys/permission', args),

  /*
    HRO企业管理
  */
  // 5.1 HRO企业列表
  getCompanyList: args => get('company', args),
  // 5.2 添加企业
  addCompany: args => postJson('company', args),
  // 5.3 编辑企业
  updateCompany: ({ id, ...arg }) => putJson(`company/${id}`, arg),
  // 5.4 启用/禁用企业
  disableCompany: ({ id, status, ...arg }) => putJson(`company/${id}/${status}`, arg),
  // 5.5 查询企业
  getCompany: ({ id, ...arg }) => get(`company/${id}`, arg),
  // 5.6 生成企业二维码
  createCompany: ({ id, ...arg }) => postBlob(`company/qrcode/${id}`, arg),
  /*
    客户管理
  */
  // 6.1 客户列表
  getCustomerList: args => postJson('customer/list', args),
  // 6.2 添加客户
  addCustomer: args => postJson('customer', args),
  // 6.3 编辑客户
  updateCustomer: ({ id, ...arg }) => putJson(`customer/${id}`, arg),
  // 6.4 启用/禁用客户
  disableCustomer: ({ id, status, ...arg }) => putJson(`customer/${id}/${status}`, arg),
  // 6.5 查询客户
  getCustomer: ({ id, ...arg }) => get(`customer/${id}`, arg),
  // 客户下拉列表
  getCustomerAll: args => get('customer/pullDownList', args),
  /*
    客户管理 合同管理
  */
  // 6.6 合同列表
  getCusContractList: args => get('cuscontract', args),
  // 6.7 添加合同
  addCusContract: args => postJson('cuscontract', args),
  // 6.8 编辑合同
  updateCusContract: ({ id, ...arg }) => putJson(`cuscontract/${id}`, arg),
  // 6.9 查询合同
  getCusContract: ({ id, ...arg }) => get(`cuscontract/${id}`, arg),
  /*
    客户管理 余额管理
  */
  // 6.10 余额列表
  getCusBalanceList: args => get('cusbalance', args),
  // 6.11 添加余额
  addCusBalance: ({ id, money, ...arg }) => postJson(`cusbalance/${id}/${money}`, arg),
  // 6.12 查看记录
  getCusBalanceRecord: ({ id, ...arg }) => get(`cusbalance/${id}/operate`, arg),
  /**
   * 协议
   */
  // 协议列表
  getProtocolList: args => get('protocol/list', args),
  // 新增协议
  addProtocol: args => postJson('protocol', args),
  // 协议详情
  getProtocolDetails: ({ id, ...arg }) => get(`protocol/${id}`, arg),
  // 更新协议
  updateProtocol: ({ id, ...arg }) => putJson(`protocol/${id}`, arg),
  // 删除协议
  deleteProtocol: ({ id, ...arg }) => del(`/protocol/${id}`, arg),
  /**
   * 数据字典
   */
  // 根据字典码获取字典
  getDictListByCode: args => get('dict', args),
  // 新增字典
  addDict: args => postJson('dict', args),
  // 更新字典
  updateDict: ({ id, ...arg }) => putJson(`dict/${id}`, arg),
  // 删除字典
  deleteDict: ({ id, ...arg }) => del(`dict/${id}`, arg),
  // 数据字典列表
  getDictList: args => get('dict/list', args),
  /**
   * 文件
   */
  // 文件上传
  fileUpload: args => postForm('file/upload', args),
  // 根据ID下载上传的文件
  fileDownloadById: ({ name, ...arg }) => getBlob('file/download', arg).then((blob) => {
    $utils.autoLoad(new Blob([blob]), name);
  }),
  // 下载上传的文件
  fileDownloadUpload: ({ name, ...arg }) => getBlob('file/download_upload', arg).then((blob) => {
    $utils.autoLoad(new Blob([blob]), name);
  }),
  /**
   * 工单管理
   */
  // 根据id获取工单
  getWorkOrder: ({ id, ...arg }) => get(`work_order/${id}`, arg),
  // 新增工单
  addWorkOrder: args => postJson('work_order', args),
  // 更新工单
  updateWorkOrder: ({ id, ...arg }) => putJson(`work_order/${id}`, arg),
  // 更新工单状态
  changeWorkOrder: ({ id, ...arg }) => putJson(`work_order/${id}/change_status`, arg),
  // 工单列表
  getWorkOrderList: args => postJson('work_order/list', args),
  // 导出工单
  exportWorkOrder: args => postJson('work_order/export', args),
  /**
   * 灵工管理
   */
  // 灵工列表
  getEmployeeList: args => get('employee', args),
  // 新增灵工
  addEmployee: args => postJson('employee', args),
  // 灵工工作履历列表
  getEmployeeWorkList: ({ id, ...arg }) => get(`employee/empwork/${id}`, arg),
  // 编辑灵工工作履历
  updateEmployeeWork: ({ id, ...arg }) => putJson(`employee/empwork/${id}`, arg),
  // 新增灵工工作履历
  addEmployeeWork: ({ id, ...arg }) => postJson(`employee/empwork/${id}`, arg),
  // 编辑灵工
  updateEmployee: ({ id, ...arg }) => putJson(`employee/${id}`, arg),
  // 导出灵工
  exportEmployee: args => get('employee/export', args),
  // 获取灵工详情
  getEmployeeDetails: ({ id, ...arg }) => get(`employee/${id}`, arg),
  // 导入灵工
  importEmployee: args => postForm('employee/import', args, { noMessage: true }),
  // 灵工任务完成记录
  getEmployeeTask: ({ id, ...arg }) => get(`/empworktask/${id}/emp`, arg),
  // 灵工更新状态
  updateEmployeeStatus: ({ id, status, ...arg }) => postJson(`/employee/${id}/${status}/update`, arg),
  /**
   * 服务报酬
   */
  // 导入服务报酬
  importServiceReward: args => postForm('service_reward/import', args, { noMessage: true }),
  // 批量发送确认
  batchSendServiceReward: ({ arr }) => postJson('service_reward/batch/send_confirm', arr),
  // 批量删除服务报酬
  batchDeleteServiceReward: ({ arr }) => postJson('service_reward/batch/delete', arr),
  // 根据查询条件导出excel
  exportServiceReward: args => postJson('service_reward/export', args),
  // 查询服务报酬列表
  getServiceRewardList: args => get('service_reward/list', args),
  // 更新服务报酬
  updateServiceReward: ({ id, ...arg }) => putJson(`/service_reward/${id}`, arg),
  /**
   * 任务管理
   */
  // 任务列表
  getWorkTaskList: args => postJson('worktask', args),
  // 任务撤回
  revokeWorkTask: ({ id, ...arg }) => postJson(`worktask/${id}/revoke`, arg),
  // 任务完成
  finishWorkTask: ({ id, ...arg }) => postJson(`worktask/${id}/finish`, arg),
  // 分派任务池
  assignWorkTaskPool: ({ id, ...arg }) => postJson(`worktask/${id}/pool`, arg),
  // 任务指派列表
  getNotAssignList: ({ id, ...arg }) => get(`empworktask/${id}/assign`, arg),
  // 任务指派后的列表
  getAssignList: ({ id, type, ...arg }) => get(`empworktask/list/${id}/${type}`, arg),
  // 指派任务
  assignEmpWorkTask: ({ id, empIds }) => postJson(`empworktask/${id}/assign`, empIds),
  // 撤回任务
  revokeEmpWorkTask: ({ empWorkTaskIds }) => postJson('empworktask/revoke', empWorkTaskIds),
  // 上岗
  onWorkEmpWorkTask: ({ time, empWorkTaskIds }) => postJson(`empworktask/gowork/${time}`, empWorkTaskIds),
  // 完成任务
  finishEmpWorkTask: ({ time, empWorkTaskIds }) => postJson(`empworktask/finish/${time}`, empWorkTaskIds),
  // 取消任务
  cancelEmpWorkTask: ({ empWorkTaskId }) => putJson(`empworktask/gowork/${empWorkTaskId}/cancel`),
  // 更新已完成和上岗时间
  updateEmpWorkTask: ({ onWorkTime, completeTime, empWorkTaskId }) => putJson(`empworktask/${empWorkTaskId}/${onWorkTime}/${completeTime}/update`),
  // 任务池列表
  getWorkTaskPoolList: args => postJson('worktask/pool', args),
  // 任务池同意申请
  agreeEmpWorkTask: ({ empWorkTaskIds }) => postJson('empworktask/accept', empWorkTaskIds),
  // 任务池待确定列表
  getUnconfirmList: ({ id, ...arg }) => get(`empworktask/list/${id}/pool`, arg),
  // 拒绝任务
  refuseEmpWorkTask: ({ empWorkTaskId }) => postJson(`empworktask/refuse/${empWorkTaskId}`),
  /**
   * 报表管理
   */
  // 查询企业、客户入驻情况
  getCompanyReportList: args => get('report/entering/enterprise', args),
  // 查询灵工入驻情况
  getEmpReportList: args => get('report/entering/emp', args),
  // 查询灵工接单情况
  getOrderReportList: args => get('report/entering/receive_order', args),
  // 查询日流水情况
  getBillReportList: args => get('report/entering/bill', args),

  /**
   * 模板下载
   */
  downloadTemplate: args => getBlob('file/download/template', args),
  // 根据文件ID下载文件
  downloadFileById: args => getBlob('/file/download', args),

  // 重置密码为 111111
  resetPassword: ({ id, ...arg }) => putJson(`/user/${id}/reset_psw`, arg),
  // 修改密码
  updatePassword: ({ id, ...arg }) => putJson(`/user/${id}/change_psw`, arg),

  /**
   * 印章管理
   */
  // 获取印章管理者
  getSealManager: ({ id, ...arg }) => get(`seal/${id}/manager_list`, arg),
  // 获取可分配的用户列表
  getManagerList: ({ id, ...arg }) => get(`seal/${id}/distributable_user_list`, arg),
  // 新增印章
  addSeal: args => postJson('seal', args),
  // 添加印章管理用户
  addSealManage: args => postJson('seal/seal_manage', args),
  // 取消用户管理印章
  delSealManager: ({ smId, ...arg }) => del(`seal/seal_manage/${smId}`, arg),
  // 印章列表
  getSealList: args => get('seal/list', args),
  /**
   * 签约模板管理
   */
  // 新增签约模板
  addContract: args => postJson('contract_template', args),
  // 签约模板设置印章
  setContractSeal: args => postJson('contract_template/set_seal', args),
  // 根据签约模板查询合同印章
  getContractSeal: ({ contractTemplateId, ...arg }) => get(`contract_template/${contractTemplateId}/seal_params`, arg),
  // 修改签约模板
  updateContract: ({ contractTemplateId, ...arg }) => putJson(`contract_template/${contractTemplateId}`, arg),
  // 查询签约模板
  getContract: ({ contractTemplateId, ...arg }) => get(`contract_template/${contractTemplateId}`, arg),
  // 签约模板列表
  getContractList: args => get('contract_template/list', args),
};
module.exports = api;
