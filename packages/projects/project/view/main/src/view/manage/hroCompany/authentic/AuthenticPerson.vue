<template>
  <el-dialog
    title="申请实名认证"
    :visible.sync="isShow"
    width="650px"
    :close-on-click-modal="false"
    @close="reset"
  >
    <div class="con-label">
      <img src="../../../../assets/icon/realname.png">
      <div>
        <p class="txt">
          企业认证需要经办人提交实名信息证实个人授权行为
        </p>
      </div>
    </div>
    <div>
      <el-form
        ref="form"
        :model="form"
        :rules="rules"
        label-width="140px"
        class="form"
      >
        <el-form-item>
          <label
            slot="label"
            class="blue-txt"
          >
            当前账号名称：
          </label>
          <p
            class="blue-txt"
          >
            {{ $store.state.fepUserInfo.username }}
          </p>
        </el-form-item>
        <el-form-item
          prop="name"
          label="真实姓名："
        >
          <el-input
            v-model.trim="form.name"
            placeholder="请输入真实姓名"
          />
        </el-form-item>
        <el-form-item
          prop="idno"
          label="身份证号："
        >
          <el-input
            v-model.trim="form.idno"
            placeholder="请输入身份证号"
          />
        </el-form-item>
        <el-form-item
          v-if="isBankAuthen"
          prop="cardno"
          label="银行卡号："
        >
          <el-input
            v-model.trim="form.cardno"
            placeholder="请输入银行卡号"
          />
        </el-form-item>
        <el-form-item
          prop="mobile"
          :label="isBankAuthen ? '银行预留手机号：' : '手机号：'"
        >
          <el-input
            v-model.trim="form.mobile"
            placeholder="请输入银行预留手机号"
          />
        </el-form-item>
        <el-form-item
          v-if="isBankAuthen"
          prop="code"
          label="验证码："
        >
          <div class="con-code">
            <el-input
              v-model="form.code"
              placeholder="请输入验证码"
              class="input"
            />
            <el-button
              @click="sendRealNameMsg"
            >
              {{ btnMsg }}
            </el-button>
          </div>
        </el-form-item>
      </el-form>
    </div>
    <span
      slot="footer"
      class="dialog-footer"
    >
      <el-button
        @click="isShow = false"
      >
        取消
      </el-button>
      <el-button
        :loading="loading"
        type="primary"
        @click="authPerCode"
      >
        确定
      </el-button>
    </span>
  </el-dialog>
</template>
<script>
export default {
  data() {
    return {
      isShow: false,
      loading: false,
      form: {
        empCompanyId: null,
        name: null,
        idno: null,
        cardno: null,
        mobile: null,
        code: null,
        type: 2,
        serviceId: null,
      },
      companyId: null,
      rules: {
        name: [{
          required: true,
          message: '请填写真实姓名',
          trigger: 'blur',
        }],
        idno: [{
          required: true,
          message: '请填写身份证号',
          trigger: 'blur',
        }],
        cardno: [{
          required: true,
          message: '请填写银行卡号',
          trigger: 'blur',
        }],
        mobile: [{
          required: true,
          trigger: 'blur',
          message: '请填写银行预留手机号',
          // validator: (rule, value, callback) => {
          //   if (value && !this.$utils.regExp(value, 'mp')) {
          //     callback(new Error('请填写银行预留手机号'));
          //   } else {
          //     callback();
          //   }
          // },
        }],
        code: [{
          required: true,
          message: '请填写验证码',
          trigger: 'blur',
        }],
      },
      btnMsg: '获取验证码',
      isBankAuthen: true,
    };
  },
  methods: {
    open() {
      this.money = '';
      this.isShow = true;
      this.companyId = this.$store.state.fepUserInfo.companyId;
      this.getPersonAuthenWay();
    },
    reset() {
      this.$utils.initData.call(this);
      this.$nextTick(() => {
        this.$refs.form.clearValidate();
      });
    },
    sendRealNameMsg() {
      if (typeof this.btnMsg === 'string') {
        if (this.form.name && this.form.idno && this.form.cardno && this.form.mobile) {
          this.setBtnMsg();
          this.authPerBank();
        } else {
          this.$refs.form.validateField(['name', 'idno', 'cardno', 'mobile']);
          this.$message.info('请输入必填内容');
        }
      }
    },
    setBtnMsg() {
      let num = 60;
      const interval = setInterval(() => {
        num -= 1;
        this.btnMsg = num;
        if (num === 0) {
          clearInterval(interval);
          this.btnMsg = '重新发送';
        }
      }, 1000);
    },
    authPerBank() {
      this.$api.authPerBank(this.form).then((res) => {
        this.$message.success('验证码已发送');
        this.form.serviceId = res;
      });
    },
    authPerCode() {
      this.$refs.form.validate((valid) => {
        if (valid) {
          this.loading = true;
          let api = 'authPerCode';
          let form = {};
          if (!this.isBankAuthen) {
            api = 'authPerThree';
            form = {
              idno: this.form.idno,
              name: this.form.name,
              mobile: this.form.mobile,
              type: this.form.type,
            };
          } else {
            form = {
              serviceId: this.form.serviceId,
              code: this.form.code,
              type: this.form.type,
            };
          }
          this.$api[api](form).then(() => {
            this.$message.success('实名认证成功');
            this.updateLocalUserinfo();
            this.isShow = false;
          }).finally(() => {
            this.loading = false;
          });
        } else {
          this.$message.info('请输入必填内容');
        }
      });
    },
    updateLocalUserinfo() {
      this.$api.getUserInfo().then((res) => {
        sessionStorage.fepUserInfo = JSON.stringify(res);
        this.$store.commit('setFepUserInfo', res);
        this.$emit('update');
      });
    },
    getPersonAuthenWay() {
      this.$api.getPersonAuthenWay().then((res) => {
        this.isBankAuthen = res.way === 2;
      });
    },
  },
};
</script>
<style lang="scss" scoped>
  /deep/ .el-dialog__body {
    padding: 10px 20px;
  }
  .con-label {
    display: flex;
    background-color: #f3f6fb;
    padding: 10px;
    justify-content: center;
    .txt {
      margin-top: 20px;
      margin-left: 10px;
      color: #70829a;
    }
  }
  .form {
    .blue-txt {
      color: #70829a;
    }
    .con-code {
      display: flex;
      .input {
        margin-right: 10px;
      }
    }
  }
</style>
