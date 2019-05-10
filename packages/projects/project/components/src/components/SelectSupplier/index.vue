<template>
  <div>
    <el-dialog
      :close-on-click-modal="false"
      :visible.sync="isShow"
      title="选择供应商"
      width="1000px"
      class="ui-dialog"
      append-to-body
      @close="reset"
    >
      <div style="marginBottom: 16px;">
        <el-input
          v-model.trim="searchContent"
          class="ui-input-search"
          placeholder="请输入供应商名称"
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
          prop="supplierNo"
          label="供应商编号"
          fit
          align="center"
          width="100"
        />
        <el-table-column
          prop="supplierName"
          label="供应商名称"
          fit
          align="center"
          width="200"
        >
          <template slot-scope="scope">
            <span style="display:block;width:100%;text-align:left;">
              {{ scope.row.supplierName }}
            </span>
          </template>
        </el-table-column>
        <el-table-column
          prop="supplierShortName"
          label="供应商简称"
          fit
          align="center"
          width="100"
        />
        <el-table-column
          prop="type"
          label="客户详情"
          fit
          align="center"
          width="70"
        >
          <template slot-scope="scope">
            <span v-if="scope.row.type===0">外部供应商</span>
            <span v-else-if="scope.row.type===1">内部供应商</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="supplierContact"
          label="供应商联系人"
          fit
          align="center"
          width="100"
        />
        <el-table-column
          prop="supplierPhone"
          label="供应商联系电话"
          fit
          align="center"
          width="100"
        />
        <el-table-column
          prop="supplierEmail"
          label="供应商联系邮箱"
          fit
          align="center"
          width="100"
        />
        <el-table-column
          prop="supplierAccountBankName"
          label="供应商账号开户银行"
          fit
          align="center"
          width="150"
        />
        <el-table-column
          prop="supplierAccountName"
          label="供应商账户名称"
          fit
          align="center"
          width="200"
        />
        <el-table-column
          prop="supplierBankAccount"
          label="供应商银行收款账号"
          fit
          align="center"
          width="100"
        />
        <el-table-column
          prop="supplierCompanyAddress"
          label="供应商公司地址"
          fit
          align="center"
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
      this.$api.getServiceSupplier({
        currPage: this.current,
        pageSize: this.pageSize,
        paramNames: JSON.stringify({ paramName: this.searchContent }),
      }).then((res) => {
        this.list = res.list;
        this.total = res.total;
      }).finally(() => {
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
