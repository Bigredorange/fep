<template>
  <div class="con">
    <div class="con-base">
      <div class="title">
        <label>{{ type === 'add' ? '新增用户' : '设置用户' }}</label>
      </div>
      <div class="area">
        <div class="label">
          <i class="line" />
          <label>{{ type === 'add' ? '填写基本信息' : '基本信息' }}</label>
          <el-form
            ref="formUser"
            :model="form"
            :rules="rules"
            label-width="100px"
            style="margin-left: 120px;"
            inline
            class="ui-form three-col"
          >
            <el-form-item
              label="用户类型"
              prop="level"
            >
              <el-select
                v-model="form.level"
                placeholder="请选择用户类型"
              >
                <el-option
                  v-for="item in userTypeList"
                  :key="item.key"
                  :label="item.name"
                  :value="item.key"
                />
              </el-select>
            </el-form-item>
            <el-form-item
              label="登录账号"
              prop="username"
            >
              <el-input
                v-model="form.username"
                placeholder="请输入登录账号"
              />
            </el-form-item>
            <el-form-item
              v-if="!userId"
              label="密码"
              prop="password"
            >
              <el-input
                v-model="form.password"
                placeholder="请输入密码"
              />
            </el-form-item>
            <el-form-item
              label="状态"
              prop="status"
            >
              <el-radio-group
                v-model="form.status"
              >
                <el-radio-button
                  :label="1"
                >
                  启用
                </el-radio-button>
                <el-radio-button
                  :label="0"
                >
                  禁用
                </el-radio-button>
              </el-radio-group>
            </el-form-item>
            <el-form-item
              label="姓名"
              prop="name"
            >
              <el-input
                v-model="form.name"
                placeholder="请输入姓名"
              />
            </el-form-item>
            <el-form-item
              label="手机号"
              prop="mobile"
            >
              <el-input
                v-model="form.mobile"
                placeholder="请输入手机号"
              />
            </el-form-item>
            <!-- <el-form-item
              label="创建时间"
            >
              <span>{{ form.createTime }}</span>
            </el-form-item> -->
            <el-form-item
              label="邮箱"
              prop="email"
            >
              <el-input
                v-model="form.email"
                placeholder="请输入邮箱"
              />
            </el-form-item>
            <el-form-item
              label="备注"
              prop="remark"
            >
              <el-input
                v-model="form.remark"
                placeholder="请输入备注"
                type="textarea"
                :rows="3"
              />
            </el-form-item>
            <el-form-item
              label="角色"
            >
              <el-select
                v-if="form.roleIds && rolesList.length > 1"
                v-model="form.roleIds"
                placeholder="请选择角色"
                multiple
              >
                <el-option
                  v-for="item in rolesList"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id"
                />
              </el-select>
            </el-form-item>
            <el-form-item
              v-if="form.level === 3"
              label="企业"
              prop="companyId"
            >
              <el-select
                v-model="form.companyId"
                placeholder="请选择企业"
              >
                <el-option
                  v-for="item in companyList"
                  :key="item.id"
                  :label="item.companyName"
                  :value="item.id"
                />
              </el-select>
            </el-form-item>
          </el-form>
        </div>
      </div>
      <div
        class="con-tab"
      >
        <div>
          <el-tabs
            v-model="tabName"
            @tab-click="handleTabClick"
          >
            <el-tab-pane
              label="组织设置"
              name="org"
            >
              <el-tree
                ref="tree"
                :props="{
                  children: 'children',
                  label: 'name',
                }"
                node-key="id"
                show-checkbox
                :default-expanded-keys="expandNodes"
                :data="departList"
                @node-expand="expandNode"
                @node-collapse="collapseNode"
              >
                <span
                  slot-scope="{ node, data }"
                  class="title"
                >
                  <i :class="data.type === 0 ? 'icon-menu' : 'icon-btn'" />
                  <span
                    class="node-name"
                    @click.stop="edit(data, node)"
                  >{{ data.name }}</span>
                </span>
              </el-tree>
              <!-- <org-tree :list="departList" /> -->
            </el-tab-pane>
            <el-tab-pane
              label="客户分配"
              name="customer"
            >
              <div
                v-if="tabName === 'customer'"
                class="con-card"
              >
                <el-card
                  class="left-card"
                >
                  <el-input
                    v-model="cusNameNot"
                    placeholder="请输入客户名称"
                    class="con-input"
                  >
                    <el-button
                      slot="append"
                      icon="el-icon-search"
                      @click="getCustomerNotOwn"
                    />
                  </el-input>
                  <el-table
                    :data="customerNotOwn"
                    @selection-change="(selection) => cusSelection = selection"
                  >
                    <el-table-column
                      type="selection"
                      align="center"
                    />
                    <el-table-column
                      prop="customerNo"
                      label="客户编号"
                    />
                    <el-table-column
                      prop="customerName"
                      label="客户名称"
                    />
                  </el-table>
                </el-card>
                <div class="center">
                  <p
                    class="grey"
                  >
                    添加至右边列表
                  </p>
                  <!-- <i
                    class="el-icon-right"
                  /> -->
                  <el-button
                    type="primary"
                    :disabled="customerNotOwn.length === 0"
                    @click="assignCus"
                  >
                    添加分配
                  </el-button>
                </div>
                <el-card
                  class="right-card"
                >
                  <el-input
                    v-model="cusName"
                    placeholder="请输入客户名称"
                    class="con-input"
                  >
                    <el-button
                      slot="append"
                      icon="el-icon-search"
                      @click="getCustomerOwn"
                    />
                  </el-input>
                  <el-table
                    :data="customerOwn"
                  >
                    <el-table-column
                      prop="customerNo"
                      label="客户编号"
                    />
                    <el-table-column
                      prop="customerName"
                      label="客户名称"
                    />
                    <el-table-column
                      prop="usernames"
                      label="授权人"
                    />
                    <el-table-column>
                      <template slot-scope="{ row }">
                        <el-button
                          type="text"
                          class="red"
                          @click="delCus(row)"
                        >
                          删除
                        </el-button>
                      </template>
                    </el-table-column>
                  </el-table>
                </el-card>
              </div>
            </el-tab-pane>
          </el-tabs>
        </div>
      </div>
      <div class="bot-menu">
        <el-button
          v-loading="confirmButtonLoading"
          type="primary"
          @click="submit"
        >
          提交
        </el-button>
        <el-button>
          取消
        </el-button>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      rules: {
        level: [{
          required: true,
          message: '请选择用户类别',
          trigger: 'blur',
          type: 'number',
        }],
        username: [{
          required: true,
          message: '请输入登陆账号',
          trigger: 'blur',
        }],
        password: [{
          required: true,
          message: '请输入密码',
          trigger: 'blur',
        }],
        name: [{
          required: true,
          message: '请输入姓名',
          trigger: 'blur',
        }],
        mobile: [{
          required: true,
          trigger: 'blur',
          validator: (rule, value, callback) => {
            if (value && !this.$utils.regExp(value, 'mp')) {
              callback(new Error('请输入正确的手机号'));
            } else {
              callback();
            }
          },
        }],
        email: [{
          required: false,
          message: '请输入正确的邮箱',
          trigger: 'blur',
          validator: (rule, value, callback) => {
            if (value && !this.$utils.regExp(value, 'em')) {
              callback(new Error('请输入正确的邮箱'));
            } else {
              callback();
            }
          },
        }],
        companyId: [{
          required: true,
          message: '请选择企业',
          trigger: 'blur',
          // type: 'number',
        }],
        customerId: [{
          required: true,
          message: '请选择客户',
          trigger: 'blur',
          type: 'number',
        }],
      },
      form: {
        username: null,
        password: null,
        name: null,
        mobile: null,
        companyName: null,
        status: 1,
        level: null,
        remark: null,
        companyId: null,
        // customerId: null,
        roleIds: [],
      },
      confirmButtonLoading: false,
      tabName: 'org',
      departList: [],
      expandNodes: [], // 树的展开情况
      rolesList: [],
      userTypeList: [
        {
          key: 1,
          name: '系统管理员',
        },
        {
          key: 2,
          name: '平台内部用户',
        },
        {
          key: 3,
          name: '企业管理员',
        },
        {
          key: 4,
          name: '企业内部用户',
        },
        {
          key: 5,
          name: '客户管理员',
        },
        {
          key: 6,
          name: '客户内部用户',
        },
      ],
      userId: null,
      customerList: [],
      companyList: [],
      customerNotOwn: [],
      customerOwn: [],
      cusNameNot: null,
      cusName: null,
      cusSelection: [],
      level: null,
      type: null,
    };
  },
  mounted() {
    this.getUserDepartTree();
    this.getRolesList();
    this.getCompanyList();
    this.getCustomerList();
    const { userId, companyId, type } = this.$route.query;
    const { level } = this.$store.state.fepUserInfo;
    this.level = level;
    this.type = type;
    if (userId) {
      this.userId = userId;
    }
    if (type === 'add') {
      this.$utils.initData.call(this, { include: ['form'] });
      if (companyId) {
        this.form.companyId = companyId;
        this.form.level = 3;
      }
    } else {
      this.getUserDetail(this.userId);
      this.getCustomerOwn();
      this.getCustomerNotOwn();
    }
    if (this.level === 1) {
      this.userTypeList = this.userTypeList.filter(user => user.key >= level + 1 && user.key <= level + 2);
    } else {
      this.userTypeList = this.userTypeList.filter(user => user.key === level + 1);
    }
  },
  methods: {
    submit() {
      const halfIds = this.$refs.tree.getHalfCheckedKeys();
      const checkedIds = this.$refs.tree.getCheckedKeys();
      const resourcesIds = halfIds.concat(checkedIds);
      this.$refs.formUser.validate((valid) => {
        if (valid) {
          this.confirmButtonLoading = true;
          let api = '';
          let param = null;
          this.form.deptIds = resourcesIds;
          // this.form.level = this.$store.state.fepUserInfo.level;
          if (this.form.level > 2) {
            this.form.companyId = this.$store.state.fepUserInfo.companyId;
          }
          if (!this.userId) {
            api = 'addUser';
            param = this.form;
          } else {
            api = 'updateUser';
            param = {
              ...this.form,
              id: this.userId,
            };
          }
          this.$api[api](param).then((res) => {
            this.$message.success('保存成功');
            if (!this.userId) {
              this.userId = res;
              this.getCustomerOwn();
              this.getCustomerNotOwn();
            }
            // this.$router.go(-1);
          }).finally(() => {
            this.confirmButtonLoading = false;
          });
        } else {
          this.$message.info('请按提示填写');
        }
      });
    },
    handleTabClick() {

    },
    getUserDepartTree() {
      this.$api.getUserDepartTree().then((res) => {
        this.departList = res;
        const keys = [];
        const getKey = (list) => {
          list.forEach((item) => {
            if (item.children && item.children.length) {
              getKey(item.children);
            } else if (item.checked) {
              keys.push(item.id);
            }
          });
        };
        getKey(res);
        this.$refs.tree.setCheckedKeys(keys);
      });
    },
    expandNode(data, node) {
      this.expandSwitch(true, data, node);
    },
    collapseNode(data, node) {
      this.expandSwitch(false, data, node);
    },
    expandSwitch(isExpand, { id }, node) {
      // 控制节点展开关闭
      const idx = this.expandNodes.indexOf(id);
      if (isExpand) {
        if (idx === -1) {
          this.expandNodes.push(id);
        }
        node.expanded = true;
      } else {
        if (idx > -1) {
          this.expandNodes.splice(idx, 1);
        }
        node.expanded = false;
      }
    },
    getRolesList() {
      this.isLoading = true;
      this.$api.getAllRole({
        name: '',
        status: 1,
      }).then((res) => {
        this.rolesList = res;
      }).finally(() => {
        this.isLoading = false;
      });
    },
    getCompanyList() {
      this.$api.getCompanyList({
        pageCurrent: 1,
        pageSize: 1000,
      }).then((res) => {
        this.companyList = res.dataList;
      });
    },
    getCustomerList() {
      this.$api.getCustomerAll().then((res) => {
        this.customerList = res;
      });
    },
    getCustomerNotOwn() {
      this.$api.getCustomerNotOwn({
        id: this.userId,
        searchContent: this.cusNameNot,
      }).then((res) => {
        this.customerNotOwn = res.dataList;
      });
    },
    getCustomerOwn() {
      this.$api.getCustomerOwn({
        id: this.userId,
        searchContent: this.cusName,
      }).then((res) => {
        this.customerOwn = res.dataList;
      });
    },
    getUserDetail(id) {
      this.$api.getUserById({
        id,
      }).then((res) => {
        this.form = res;
      });
    },
    assignCus() {
      const arr = this.cusSelection.map(item => item.customerId);
      this.$api.assignCustomer({
        id: this.userId,
        arr,
      }).then(() => {
        this.$message.success('分配成功');
        this.getCustomerNotOwn();
        this.getCustomerOwn();
      });
    },
    delCus(row) {
      this.$api.delAssginCustomer({
        customerId: row.userCustomerId,
      }).then(() => {
        this.$message.success('已取消分配');
        this.getCustomerOwn();
        this.getCustomerNotOwn();
      });
    },
  },
};
</script>
<style lang="scss" scoped>
.con {
  padding: 8px;
  border-radius: 10px;
  .con-base {
    padding: 18px;
    background: #fff;
    border-radius: 10px;
    .title {
      color: #70829a;
    }
    .area {
      margin-top: 10px;
      display: flex;
      border-top: dashed 1px #ebf0f9;;
      border-bottom: dashed 1px #ebf0f9;;
      padding: 10px;
      i.line {
        margin-right: 7px;
        vertical-align: middle;
        display: inline-block;
        width: 4px;
        height: 14px;
        border-radius: 2px;
        background-color: #ffc000;
      }
      label {
        vertical-align: middle;
        line-height: 16px;
        font-size: 14px;
      }
      /deep/ .label {
        width: 80%;
      }
      /deep/ .el-radio-button__orig-radio:checked+.el-radio-button__inner {
        background-color: #356fb8;
        border-color: #356fb8;
      }
    }
  }
  .con-tab {
    margin-bottom: 10px;
  }
  .bot-menu {
      margin-top: 20px;
      display: flex;
      justify-content: center;
  }
  .con-card {
    display: flex;
    justify-content: space-between;
    .con-input {
      width: 200px;
      margin-bottom: 10px;
    }
    .left-card {
      flex: 5;
    }
    .right-card {
      flex: 5,
    }
    .center {
      margin: auto 20px;
      p {
        color:#cad0d7;
        margin-bottom: 10px;
      }
    }
  }
}
</style>
