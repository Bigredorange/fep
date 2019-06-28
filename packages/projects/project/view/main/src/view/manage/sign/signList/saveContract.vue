<template>
  <el-dialog
    title="存档"
    :visible.sync="isShow"
    width="650px"
    :close-on-click-modal="false"
    @close="reset"
  >
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
            验证码发送手机号：
          </label>
          <p
            class="blue-txt"
          >
            {{ form.mobile }}
          </p>
        </el-form-item>
        <el-form-item
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
        @click="saveContractSign"
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
        contractSignRecordId: null,
        mobile: null,
        code: null,
        type: 2,
      },
      btnMsg: '获取验证码',
      rules: {
        code: [{
          required: true,
          message: '请填写验证码',
          trigger: 'blur',
        }],
      },
    };
  },
  methods: {
    open(row) {
      this.money = '';
      this.isShow = true;
      this.form.mobile = this.$store.state.fepUserInfo.mobile;
      this.form.contractSignRecordId = row.id;
    },
    reset() {
      this.$utils.initData.call(this);
      this.$nextTick(() => {
        this.$refs.form.clearValidate();
      });
    },
    sendRealNameMsg() {
      this.sendContractSign();
    },
    sendContractSign() {
      this.$api.sendContractSign({
        type: 2,
        id: this.form.contractSignRecordId,
      }).then(() => {
        this.$message.success('验证码已发送');
      });
    },
    saveContractSign() {
      this.$refs.form.validate((valid) => {
        if (valid) {
          this.loading = true;
          this.$api.saveContractSign({
            contractSignRecordId: this.form.contractSignRecordId,
            code: this.form.code,
          }).then(() => {
            this.$message.success('存档成功');
            this.$emit('update');
            this.isShow = false;
          }).finally(() => {
            this.loading = false;
          });
        } else {
          this.$message.info('请输入必填内容');
        }
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
