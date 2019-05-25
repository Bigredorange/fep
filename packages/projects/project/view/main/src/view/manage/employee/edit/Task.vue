<template>
  <el-table
    :data="list"
  >
    <el-table-column
      prop="event"
      align="center"
      label="任务编号"
    />
    <el-table-column
      prop="operator"
      align="center"
      label="服务客户"
    />
    <el-table-column
      prop="contactPhone"
      align="center"
      label="工作区域"
    />
    <el-table-column
      prop="area"
      align="center"
      label="工种"
    />
    <el-table-column
      prop="createTime"
      align="center"
      label="开始日期"
    />
    <el-table-column
      prop="createTime"
      align="center"
      label="结束日期"
    />
  </el-table>
</template>
<script>
export default {
  props: {
    list: {
      type: Array,
      default: () => [],
    },
  },
};
</script>
