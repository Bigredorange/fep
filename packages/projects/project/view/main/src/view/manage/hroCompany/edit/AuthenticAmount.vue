<template>
  <el-dialog
    title="银行打款金额认证"
    :visible.sync="isShow"
    width="500px"
  >
    <el-alert
      :closable="false"
      title="请向财务人员确认金额后输入，输错3次后需重新申请"
      type="warning"
    />
    <div class="con">
      <p>打款金额：</p>
      <el-input
        v-model="money"
        placeholder="请输入打款金额"
      />
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
      money: '',
      companyId: null,
    };
  },
  methods: {
    open(companyId) {
      this.money = '';
      this.isShow = true;
      this.companyId = companyId;
    },
    submit() {
      if (!/^\d+$/.test(this.money) || Number(this.money) <= 0) {
        this.$message.warning('请输入大于 0 的金额');
        return;
      }
      this.$api.addCusBalance({
        id: this.companyId,
        money: this.money,
      }).then(() => {
        this.isShow = false;
        this.$message.success('充值成功');
        this.$emit('update');
      });
    },
  },
};
</script>
<style lang="scss" scoped>
  /deep/ .el-dialog__body {
    padding: 10px 20px;
  }
  .con {
    display: flex;
    justify-content: center;
    margin: 10px 0;
    p {
      min-width: 100px;
      line-height: 35px;
    }
  }
</style>
