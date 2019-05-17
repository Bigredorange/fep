const {
  get,
  // post,
  // put,
  // postForm,
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
};
module.exports = api;
