<template>
  <div>
    <el-dialog
      :close-on-click-modal="false"
      :visible.sync="isShow"
      :title="`${form.id ? '修改' : '新建'}角色`"
      width="946px"
      class="dialog"
      @close="reset"
    >
      <el-form
        ref="form"
        class="modify-form"
        :rules="rules"
        :model="form"
        label-width="120px"
      >
        <el-form-item
          label="姓名"
          prop="name"
        >
          <el-input
            v-model="form.name"
            clearable
            placeholder="请输入姓名"
          />
        </el-form-item>
      </el-form>
      <div slot="footer">
        <el-button @click="reset">
          重置
        </el-button>
        <el-button
          type="primary"
          :loading="isLoading"
          @click="submit"
        >
          确定
        </el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  props: {
    companyId: {
      type: Number,
      default: null,
    },
  },
  data() {
    return {
      isLoading: false,
      isShow: false,
      rules: {
        name: [{
          required: true,
          message: '请输入姓名',
          trigger: 'blur',
        }],
      },
      form: {
        name: null,
      },
    };
  },
  methods: {
    reset() {
      this.form = {
        name: null,
      };
      this.$nextTick(() => {
        this.$refs.form.clearValidate();
      });
    },
    open(initValue) {
      if (initValue) {
        this.form = {
          id: initValue.id,
          name: initValue.name,
        };
      }
      this.form.companyId = this.companyId;
      this.isShow = true;
    },
    async submit() {
      await this.$refs.form.validate();
      this.isLoading = true;
      this.$api.organizationRolePost(this.form).then(() => {
        this.$emit('getList');
        this.isShow = false;
        this.$message.success('新建成功');
      }).finally(() => {
        this.isLoading = false;
      });
    },
  },
};
</script>
