import $utils from './utils';

const {
  get,
  // post,
  // put,
  postForm,
  del,
  postJson,
  // postBlob,
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
  createCompany: ({ id, ...arg }) => postJson(`company/qrcode/${id}`, arg),
  /*
    客户管理
  */
  // 6.1 客户列表
  getCustomerList: args => get('customer', args),
  // 6.2 添加客户
  addCustomer: args => postJson('customer', args),
  // 6.3 编辑客户
  updateCustomer: ({ id, ...arg }) => putJson(`customer/${id}`, arg),
  // 6.4 启用/禁用客户
  disableCustomer: ({ id, status, ...arg }) => putJson(`customer/${id}/${status}`, arg),
  // 6.5 查询客户
  getCustomer: ({ id, ...arg }) => get(`customer/${id}`, arg),
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
  fileDownloadById: (args, name) => getBlob('file/download', args).then((blob) => {
    $utils.autoLoad(new Blob([blob]), name);
  }),
  // 下载上传的文件
  fileDownloadUpload: (args, name) => getBlob('file/download_upload', args).then((blob) => {
    $utils.autoLoad(new Blob([blob]), name);
  }),
  /**
   * 工单管理
   */
  // 根据id获取工单
  getWorkOrder: args => get('work_ordert', args),
  // 新增工单
  addWorkOrder: args => postJson('work_order', args),
  // 更新工单
  updateWorkOrder: ({ id, ...arg }) => putJson(`work_order/${id}`, arg),
  // 更新工单状态
  changeWorkOrder: ({ id, ...arg }) => del(`work_order/${id}/change_status`, arg),
  // 工单列表
  getWorkOrderList: args => get('work_order/list', args),
  // 导出工单
  exportWorkOrder: args => postJson('work_order/export', args),
};
module.exports = api;
