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
            inline
            class="ui-form three-col"
          >
            <el-form-item
              label="客户"
              prop="customerId"
            >
              <el-select
                v-model="form.customerId"
                placeholder="请选择客户"
              >
                <el-option
                  v-for="item in customerList"
                  :key="item.id"
                  :label="item.customerName"
                  :value="item.id"
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
          </el-form>
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
        customerId: null,
      },
      confirmButtonLoading: false,
      tabName: 'org',
      departList: [],
      expandNodes: [], // 树的展开情况
      rolesList: [],
      userId: null,
      customerList: [],
      companyList: [],
      customerNotOwn: [],
      customerOwn: [],
      cusNameNot: null,
      cusName: null,
      cusSelection: [],
    };
  },
  created() {
    this.getCustomerList();
    const { userId, companyId } = this.$route.query;
    this.userId = userId;
    if (!this.userId) {
      this.$utils.initData.call(this, { include: ['form'] });
      if (companyId) {
        this.form.companyId = companyId;
        this.form.level = 1;
      }
    } else {
      this.getUserDetail(this.userId);
    }
  },
  methods: {
    submit() {
      this.$refs.formUser.validate((valid) => {
        if (valid) {
          this.confirmButtonLoading = true;
          let api = '';
          let param = null;
          this.form.level = 5;
          this.form.companyId = this.$store.state.fepUserInfo.companyId;
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
          this.$api[api](param).then(() => {
            this.$message.success('保存成功');
            this.$router.go(-1);
          }).finally(() => {
            this.confirmButtonLoading = false;
          });
        } else {
          this.$message.info('请按提示填写');
        }
      });
    },
    getCustomerList() {
      this.$api.getCustomerAll().then((res) => {
        this.customerList = res;
      });
    },
    getUserDetail(id) {
      this.$api.getUserById({
        id,
      }).then((res) => {
        this.form = res;
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
