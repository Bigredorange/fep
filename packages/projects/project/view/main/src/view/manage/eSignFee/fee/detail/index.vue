<template>
  <div>
    <top-bar>
      <section>
        <div class="item">
          <span>费用项目：</span>
          <el-input
            v-model="form.costItem"
            placeholder="请输入费用项目"
            style="width: 200px;"
          />
        </div>
        <div class="item">
          <span>证件号码：</span>
          <el-input
            v-model="form.idno"
            placeholder="请输入证件号码"
            style="width: 200px;"
          />
        </div>
        <div class="item">
          <span>手机号</span>
          <el-input
            v-model="form.mobile"
            placeholder="请输入证件号码"
            style="width: 200px;"
          />
        </div>
        <div class="item">
          <span>日期范围：</span>
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
      <el-tabs
        v-model="curTab"
        @tab-click="getList"
      >
        <el-tab-pane
          label="消费记录"
          name="fee"
        >
          <el-table
            :data="list"
            :loading="listLoading"
          >
            <el-table-column
              prop="createTime"
              align="center"
              label="费用时间"
            />
            <el-table-column
              prop="costItem"
              align="center"
              label="费用项目"
            />
            <el-table-column
              prop="name"
              align="center"
              label="消费对象"
            />
            <el-table-column
              prop="idno"
              align="center"
              label="证件号码"
            />
            <el-table-column
              prop="mobile"
              align="center"
              label="手机号"
            />
            <el-table-column
              prop="balance"
              align="center"
              label="费用金额"
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
        </el-tab-pane>
        <el-tab-pane
          label="充值记录"
          name="charge"
        >
          <el-table
            :data="list"
            :loading="listLoading"
          >
            <el-table-column
              prop="createTime"
              align="center"
              label="费用时间"
            />
            <el-table-column
              prop="balance"
              align="center"
              label="费用金额"
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
        </el-tab-pane>
      </el-tabs>
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
        costItem: null,
        idno: null,
        mobile: null,
        pageCurrent: 1,
        pageSize: 20,
        startTime: null,
        endTime: null,
        companyId: null,
      },
      total: 0,
      curTab: 'fee',
      createTime: [],
    };
  },
  created() {
    this.companyId = this.$route.query.companyId;
    this.getList();
  },
  methods: {
    reset() {
      this.$utils.initData.call(this, { include: ['form'] });
      this.getList();
    },
    getList() {
      this.listLoading = true;
      this.$api.getCompanyBalanceLog({
        ...this.form,
        type: this.curTab === 'fee' ? 1 : 2,
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
