<template>
  <el-dialog
    title="预览合同"
    :visible.sync="isShow"
    width="1000px"
  >
    <Editor
      ref="editor"
      v-model="content"
      class="editor"
    />
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
      content: '',
      rowDataId: null,
    };
  },
  methods: {
    open(rowDataId) {
      this.content = '';
      this.isShow = true;
      this.rowDataId = rowDataId;
      this.getDeatail();
    },
    submit() {
      // this.$api.addCusBalance({
      //   id: this.rowDataId,
      //   money: this.money,
      // }).then(() => {
      //   this.isShow = false;
      //   this.$message.success('充值成功');
      //   this.$emit('update');
      // });
    },
    getDeatail() {
      this.$api.getContractDynamic({
        rowDataId: this.rowDataId,
      }).then((res) => {
        this.content = res.contractContent;
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
