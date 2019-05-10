<template>
  <el-dialog
    :close-on-click-modal="false"
    :visible.sync="isShow"
    title="修改密码"
    width="574px"
    @close="reset"
  >
    <el-form
      ref="form"
      class="form"
      :model="form"
      :rules="rules"
      label-width="100px"
    >
      <el-form-item
        prop="oldPasswd"
        label="旧密码"
      >
        <el-input
          v-model.trim="form.oldPasswd"
          clearable
          type="password"
          size="small"
          placeholder="请输入旧密码"
        />
      </el-form-item>
      <el-form-item
        prop="newPasswd"
        label="设置新密码"
      >
        <el-input
          v-model.trim="form.newPasswd"
          clearable
          type="password"
          size="small"
          placeholder="请输入新密码"
        />
      </el-form-item>
      <el-form-item
        prop="confirmPasswd"
        label="重复新密码"
      >
        <el-input
          v-model.trim="confirmPasswd"
          clearable
          type="password"
          size="small"
          placeholder="请再次输入新密码"
        />
      </el-form-item>
    </el-form>
    <div slot="footer">
      <el-button @click="reset">
        取消
      </el-button>
      <el-button
        type="primary"
        :loading="isLoading"
        @click="submitForm()"
      >
        提交
      </el-button>
    </div>
  </el-dialog>
</template>

<script>
export default {
  data() {
    return {
      isShow: false,
      isLoading: false,
      rules: {
        oldPasswd: [{
          trigger: 'blur',
          required: true,
          message: '请输入旧密码',
        }],
        newPasswd: [{
          trigger: 'blur',
          required: true,
          validator: (rule, value, callback) => {
            if (!value) {
              callback(new Error('请输入新密码'));
            } else if (!/^\w{6,18}$/.test(value)) {
              callback(new Error('密码长度为6-18位，包含字母或数字'));
            } else if (this.form.oldPasswd === value) {
              callback(new Error('与旧密码一致'));
            } else {
              callback();
            }
          },
        }],
        confirmPasswd: [{
          trigger: 'blur',
          required: true,
          validator: (rule, value, callback) => {
            if (!this.confirmPasswd) {
              callback(new Error('请再次输入新密码'));
            } else if (this.form.newPasswd !== this.confirmPasswd) {
              callback(new Error('与新密码不一致'));
            } else {
              callback();
            }
          },
        }],
      },
      form: {
        oldPasswd: null,
        newPasswd: null,
      },
      confirmPasswd: null,
    };
  },
  methods: {
    reset() {
      this.form = {
        oldPasswd: null,
        newPasswd: null,
      };
      this.confirmPasswd = null;
      this.$nextTick(() => {
        this.$refs.form.clearValidate();
      });
      this.isShow = false;
    },
    open() {
      this.isShow = true;
    },
    async submitForm() {
      await this.$refs.form.validate();
      this.isLoading = true;
      this.$api.userUpdatePasswd({
        ...this.form,
      }).then(() => {
        this.$message.success('修改成功');
        this.reset();
        this.isShow = false;
      }).finally(() => {
        this.isLoading = false;
      });
    },
  },
};
</script>
