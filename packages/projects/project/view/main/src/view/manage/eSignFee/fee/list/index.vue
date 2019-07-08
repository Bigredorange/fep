<template>
  <div>
    <top-bar>
      <section>
        <div class="item">
          <span>HRO编号：</span>
          <el-input
            v-model="form.enterpriseNum"
            placeholder="请输入HRO编号"
            style="width: 200px;"
          />
        </div>
        <div class="item">
          <span>HRO名称：</span>
          <el-input
            v-model="form.companyName"
            placeholder="请输入HRO名称"
            style="width: 200px;"
          />
        </div>
        <div class="item">
          <span>联系人：</span>
          <el-input
            v-model="form.linkman"
            placeholder="请输入联系人"
            style="width: 200px;"
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
          prop="enterpriseNum"
          align="center"
          label="HRO编号"
        />
        <el-table-column
          prop="companyName"
          align="center"
          label="HRO名称"
        />
        <el-table-column
          prop="linkman"
          align="center"
          label="联系人"
        />
        <el-table-column
          prop="balance"
          align="center"
          label="账户余额"
        />
        <el-table-column
          label="操作"
          align="center"
          width="160"
        >
          <template
            slot-scope="{ row }"
          >
            <el-button
              v-if="$p('/eSignFee/fee/list/recharge')"
              type="text"
              class="primary"
              @click="recharge(row)"
            >
              充值
            </el-button>
            <el-button
              type="text"
              class="primary"
              @click="checkRecord(row)"
            >
              查看详情
            </el-button>
          </template>
        </el-table-column>
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
    <recharge
      ref="recharge"
      @update="getList"
    />
  </div>
</template>
<script>
import Recharge from './Recharge.vue';

export default {
  components: {
    Recharge,
  },
  data() {
    return {
      list: [],
      listLoading: false,
      form: {
        enterpriseNum: null,
        companyName: null,
        linkman: null,
        contactPhone: null,
        status: 99,
        pageCurrent: 1,
        pageSize: 20,
      },
      total: 0,
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
      this.$api.getCompanyBalanceList({
        ...this.form,
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
    recharge(row) {
      this.$refs.recharge.open(row);
    },
    checkRecord(row) {
      this.$router.push({ path: 'detail', query: { companyId: row.companyId } });
    },
    selectDate(val) {
      const [start, end] = val;
      this.form.startTime = start;
      this.form.endTime = end;
    },
    add() {
      this.$router.push('edit');
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
