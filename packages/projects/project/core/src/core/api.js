import Vue from 'vue';

const {
  get,
  post,
  put,
  postForm,
  del,
  postJson,
  // postBlob,
  getBlob,
  putJson,
} = require('./ajax');

const { $config } = Vue.prototype;
const {
  baseURL,
} = $config;

const api = {
  // 1.1 登录
  login: args => postJson('login', args),
  // 1.2 获取验证码
  verificationCode: args => getBlob('kaptcha', args),
  // 1.3 获取用户信息
  getUserInfo: args => get('user/profile', args),
  // 1.4 获取账号列表
  getAccountList: args => get('user/accounts', args),
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

  // 1.1 CBAS信息+权限
  userGetUserCbasInfo: args => get(`${baseURL}/user/getUserCbasInfo`, args),
  // 1.2 修改用户密码
  changePassword: args => post(`${baseURL}/user/changePassword`, args),
  // 1.4 修改用户
  updateUser: args => post(`${baseURL}/user/updateUser`, args),
  // 1.7.修改NC编码
  updateNcCode: args => post(`${baseURL}/customer/updateNcCode`, args),
  // 7.1 获取方案审核列表
  schemeCheckList: args => get(`${baseURL}/wages/scheme/check`, args),
  // 通过业务类型名称获取财务规则
  getRuleByBusinessTypeName: args => get(`${baseURL}/wages/scheme/invoiceItem`, args),
  // 11.3 确认开票
  confirmInvoice: args => post(`${baseURL}/invoice/confirmInvoice`, args),
  // 11.4 查看所有的开票单
  listInvoiceAll: args => get(`${baseURL}/invoice/listInvoiceAll`, args),
  // 11.5 驳回开票单
  refuseInvoice: args => post(`${baseURL}/invoice/refuseInvoice`, args),
  // 11.6 根据城市确认开票
  confirmInvoiceByPlace: args => post(`${baseURL}/invoice/confirmInvoiceByPlace`, args),
  // 11.7 根据票据id查询查询财务系统生成的票据情况
  queryInvoiceState: args => get(`${baseURL}/invoice/queryInvoiceState`, args),
  // 15.6 根据账单id导出打单数据
  exportChargeBill: args => post(`${baseURL}/chargeStatistic/exportChargeBill`, args),
  // 零星项目列表
  littlePayment: args => get(`${baseURL}/wagesSporadic/selectFinance`, args),
  // 驳回零星项目
  rejectLittlePayment: args => post(`${baseURL}/wagesSporadic/reject`, args),
  // 零星项目是生成批次
  generateLittleBatch: args => postForm(`${baseURL}/wagesSporadic/confirmPay`, args),
  // 零星项目申请批次详细
  littlePaymentDetail: args => get(`${baseURL}/wagesSporadic/getSporadicDetail`, args),
  // 获取所有业务类型
  businessTypeList: args => get(`${baseURL}/wages/businessType/listAll`, args),
  // 通过id获取业务类型
  businessTypeDetail: args => get(`${baseURL}/wages/businessType`, args),
  // 7.8 查看垫付详情
  advanceGetAdvanceDetail: args => get(`${baseURL}/advance/getAdvanceDetail`, args),
  // 7.2 方案生效确认
  schemeConfirm: args => post(`${baseURL}/wages/scheme/confirm`, args),
  // 客户信息列表
  searchCustomerByFinance: args => get(`${baseURL}/customer/searchCustomerByFinance`, args),
  // 获取账单信息
  getBillDetailByInvoice: args => get(`${baseURL}/invoice/getInvoiceCS`, args),
  filesDownLoadFileCbas: args => getBlob(`${baseURL}/files/downLoadFile`, args),
  // 社保服务
  // 根据客服 返回 客户产品
  customerSelectCustomerProduct: args => get(`${baseURL}/customer/selectCustomerProduct`, args),
  // 31.1 查询异步执行结果
  asyncResultGetAsyncResult: args => get(`${baseURL}/asyncResult/getAsyncResult`, args),
  // 31.2 确认异步-工资表导入
  asyncResultConfirmAsyncWagesImport: args => post(`${baseURL}/asyncResult/confirmAsyncWagesImport`, args),
  // 31.3 确认异步-支出账单
  asyncResultConfirmAsyncPay: args => post(`${baseURL}/asyncResult/confirmAsyncPay`, args),
  // 2.3 转移客户
  migrateCustomer: args => put(`${baseURL}/customer/migrateCustomer`, args),
  // 31.3 确认确认异步-支出申请可发
  asyncResultConfirmAsyncApplyPay: args => post(`${baseURL}/asyncResult/confirmAsyncApplyPay`, args),
  // 31.5 确认异步-支出封账
  asyncResultConfirmAsyncSeal: args => post(`${baseURL}/asyncResult/confirmAsyncSeal`, args),
  // 多组织开票抬头预览
  invoiceMultiOrganizationTicket: args => get(`${baseURL}/invoice/multiOrganizationTicket`, args),
};

module.exports = api;
