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
        <div class="item">
          <span>有效期限：</span>
          <el-select
            v-model="form.validityPeriod"
            style="width: 200px;"
            placeholder="请选择有效期限"
            @change="getList"
          >
            <el-option
              v-for="item in $opt('Expirydate')"
              :key="item.dictKey"
              :label="item.dictValue"
              :value="item.dictKey"
            />
          </el-select>
        </div>
        <div class="item">
          <span>工种：</span>
          <el-autocomplete
            v-model="form.workType"
            style="width: 200px;"
            class="inline-input"
            :fetch-suggestions="querySearch"
            placeholder="请输入工种"
            value-key="dictValue"
            @select="getList"
          />
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
          <span>计划日期：</span>
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
          type="primary"
          icon="el-icon-plus"
          @click="add"
        >
          新增
        </el-button>
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
          prop="taskUnitPrice"
          align="center"
          label="任务单价"
        />
        <el-table-column
          prop="contactName"
          align="center"
          label="状态"
          :formatter="({ status }) => getStatusName(status)"
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
        <el-table-column
          prop="reviewName"
          align="center"
          label="审核人"
        />
        <el-table-column
          prop="reviewTime"
          align="center"
          label="审核时间"
          width="150"
          show-overflow-tooltip
        />
        <el-table-column
          fixed="right"
          label="操作"
          align="center"
          width="160"
        >
          <template
            slot-scope="{ row }"
          >
            <el-button
              v-if="row.status === 0 || row.status === 2"
              type="text"
              class="primary"
              @click="submit(row)"
            >
              提交审核
            </el-button>
            <el-button
              v-if="row.status === 0 || row.status === 2"
              type="text"
              class="primary"
              @click="edit(row)"
            >
              编辑
            </el-button>
            <el-button
              v-if="row.status === 1 || row.status === 3"
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
        customerId: null,
        paySettlement: null,
        status: 99,
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
          key: 0,
          label: '待提交',
        },
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
  created() {
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
      this.form.workPlanStartTime = start;
      this.form.workPlanEndTime = end;
    },
    add() {
      this.$router.push('edit');
    },
    getStatusName(status) {
      let name = '';
      switch (status) {
        case 0:
          name = '待提交';
          break;
        case 1:
          name = '待审核';
          break;
        case 2:
          name = '已驳回';
          break;
        case 3:
          name = '已通过';
          break;
      }
      return name;
    },
    submit(row) {
      this.$dialogs.confirm({
        title: '提示',
        content: '确定要提交审核吗？',
        onOk: () => {
          this.changeWorkOrder(row.id, 1);
        },
      });
    },
    changeWorkOrder(id, status) {
      this.$api.changeWorkOrder({
        id,
        status,
      }).then(() => {
        this.$message.success('提交成功');
        this.getList();
      });
    },
    exportData() {
      this.$api.exportWorkOrder({
        ...this.form,
      }).then((res) => {
        this.$api.fileDownloadById({
          fileId: res,
        });
      });
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
    detail(row) {
      this.$router.push({ path: 'detail', query: { id: row.id } });
    },
    createFilter(queryString) {
      const temp = (restaurant) => {
        const tempArr = (restaurant.dictValue.indexOf(queryString) === 0);
        return tempArr;
      };
      return temp;
    },
    querySearch(queryString, cb) {
      const workList = this.$opt('typeofwork');
      const results = queryString ? workList.filter(this.createFilter(queryString)) : workList;
      console.log(results);
      // 调用 callback 返回建议列表的数据
      cb(results);
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
