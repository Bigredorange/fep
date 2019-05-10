<template>
  <el-dialog
    class="ui-dialog"
    :visible.sync="isShow"
    title="选择用户"
    width="800px"
    @close="reset"
  >
    <el-input
      v-model="form.searchContent"
      class="ui-input-search"
      clearable
      size="small"
      placeholder="请输入用户名"
      @keyup.enter.native="search"
    >
      <el-button
        slot="append"
        icon="el-icon-search"
        @click="search"
      />
    </el-input>
    <el-table
      v-loading="isLoading"
      border
      stripe
      style="width: 100%"
      tooltip-effect="dark"
      :data="list"
      :max-height="$store.state.tableHeight"
    >
      <el-table-column
        label="序号"
        width="40"
        align="center"
        :formatter="(row, column, cellValue, index) => (pageNum - 1) * pageSize + index + 1"
      />
      <el-table-column
        show-overflow-tooltip
        prop="account"
        label="账号"
        min-width="90"
        align="center"
      />
      <el-table-column
        show-overflow-tooltip
        prop="username"
        label="用户名"
        min-width="90"
        align="center"
      />
      <el-table-column
        show-overflow-tooltip
        prop="phone"
        label="手机号码"
        min-width="90"
        align="center"
      />
      <el-table-column
        show-overflow-tooltip
        prop="email"
        label="邮箱"
        min-width="90"
        align="center"
      />
      <el-table-column
        show-overflow-tooltip
        prop="roles"
        label="角色"
        min-width="90"
        align="center"
      />
      <el-table-column
        show-overflow-tooltip
        prop="enable"
        label="状态"
        width="60"
        align="center"
      >
        <template slot-scope="{ row }">
          <span v-if="row.enable">启用</span>
          <span
            v-else
            style="color: #cc0000;"
          >停用</span>
        </template>
      </el-table-column>
      <el-table-column
        show-overflow-tooltip
        fixed="right"
        label="操作"
        width="90"
        align="center"
      >
        <template slot-scope="{ row }">
          <el-button
            type="primary"
            size="mini"
            @click="select(row)"
          >
            选择
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      slot="footer"
      :current-page.sync="pageNum"
      :page-sizes="[10, 20, 30, 40]"
      :page-size="pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
      @size-change="sizeChange"
      @current-change="getList"
    />
  </el-dialog>
</template>

<script>
export default {
  props: {
    departmentId: {
      type: Number,
      default: null,
    },
    curSelection: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      isShow: false,
      isLoading: false,
      form: {
        searchContent: '',
        departmentId: null,
      },
      searching: {
        searchContent: '',
        departmentId: null,
      },
      list: [],
      pageNum: 1,
      pageSize: 10,
      total: 0,
    };
  },
  methods: {
    reset() {
      this.$utils.initData.call(this);
    },
    close() {
      this.reset();
      this.isShow = false;
    },
    open() {
      this.isShow = true;
      if (this.departmentId) {
        this.form.departmentId = this.departmentId;
        this.searching.departmentId = this.departmentId;
      }
      this.getList();
    },
    search() {
      this.pageNum = 1;
      this.searching = { ...this.form };
      this.getList();
    },
    getList() {
      this.isLoading = true;
      const args = {
        ...this.searching,
        pageSize: this.pageSize,
        pageCurrent: this.pageNum,
      };
      this.$api.organizationExternalAllUser(args).then((res) => {
        const {
          dataList,
          allCount,
        } = res;
        this.list = dataList;
        this.total = allCount;
      }).finally(() => {
        this.isLoading = false;
      });
    },
    sizeChange(n) {
      if (n === this.pageSize) return;
      const isReduce = n < this.pageSize;
      this.pageSize = n;
      if (isReduce) {
        this.getList();
      } else {
        const page = Math.ceil(this.total / n);
        if (page >= this.pageNum) {
          this.getList();
        }
      }
    },
    select(row) {
      this.close();
      this.$emit('select', row);
    },
  },
};
</script>

<style lang="scss" scoped>
.ui-input-search {
  width: 300px;
  margin-bottom: 20px;
}
</style>
