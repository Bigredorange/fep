<template>
  <div>
    <top-bar>
      <section>
        <div class="item">
          <span>事件：</span>
          <el-input
            v-model="form.event"
            placeholder="请输入事件"
            style="width: 200px;"
          />
        </div>
        <div class="item">
          <span>操作人：</span>
          <el-input
            v-model="form.operator"
            placeholder="请输入操作人"
            style="width: 200px;"
          />
        </div>
        <div class="item">
          <span>操作时间：</span>
          <el-date-picker
            v-model="createTime"
            style="width: 260px;"
            type="daterange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            value-format="yyyy-MM-dd"
            @change="selectDate"
          />
        </div>
        <div
          class="item"
        >
          <el-button
            type="primary"
            icon="el-icon-search"
            @click="getList"
          >
            查询
          </el-button>
          <el-button
            @click="reset"
          >
            重置
          </el-button>
        </div>
      </section>
    </top-bar>
    <div class="con-table">
      <el-table
        :data="list"
        :loading="listLoading"
      >
        <el-table-column
          prop="event"
          align="center"
          label="事件"
        />
        <el-table-column
          prop="operator"
          align="center"
          label="操作人"
        />
        <!-- <el-table-column
          prop="area"
          align="center"
          label="创建人"
        /> -->
        <el-table-column
          prop="createTime"
          align="center"
          label="操作时间"
        />
        <el-table-column
          prop="cost"
          align="center"
          label="费用"
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
        event: null,
        operator: null,
        pageCurrent: 1,
        pageSize: 20,
        startTime: null,
        endTime: null,
      },
      total: 0,
      createTime: [],
    };
  },
  created() {
    this.getList();
  },
  methods: {
    reset() {
      this.$utils.initData.call(this, { include: ['form'] });
      this.getList();
    },
    getList() {
      this.listLoading = true;
      this.$api.getCusBalanceRecord({
        ...this.form,
        id: this.$route.query.id,
      }).then((res) => {
        this.list = res.dataList;
        this.total = res.allCount;
      }).finally(() => {
        this.listLoading = false;
      });
    },
    sizeChange(n) {
      this.form.pageSize = n;
      this.getList();
    },
    edit(row) {
      this.$router.push({ path: 'edit', query: { id: row.id } });
    },
    selectDate(val) {
      const [start, end] = val;
      this.form.startTime = start;
      this.form.endTime = end;
    },
    disable(item) {
      this.$dialogs.confirm({
        title: '提示',
        content: `确定要${item.status === 1 ? '禁用' : '启用'}吗？`,
        onOk: () => {
          this.$api.disableCustomer({
            id: item.id,
            status: Number(!item.status),
          }).then(() => {
            this.$message.success(`${item.status === 1 ? '禁用' : '启用'}成功`);
            this.getList();
          });
        },
      });
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
  .grey {
    color: #999999;
  }
  .mouse {
    cursor: pointer;
  }
}
</style>
