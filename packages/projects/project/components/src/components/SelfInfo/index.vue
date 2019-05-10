<template>
  <el-dialog
    :close-on-click-modal="false"
    :visible.sync="dialogShow"
    title="修改个人信息"
    width="574px"
    @close="reset"
  >
    <div class="form">
      <el-form
        ref="infoForm"
        :model="info"
        :rules="infoRule"
        label-width="100px"
      >
        <el-form-item
          prop="account"
          label="账号："
        >
          {{ userinfo.account }}
        </el-form-item>
        <el-form-item
          label="用户名："
          prop="username"
        >
          {{ userinfo.username }}
        </el-form-item>
        <el-form-item
          label="手机号："
          prop="phone"
        >
          <el-input
            v-model.trim="info.phone"
            size="small"
            clearable
            maxlength="11"
            placeholder="请输入手机号"
          />
        </el-form-item>
        <el-form-item
          label="邮箱："
          prop="email"
        >
          <el-input
            v-model.trim="info.email"
            size="small"
            clearable
            placeholder="请输入邮箱"
          />
        </el-form-item>
        <el-form-item
          label="座机："
          prop="landline"
        >
          <el-input
            v-model.trim="info.landline"
            size="small"
            clearable
            placeholder="请输入座机"
          />
        </el-form-item>
        <el-form-item
          label="部门："
          prop="departmentNames"
        >
          {{ userinfo.departmentNames }}
        </el-form-item>
        <el-form-item
          label="角色："
          prop="role"
        >
          {{ userinfo.roleNames }}
        </el-form-item>
      </el-form>
    </div>
    <div slot="footer">
      <el-button @click="reset">
        取消
      </el-button>
      <el-button
        type="primary"
        :loading="infoLoading"
        @click="infoModify()"
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
      dialogShow: false,
      infoLoading: false,
      userinfo: this.$store.state.hroUserinfo,
      info: {
        email: null,
        phone: null,
        landline: null,
      },
      infoRule: {
        phone: {
          required: true,
          trigger: 'blur',
          validator: async (rule, value, callback) => {
            if (!value) {
              callback(new Error('手机号不能为空'));
            } else if (!this.$utils.regExp(value, 'mp')) {
              callback(new Error('手机号格式错误'));
            } else if (value !== this.userinfo.phone) {
              const isExist = await this.$api.userSelectExistUser({
                phone: value,
              });
              if (isExist) {
                callback(new Error('该手机号已被使用'));
              } else {
                callback();
              }
            } else {
              callback();
            }
          },
        },
        email: {
          required: true,
          trigger: 'blur',
          validator: async (rule, value, callback) => {
            if (!value) {
              callback(new Error('请输入邮箱'));
            } else if (!this.$utils.regExp(value, 'em')) {
              callback(new Error('邮箱格式错误'));
            } else if (value !== this.userinfo.email) {
              const isExist = await this.$api.userSelectExistUser({
                email: value,
              });
              if (isExist) {
                callback(new Error('该邮箱已被使用'));
              } else {
                callback();
              }
            } else {
              callback();
            }
          },
        },
      },
    };
  },
  methods: {
    reset() {
      this.$refs.infoForm.clearValidate();
      this.dialogShow = false;
    },
    open() {
      this.userinfo = this.$store.state.hroUserinfo;
      this.info = {
        email: this.userinfo.email,
        phone: this.userinfo.phone,
        landline: this.userinfo.landline,
      };
      this.dialogShow = true;
    },
    async infoModify() {
      await this.$refs.infoForm.validate();
      this.infoLoading = true;
      this.$api.userUpdateInformation(this.info).then(() => {
        this.updateLocalUserinfo();
        this.$message.success('修改成功');
        this.dialogShow = false;
      }).finally(() => {
        this.infoLoading = false;
      });
    },
    updateLocalUserinfo() {
      this.$api.userGetUserInfo().then((res) => {
        sessionStorage.hroUserinfo = JSON.stringify(res);
        this.$store.commit('setHroUserinfo', res);
      });
    },
  },
};
</script>
