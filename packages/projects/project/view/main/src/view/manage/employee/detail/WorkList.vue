<template>
  <div class="work-list">
    <el-table
      :data="list"
      :loading="listLoading"
    >
      <el-table-column
        prop="workType"
        align="center"
        label="工种"
      />
      <el-table-column
        prop="startDate"
        align="center"
        label="开始日期"
      />
      <el-table-column
        prop="endDate"
        align="center"
        label="结束日期"
      />
      <el-table-column
        prop="workArea"
        align="center"
        label="工作区域"
      />
      <!-- <el-table-column
            prop="area"
            align="center"
            label="创建人"
      />-->
    </el-table>
  </div>
</template>
<script>
export default {
  props: {
    employeeId: {
      type: [Number, String],
      default: null,
    },
  },
  data() {
    return {
      list: [],
      listLoading: false,
    };
  },
  created() {
    this.getList();
  },
  methods: {
    getList() {
      this.listLoading = true;
      this.$api
        .getEmployeeWorkList({
          id: this.employeeId,
        })
        .then((res) => {
          this.list = res;
        })
        .finally(() => {
          this.listLoading = false;
        });
    },
  },
};
</script>
<style lang="scss" scoped>
.work-list {
  width: 100%;
  .el-table {
    margin-top: 10px;
  }
}
</style>
