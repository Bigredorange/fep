<template>
  <div class="con">
    <div class="con-base">
      <div class="title">
        <label>{{ !userId ? '新增用户' : '设置用户' }}</label>
      </div>
      <div class="area">
        <div class="label">
          <i class="line" />
          <label>{{ !userId ? '填写基本信息' : '基本信息' }}</label>
          <el-form
            ref="formUser"
            :model="form"
            :rules="rules"
            label-width="100px"
            style="margin-left: 120px;"
            inline
          >
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
                style="width: 200px;"
                :rows="3"
              />
            </el-form-item>
            <el-form-item
              label="角色"
            >
              <el-select
                v-model="form.status"
                style="width: 200px;"
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
          </el-form>
        </div>
      </div>
      <div class="con-tab">
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
              label="工作授权"
              name="work"
            >
              work
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
// import OrgTree from './OrgTree.vue';

export default {
  // components: {
  //   OrgTree,
  // },
  data() {
    return {
      rules: {
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
          message: '请输入手机号码',
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
      },
      confirmButtonLoading: false,
      tabName: 'org',
      departList: [],
      expandNodes: [], // 树的展开情况
      rolesList: [],
      userId: null,
    };
  },
  mounted() {
    this.getUserDepartTree();
    this.getRolesList();
    this.userId = this.$route.params.userId;
    if (!this.userId) {
      this.form.username = null;
      this.form.password = null;
    } else {
      this.getUserDetail();
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
          if (!this.userId) {
            api = 'addRole';
            param = this.form;
          } else {
            api = 'updateRole';
            param = {
              ...this.form,
              id: this.userId,
            };
          }
          this.$api[api](param).then(() => {
            this.$message.success('保存成功');
            // this.getRoleSettingsById();
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
    getUserDetail() {
      // this.$api.get
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
        width: 60%;
      }
      /deep/ .el-radio-button__orig-radio:checked+.el-radio-button__inner {
        background-color: #356fb8;
        border-color: #356fb8;
      }
    }
  }
  .con-tab {
    margin-bottom: 10px;
    /deep/ .el-tabs__nav-wrap::after {
      height: 0;
    }
    /deep/ .el-tabs__active-bar {
      background-color: #ffc000;
      border-radius: 2px;
    }
    /deep/ .el-tabs__item.is-active {
      color: #000000;
    }
    /deep/ .el-tabs__item {
      color: #76879d;
      &:hover {
        color: #000000;
      }
    }
  }
  .bot-menu {
      margin-top: 20px;
      display: flex;
      justify-content: center;
  }
}
</style>
