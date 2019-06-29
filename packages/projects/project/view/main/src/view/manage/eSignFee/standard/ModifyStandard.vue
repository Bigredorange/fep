<template>
  <el-dialog
    title="费用标准"
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
        <el-form-item
          label="收费项目"
          prop="chargeItem"
        >
          <el-select
            v-model="form.chargeItem"
            placeholder="请选择"
          >
            <el-option
              v-for="item in $opt('chargeItem')"
              :key="item.dictKey"
              :label="item.dictValue"
              :value="item.dictKey"
            />
          </el-select>
        </el-form-item>
        <el-form-item
          label="收费方式"
          prop="chargeMethod"
        >
          <el-radio-group
            v-model="form.chargeMethod"
          >
            <el-radio-button
              label="固定金额"
            >
              固定金额
            </el-radio-button>
            <el-radio-button
              v-if="form.chargeItem === '3'"
              label="单价收费"
            >
              单价收费
            </el-radio-button>
          </el-radio-group>
        </el-form-item>
        <el-form-item
          prop="chargeAmount"
          label="收费金额："
        >
          <el-input
            v-model.trim="form.chargeAmount"
            placeholder="请输入收费金额"
          />
        </el-form-item>
        <el-form-item
          label="备注："
        >
          <el-input
            v-model.trim="form.remark"
            :rows="2"
            type="textarea"
          />
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
        @click="submit"
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
        chargeItem: null,
        chargeMethod: null,
        chargeAmount: null,
        remark: null,
      },
      rules: {
        chargeItem: [{
          required: true,
          message: '请选择收费项目',
          trigger: 'blur',
        }],
        chargeMethod: [{
          required: true,
          message: '请选择收费项目',
          trigger: 'blur',
        }],
        chargeAmount: [{
          required: true,
          message: '请填写收费金额',
          trigger: 'blur',
        }],
      },
      standardId: null,
    };
  },
  methods: {
    open(standardId) {
      this.money = '';
      this.isShow = true;
      this.standardId = standardId;
      this.getStandardFee();
    },
    reset() {
      this.$utils.initData.call(this);
      this.$nextTick(() => {
        this.$refs.form.clearValidate();
      });
    },
    submit() {
      this.$refs.form.validate((valid) => {
        if (valid) {
          this.loading = true;
          this.$api.updateStandardFee(this.form).then(() => {
            this.$message.success('保存成功');
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
    getStandardFee() {
      this.$api.getStandardFee({
        id: this.standardId,
      }).then((res) => {
        this.form = res;
      });
    },
  },
};
</script>
<style lang="scss" scoped>
  /deep/ .el-dialog__body {
    padding: 10px 20px;
  }
  /deep/ .el-radio-button__orig-radio:checked+.el-radio-button__inner {
    background-color: #356fb8;
    border-color: #356fb8;
  }
</style>
