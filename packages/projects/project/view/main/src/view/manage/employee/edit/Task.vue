<template>
  <div style="width: 100%;">
    <el-table
      :data="list"
      :loading="isLoading"
    >
      <el-table-column
        prop="taskNo"
        align="center"
        label="任务编号"
      />
      <el-table-column
        prop="customerName"
        align="center"
        label="服务客户"
      />
      <el-table-column
        prop="workAddress"
        align="center"
        label="工作区域"
      />
      <el-table-column
        prop="workType"
        align="center"
        label="工种"
      />
      <el-table-column
        prop="gotoWorkTime"
        align="center"
        label="开始日期"
      />
      <el-table-column
        prop="completeTime"
        align="center"
        label="结束日期"
      />
    </el-table>
    <el-pagination
      class="ui-pagination"
      :current-page.sync="pageCurrent"
      :page-size="pageSize"
      :page-sizes="[20, 40, 60, 80, 100]"
      layout="slot, sizes, prev, pager, next"
      :total="total"
      @current-change="getList"
      @size-change="sizeChange"
    >
      <span class="total">{{ total }} 条记录，共 {{ Math.ceil(total / pageSize) }} 页</span>
    </el-pagination>
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
      isLoading: false,
      pageCurrent: 1,
      pageSize: 20,
      total: 0,
    };
  },
  created() {
    this.getList();
  },
  methods: {
    sizeChange(n) {
      this.pageSize = n;
      this.pageCurrent = 1;
      this.getList();
    },
    getList() {
      this.isLoading = true;
      const { pageCurrent, pageSize } = this;
      this.$api.getEmployeeTask({
        id: this.employeeId,
        pageCurrent,
        pageSize,
      }).then((res) => {
        this.list = res.dataList;
        this.total = res.allCount;
      }).finally(() => {
        this.isLoading = false;
      });
    },
  },
};
</script>
