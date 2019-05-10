<template>
  <div>
    <el-dialog
      :close-on-click-modal="false"
      :visible.sync="isShow"
      title="选择客户"
      width="1000px"
      class="ui-dialog"
      append-to-body
      @close="reset"
    >
      <div style="marginBottom: 16px;">
        <el-input
          v-model.trim="searchContent"
          class="ui-input-search"
          placeholder="请输入客户名称或客户简称"
          size="small"
          style="width: 400px;"
          @keyup.enter.native="search"
        >
          <el-button
            slot="append"
            size="small"
            icon="el-icon-search"
            @click="search"
          />
        </el-input>
      </div>
      <el-table
        v-loading="listLoading"
        :data="list"
        border
        highlight-current-row
        :max-height="$store.state.tableHeight"
        @row-click="select"
      >
        <el-table-column
          label="序号"
          width="40"
          :formatter="(row, column, cellValue, index) => (current - 1) * pageSize + index + 1"
        />
        <el-table-column
          prop="customerNo"
          label="客商编号"
          show-overflow-tooltip
        />
        <el-table-column
          prop="customerName"
          label="客户名称"
          show-overflow-tooltip
        />
        <el-table-column
          prop="customerSimpleName"
          label="客户简称"
          show-overflow-tooltip
        />
      </el-table>
      <el-pagination
        slot="footer"
        class="ui-pagination inline"
        :current-page.sync="current"
        :page-size="pageSize"
        :page-sizes="[20, 40, 60, 80, 100]"
        layout="sizes, prev, pager, next"
        :total="total"
        @current-change="getList"
        @size-change="sizeChange"
      />
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isShow: false,
      listLoading: false,
      pageSize: 20,
      current: 1,
      total: 0,
      searchContent: null,
      curSearchContent: null,
      list: [],
    };
  },
  methods: {
    reset() {
      this.$utils.initData.call(this);
    },
    open() {
      this.isShow = true;
      this.getList();
    },
    getList() {
      this.listLoading = true;
      this.$api.searchCustomerByKf({
        pageCurrent: this.current,
        pageSize: this.pageSize,
        searchContent: this.curSearchContent,
      }).then((res) => {
        this.total = res.allCount;
        this.list = res.dataList;
      }).catch(() => {}).finally(() => {
        this.listLoading = false;
      });
    },
    search() {
      this.curSearchContent = this.searchContent;
      this.current = 1;
      this.getList();
    },
    select(row) {
      this.$emit('select', row);
      this.isShow = false;
    },
    sizeChange(n) {
      if (n === this.pageSize) return;
      this.pageSize = n;
      this.getList();
    },
  },
};
</script>
