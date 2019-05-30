<template>
  <div>
    <top-bar>
      <section>
        <div class="item">
          <span>工单编号：</span>
          <el-input
            v-model="form.workOrderNo"
            placeholder="请输入工单编号"
            style="width: 200px;"
          />
        </div>
        <div class="item">
          <span>工单名称：</span>
          <el-input
            v-model="form.workOrderName"
            placeholder="请输入工单名称"
            style="width: 200px;"
          />
        </div>
        <div class="item">
          <span>薪资结算：</span>
          <el-select
            v-model="form.paySettlement"
            style="width: 200px;"
            placeholder="请选择薪资结算"
            @change="getList"
          >
            <el-option
              v-for="item in $opt('paySettlement')"
              :key="item.dictKey"
              :label="item.dictValue"
              :value="item.dictKey"
            />
          </el-select>
        </div>
        <div class="item">
          <span>工种：</span>
          <el-select
            v-model="form.workType"
            style="width: 200px;"
            placeholder="请选择工种"
            @change="getList"
          >
            <el-option
              v-for="item in $opt('typeofwork')"
              :key="item.dictKey"
              :label="item.dictValue"
              :value="item.dictKey"
            />
          </el-select>
        </div>
        <div class="item">
          <span>客户名称：</span>
          <el-select
            v-model="form.customerId"
            placeholder="请选择客户"
            style="width: 200px;"
          >
            <el-option
              v-for="item in customerList"
              :key="item.id"
              :label="item.customerName"
              :value="item.id"
            />
          </el-select>
        </div>
        <div class="item">
          <span>部门或人员：</span>
          <child-tree
            ref="childTree"
            @selected="selectedChildTree"
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
      <div class="buttons">
        <el-button
          @click="exportData"
        >
          导出
        </el-button>
      </div>
      <el-table
        :data="list"
        :loading="listLoading"
      >
        <el-table-column
          prop="customerName"
          align="center"
          label="客户名称"
          width="150"
          show-overflow-tooltip
        />
        <el-table-column
          prop="workOrderNo"
          align="center"
          label="工单编号"
          width="150"
          show-overflow-tooltip
        />
        <el-table-column
          prop="companyName"
          align="center"
          label="工单来源"
          width="150"
          show-overflow-tooltip
        />
        <el-table-column
          prop="workOrderName"
          align="center"
          label="工单名称"
          width="150"
          show-overflow-tooltip
        />
        <el-table-column
          prop="workOrderFee"
          align="center"
          label="工单费用"
        />
        <el-table-column
          prop="recruitsNumber"
          align="center"
          label="招聘人数"
        />
        <el-table-column
          prop="paySettlement"
          align="center"
          label="薪资结算"
          :formatter="({ paySettlement }) => $optDicLabel('paySettlement', paySettlement)"
        />
        <el-table-column
          prop="amount"
          align="center"
          label="金额(元)"
        />
        <el-table-column
          prop="unit"
          align="center"
          label="单位"
          :formatter="({ unit }) => $optDicLabel('orderUnit', unit)"
        />
        <el-table-column
          prop="workType"
          align="center"
          label="工种"
          :formatter="({ workType }) => $optDicLabel('typeofwork', workType)"
        />
        <el-table-column
          prop="workPlanDate"
          align="center"
          label="工作计划日期"
        />
        <el-table-column
          prop="validityPeriod"
          align="center"
          label="有效期限"
          :formatter="({ validityPeriod }) => $optDicLabel('Expirydate', validityPeriod)"
        />
        <el-table-column
          prop="startDate"
          align="center"
          label="开始日期"
        />
        <el-table-column
          prop="endDate"
          align="center"
          label="截止日期"
        />
        <el-table-column
          prop="workArea"
          align="center"
          label="工作区域"
          width="150"
          show-overflow-tooltip
        />
        <el-table-column
          prop="applicantName"
          align="center"
          label="申请人"
        />
        <el-table-column
          prop="applicationTime"
          align="center"
          label="申请时间"
          width="150"
          show-overflow-tooltip
        />
        <!-- <el-table-column
          prop="createTime"
          align="center"
          label="审核人"
        />
        <el-table-column
          prop="createTime"
          align="center"
          label="审核时间"
        /> -->
        <el-table-column
          fixed="right"
          label="操作"
          align="center"
          width="200"
        >
          <template
            slot-scope="{ row }"
          >
            <el-button
              type="text"
              class="primary"
              @click="check(row)"
            >
              审核
            </el-button>
            <el-button
              type="text"
              class="primary"
              @click="revoke(row)"
            >
              驳回
            </el-button>
            <el-button
              type="text"
              class="primary"
              @click="detail(row)"
            >
              详情
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
  </div>
</template>
<script>
import ChildTree from '../../../../../components/ChildTree';

export default {
  components: {
    ChildTree,
  },
  data() {
    return {
      list: [],
      listLoading: false,
      form: {
        workOrderNo: null,
        workOrderName: null,
        contactName: null,
        customerName: null,
        paySettlement: null,
        status: 1,
        validityPeriod: null,
        workPlanStartTime: null,
        workPlanEndTime: null,
        workType: null,
        pageCurrent: 1,
        pageSize: 20,
        userIdList: [],
      },
      total: 0,
      statusList: [
        {
          key: 1,
          label: '待审核',
        },
        {
          key: 2,
          label: '已驳回',
        },
        {
          key: 3,
          label: '已通过',
        },
        {
          key: 99,
          label: '全部',
        },
      ],
      createTime: [],
      customerList: [],
    };
  },
  mounted() {
    this.getCustomerAll();
    this.getList();
  },
  methods: {
    reset() {
      this.$utils.initData.call(this, { include: ['form'] });
      this.getList();
    },
    getList() {
      this.listLoading = true;
      this.$api.getWorkOrderList({
        ...this.form,
        companyId: this.$store.state.fepUserInfo.companyId,
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
    detail(row) {
      this.$router.push({ path: 'detail', query: { id: row.id } });
    },
    selectDate(val) {
      const [start, end] = val;
      this.form.workPlanStartTime = start;
      this.form.workPlanEndTime = end;
    },
    exportData() {
      this.$api.exportWorkOrder({
        ...this.form,
      }).then((res) => {
        this.$api.fileDownloadById({
          fileId: res,
          name: '工单.xlsx',
        });
      });
    },
    check(row) {
      this.$dialogs.confirm({
        title: '提示',
        content: '确定要审核通过吗？',
        onOk: () => {
          this.changeWorkOrder(row.id, 3);
        },
      });
    },
    revoke(row) {
      this.$dialogs.confirm({
        title: '提示',
        content: '确定要驳回吗？',
        onOk: () => {
          this.changeWorkOrder(row.id, 2);
        },
      });
    },
    changeWorkOrder(id, status) {
      this.$api.changeWorkOrder({
        id,
        status,
      }).then(() => {
        this.$message.success(`${status === 3 ? '通过' : '驳回'}成功`);
        this.getList();
      });
    },
    getStatusName(status) {
      let name = '';
      switch (status) {
        case 1:
          name = '待审核';
          break;
        case 2:
          name = '已审核';
          break;
        case 3:
          name = '已驳回';
          break;
      }
      return name;
    },
    selectedChildTree(selection) {
      this.form.userIdList = [];
      selection.forEach((item) => {
        if (item.userId) {
          this.form.userIdList.push(item.userId);
        }
      });
      this.getList();
    },
    getCustomerAll() {
      this.isLoading = true;
      this.$api.getCustomerAll().then((res) => {
        this.customerList = res;
      }).finally(() => {
        this.isLoading = false;
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
