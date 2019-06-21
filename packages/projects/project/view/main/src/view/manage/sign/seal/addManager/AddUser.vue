<template>
  <el-dialog
    title="选择印章管理人员"
    :visible.sync="isShow"
    width="800px"
    @close="reset"
  >
    <el-table
      :data="list"
      :row-style="({ rowIndex }) => rowIndex === curIndex ? 'background: #F5F7FA;' : ''"
      @row-click="handleRowClick"
    >
      <el-table-column
        prop="name"
        align="center"
        label="姓名"
      />
      <el-table-column
        prop="username"
        align="center"
        label="登录账号"
      />
    </el-table>
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
      sealId: null,
      list: [],
      managerId: null,
      curIndex: null,
    };
  },
  methods: {
    open(sealId) {
      this.money = '';
      this.isShow = true;
      this.sealId = sealId;
      this.getList();
    },
    reset() {
      this.$utils.initData.call(this);
    },
    getList() {
      this.$api.getManagerList({
        id: this.sealId,
      }).then((res) => {
        this.list = res;
      }).finally(() => {
      });
    },
    handleRowClick(row) {
      this.curIndex = this.list.indexOf(row);
      this.managerId = row.id;
    },
    submit() {
      if (!this.managerId) {
        this.$message('请选择一个用户');
        return;
      }
      this.$api.addSealManage({
        sealId: this.sealId,
        managerId: this.managerId,
      }).then(() => {
        this.isShow = false;
        this.$message.success('添加成功');
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
