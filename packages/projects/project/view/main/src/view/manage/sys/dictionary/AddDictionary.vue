<template>
  <el-dialog
    :close-on-click-modal="false"
    :visible.sync="isShow"
    :title="`${form.id ? '修改' : '新增'}字典`"
    width="500px"
    class="dialog"
    @close="reset"
  >
    <el-form
      ref="form"
      class="form"
      :rules="rules"
      :model="form"
      label-width="100px"
    >
      <el-form-item
        label="字典码"
        prop="code"
      >
        <el-input
          v-model="form.code"
          placeholder="请选择字典码"
        />
      </el-form-item>
      <el-form-item
        label="字典键"
        prop="dictKey"
      >
        <el-input
          v-model="form.dictKey"
          placeholder="请输入字典键"
        />
      </el-form-item>
      <el-form-item
        label="字典值"
        prop="dictValue"
      >
        <el-input
          v-model="form.dictValue"
          placeholder="请输入字典值"
        />
      </el-form-item>
      <!-- <el-form-item
        label="状态"
        prop="status"
      >
        <el-radio-group
          v-model="form.status"
        >
          <el-radio
            :label="1"
          >
            启用
          </el-radio>
          <el-radio
            :label="0"
          >
            禁用
          </el-radio>
        </el-radio-group>
      </el-form-item> -->
      <el-form-item
        label="排序"
        prop="sort"
      >
        <el-input-number
          v-model="form.sort"
          placeholder="请输入排序"
          :min="1"
        />
      </el-form-item>
      <el-form-item
        label="备注"
        prop="remark"
      >
        <el-input
          v-model="form.remark"
          type="textarea"
        />
      </el-form-item>
    </el-form>
    <div style="textAlign: center;">
      <el-button
        type="primary"
        :loading="isLoading"
        @click="submit"
      >
        {{ form.id ? '修改' : '新增' }}
      </el-button>
      <el-button
        type="ghost"
        @click="isShow = false"
      >
        取消
      </el-button>
    </div>
  </el-dialog>
</template>

<script>
export default {
  data() {
    return {
      isLoading: false,
      isShow: false,
      codes: [],
      form: {
        id: null,
        code: null,
        dictKey: null,
        dictValue: null,
        sort: null,
        status: 1,
        remark: '',
      },
      rules: {
        code: [{
          required: true,
          message: '请输入规则编码',
          trigger: 'blur',
        }],
        dictKey: [{
          required: true,
          message: '请输入规则名称',
          trigger: 'blur',
        }],
        dictValue: [{
          required: true,
          message: '请输入字典值',
          trigger: 'blur',
        }],
      },
    };
  },
  methods: {
    reset() {
      this.$utils.initData.call(this);
      this.$nextTick(() => {
        this.$refs.form.clearValidate();
      });
    },
    open(initForm = {}) {
      this.form = {
        ...this.form,
        ...initForm,
      };
      this.isShow = true;
    },
    async submit() {
      await this.$refs.form.validate();
      this.isLoading = true;
      let api = '';
      if (!this.form.id) {
        api = 'addDict';
      } else {
        api = 'updateDict';
      }
      this.$api[api]({
        ...this.form,
      }).then(() => {
        this.$emit('update');
        this.isShow = false;
        this.$message.success(this.form.id ? '修改成功' : '新增成功');
      }).finally(() => {
        this.isLoading = false;
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.form {
  width: 400px;
  /deep/ .el-select {
    width: 100%;
  }
  .el-input-number {
    line-height: 33px;
  }
}
</style>
