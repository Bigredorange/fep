<template>
  <el-dialog
    :close-on-click-modal="false"
    :visible.sync="isShow"
    :title="`${ form.id ? '修改' : '新增' }部门`"
    width="400px"
    @close="reset"
  >
    <el-form
      ref="form"
      :model="form"
      :rules="rules"
      label-width="80px"
    >
      <el-form-item
        prop="name"
        label="名称"
      >
        <el-input
          v-model.trim="form.name"
          clearable
          placeholder="请输入名称"
        />
      </el-form-item>
      <!-- <el-form-item
        prop="level"
        label="序号"
      >
        <el-input-number
          v-model="form.level"
          placeholder="请输入排序"
          :min="1"
        />
      </el-form-item> -->
      <el-button
        style="width: 100%; marginTop: 30px;"
        type="primary"
        @click="submitForm()"
      >
        保存
      </el-button>
    </el-form>
  </el-dialog>
</template>

<script>
export default {
  data() {
    return {
      isShow: false,
      rules: {
        name: [{
          trigger: 'blur',
          required: true,
          message: '请输入名称',
        }],
        // sort: [{
        //   trigger: 'blur',
        //   required: true,
        //   message: '请输入排序',
        //   type: 'number',
        // }],
      },
      form: {
        name: null,
        level: null,
        pid: null,
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
    open(data) {
      this.form = { ...this.form, ...data };
      this.isShow = true;
    },
    async submitForm() {
      await this.$refs.form.validate();
      if (!this.form.id) {
        this.form.level += 1;
        this.$api.addDepart({
          ...this.form,
        }).then(() => {
          this.$message.success(this.form.id ? '修改成功' : '新增成功');
          this.reset();
          this.isShow = false;
          this.$emit('update');
        });
      } else {
        this.$api.updateDepart({
          ...this.form,
        }).then(() => {
          this.$message.success(this.form.id ? '修改成功' : '新增成功');
          this.reset();
          this.isShow = false;
          this.$emit('update');
        });
      }
    },
  },
};
</script>
