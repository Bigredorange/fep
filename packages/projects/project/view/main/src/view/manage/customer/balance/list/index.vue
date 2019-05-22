<template>
  <div>
    <top-bar>
      <section>
        <div class="item">
          <span>客户编号：</span>
          <el-input
            v-model="form.customerNo"
            placeholder="请输入客户编号"
            style="width: 200px;"
          />
        </div>
        <div class="item">
          <span>客户名称：</span>
          <el-input
            v-model="form.customerName"
            placeholder="请输入客户名称"
            style="width: 200px;"
          />
        </div>
        <div class="item">
          <span>联系人：</span>
          <el-input
            v-model="form.contactName"
            placeholder="请输入联系人"
            style="width: 200px;"
          />
        </div>
        <div class="item">
          <span>联系方式：</span>
          <el-input
            v-model="form.contactPhone"
            placeholder="请输入联系方式"
            style="width: 200px;"
          />
        </div>
        <div class="item">
          <span>状态：</span>
          <el-select
            v-model="form.status"
            style="width: 200px;"
            placeholder="请选择状态"
            @change="getList"
          >
            <el-option
              v-for="item in statusList"
              :key="item.key"
              :label="item.label"
              :value="item.key"
            />
          </el-select>
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
      <div class="buttons">
        <el-button
          type="primary"
          icon="el-icon-plus"
          @click="add"
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
          prop="customerNo"
          align="center"
          label="客户编号"
        />
        <el-table-column
          prop="customerName"
          align="center"
          label="客户名称"
        />
        <el-table-column
          prop="currentBalance"
          align="center"
          label="当前余额"
        />
        <el-table-column
          prop="contactName"
          align="center"
          label="联系人"
        />
        <el-table-column
          prop="contactPhone"
          align="center"
          label="联系方式"
        />
        <el-table-column
          prop="status"
          align="center"
          label="状态"
        >
          <template
            slot-scope="{ row }"
          >
            <div
              class="mouse"
            >
              <img :src="require(`../../../../../assets/icon/${row.status === 1 ? 'K_abled.png' : 'K_disabled.png'}`)">
              <span
                :class="{'grey': row.status === 0}"
              >
                {{ row.status === 1 ? '启用' : '禁用' }}
              </span>
            </div>
          </template>
        </el-table-column>
        <el-table-column
          prop="area"
          align="balanceLimit"
          label="是否余额控制"
          :formatter="(row) => row.balanceLimit === 1 ? '是' : '否'"
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
              查看记录
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
        customerNo: null,
        customerName: null,
        contactName: null,
        contactPhone: null,
        status: 99,
        pageCurrent: 1,
        pageSize: 20,
      },
      total: 0,
      statusList: [
        {
          key: 0,
          label: '禁用',
        },
        {
          key: 1,
          label: '启用',
        },
        {
          key: 99,
          label: '全部',
        },
      ],
      createTime: [],
    };
  },
  mounted() {
    this.getList();
  },
  methods: {
    reset() {
      this.$utils.initData.call(this, { include: ['form'] });
      this.getList();
    },
    getList() {
      this.listLoading = true;
      this.$api.getCusBalanceList({
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
      this.$router.push({ path: 'record', query: { id: row.cusBalanceId } });
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
