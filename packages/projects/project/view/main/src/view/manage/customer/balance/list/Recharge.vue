<template>
  <el-dialog
    title="充值"
    :visible.sync="isShow"
    width="400px"
  >
    <div class="con">
      <img
        src="../../../../../assets/icon/recharge.png"
        class="center"
      >
    </div>
    <div class="con">
      <p>充值金额：</p>
      <el-input
        v-model="money"
        placeholder="请输入充值金额"
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
      customerId: null,
    };
  },
  methods: {
    open(row) {
      this.money = '';
      this.isShow = true;
      this.customerId = row.customerId;
    },
    submit() {
      if (!/^\d+$/.test(this.money) || Number(this.money) <= 0) {
        this.$message.warning('请输入大于 0 的金额');
        return;
      }
      this.$api.addCusBalance({
        id: this.customerId,
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
  .con {
    display: flex;
    justify-content: center;
    margin-bottom: 10px;
    p {
      min-width: 100px;
      line-height: 35px;
    }
  }
</style>
