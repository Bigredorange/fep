<template>
  <div>
    <top-bar>
      <section>
        <div class="item">
          <span>客户编号：</span>
          <el-input
            v-model="form.customerNO"
            placeholder="请输入客户编号"
            style="width: 200px;"
          />
        </div>
        <div class="item">
          <span>客户编号：</span>
          <el-input
            v-model="form.customerNO"
            placeholder="请输入客户编号"
            style="width: 200px;"
          />
        </div>
        <div class="item">
          <span>客户编号：</span>
          <el-input
            v-model="form.customerNO"
            placeholder="请输入客户编号"
            style="width: 200px;"
          />
        </div>
        <div class="item">
          <span>客户编号：</span>
          <el-input
            v-model="form.customerNO"
            placeholder="请输入客户编号"
            style="width: 200px;"
          />
        </div>
        <div class="item">
          <span>客户编号：</span>
          <el-input
            v-model="form.customerNO"
            placeholder="请输入客户编号"
            style="width: 200px;"
          />
        </div>
        <div class="item">
          <span>创建日期：</span>
          <!-- <el-input
            v-model="form.customerNO"
            placeholder="请输入客户编号"
            style="width: 200px;"
          /> -->
          <el-date-picker
            v-model="form.customerNO"
            style="width: 260px;"
            type="daterange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
          />
        </div>
        <el-button
          type="primary"
          icon="el-icon-search"
          style="margin-left:20px;"
        >
          查询
        </el-button>
        <el-button>重置</el-button>
      </section>
    </top-bar>
    <div class="con-table">
      <div class="buttons">
        <el-button
          type="primary"
          icon="el-icon-plus"
        >
          新增
        </el-button>
        <el-button>导出</el-button>
      </div>
      <el-table
        :data="list"
        :loading="listLoading"
      >
        <el-table-column
          prop="customerNO"
          label="客户编号"
        />
      </el-table>
      <affix
        direction="bottom"
        :offset="0"
      >
        <el-pagination
          class="ui-pagination"
          :current-page.sync="form.pageCurrent"
          :page-size="form.pageSize"
          :page-sizes="[20, 40, 60, 80, 100]"
          layout="slot, sizes, prev, pager, next"
          :total="total"
          @current-change="getList"
          @size-change="sizeChange"
        >
          <span class="total">{{ total }} 条记录，共 {{ Math.ceil(total / form.pageSize) }} 页</span>
        </el-pagination>
      </affix>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      list: [],
      listLoading: false,
      form: {
        customerNO: null,
        contractType: null,
        contractName: null,
        pageCurrent: 1,
        pageSize: 20,
      },
      total: 0,
    };
  },
  methods: {
    getList() {
      // this.listLoading = true;
      // this.$api.contractContractList(this.form).then((res) => {
      //   this.list = res.dataList;
      //   this.total = res.allCount;
      // }).finally(() => {
      //   this.listLoading = false;
      // });
    },
    sizeChange(n) {
      this.form.pageSize = n;
      this.getList();
    },
  },
};
</script>
<style lang="scss" scoped>
.con-table {
  background: #fff;
  padding: 15px 20px;
  border-radius: 10px;
  margin: 0px 8px 8px;
  .buttons {
    display: flex;
    margin-bottom: 16px;
  }
}
</style>
