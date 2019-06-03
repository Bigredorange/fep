<template>
  <div>
    <top-bar>
      <section>
        <div class="item">
          <span>任务编号：</span>
          <el-input
            v-model="form.taskNo"
            placeholder="请输入任务编号"
            style="width: 200px;"
          />
        </div>
        <div class="item">
          <span>任务名称：</span>
          <el-input
            v-model="form.taskName"
            placeholder="请输入任务名称"
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
          prop="taskNo"
          align="center"
          label="任务编号"
          width="150"
          show-overflow-tooltip
        />
        <el-table-column
          prop="customerName"
          align="center"
          label="客户名称"
          width="150"
          show-overflow-tooltip
        />
        <!-- <el-table-column
          prop="companyName"
          align="center"
          label="任务来源"
          width="150"
          show-overflow-tooltip
        /> -->
        <el-table-column
          prop="taskName"
          align="center"
          label="任务名称"
        >
          <template
            slot-scope="{ row }"
          >
            <span
              class="link"
              @click="edit(row)"
            >
              {{ row.taskName }}
            </span>
          </template>
        </el-table-column>
        <el-table-column
          prop="status"
          align="center"
          label="状态"
          :formatter="({ status }) => getStatusName(status)"
        />
        <el-table-column
          prop="taskNumber"
          align="center"
          label="任务人数"
        />
        <el-table-column
          align="center"
          label="待确认人数"
        >
          <template
            slot-scope="{ row }"
          >
            <span
              class="link"
              @click="$refs.confirmTask.open(row.id, 'unconfirm')"
            >
              {{ row.applyNum }}
            </span>
          </template>
        </el-table-column>
        <el-table-column
          align="center"
          label="已指派人数"
        >
          <template
            slot-scope="{ row }"
          >
            <span
              class="link"
              @click="$refs.assignTask.open(row.id, 'assigned')"
            >
              {{ row.assignedNum }}
            </span>
          </template>
        </el-table-column>
        <el-table-column
          align="center"
          label="待上岗人数"
        >
          <template
            slot-scope="{ row }"
          >
            <span
              class="link"
              @click="$refs.onWorkTask.open(row.id, 'onWork')"
            >
              {{ row.waitWorkNum }}
            </span>
          </template>
        </el-table-column>
        <el-table-column
          align="center"
          label="待完成人数"
        >
          <template
            slot-scope="{ row }"
          >
            <span
              class="link"
              @click="$refs.todoTask.open(row.id, 'todo')"
            >
              {{ row.pendingNum }}
            </span>
          </template>
        </el-table-column>
        <el-table-column
          align="center"
          label="已完成人数"
        >
          <template
            slot-scope="{ row }"
          >
            <span
              class="link"
              @click="$refs.finishTask.open(row.id, 'finish')"
            >
              {{ row.completedNum }}
            </span>
          </template>
        </el-table-column>
        <el-table-column
          prop="paySettlement"
          align="center"
          label="薪资结算"
          :formatter="({ paySettlement }) => $optDicLabel('paySettlement', paySettlement)"
        />
        <el-table-column
          prop="amount"
          align="center"
          label="积分"
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
          prop="workStartTime"
          align="center"
          label="工作开始日期"
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
          v-if="$p('/taskManage/taskPool/list/all')"
          fixed="right"
          label="操作"
          align="center"
          width="200"
        >
          <template
            v-if="row.status === 0"
            slot-scope="{ row }"
          >
            <el-button
              v-if="$p('/taskManage/taskPool/list/assignWok')"
              type="text"
              class="primary"
              @click="assign(row)"
            >
              指派
            </el-button>
            <el-button
              v-if="$p('/taskManage/taskPool/list/revokeWok')"
              type="text"
              class="primary"
              @click="revoke(row.id)"
            >
              撤回
            </el-button>
            <el-button
              v-if="$p('/taskManage/taskPool/list/finshWok')"
              type="text"
              class="primary"
              @click="finish(row.id)"
            >
              完成
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
    <assign-task
      ref="assignTask"
      @update="getList"
    />
    <confirm-task
      ref="confirmTask"
      @update="getList"
    />
    <on-work-task
      ref="onWorkTask"
      @update="getList"
    />
    <todo-task
      ref="todoTask"
      @update="getList"
    />
    <finish-task
      ref="finishTask"
      @update="getList"
    />
  </div>
</template>
<script>
import AssignTask from './AssignTask.vue';
import ConfirmTask from './ConfirmTask.vue';
import OnWorkTask from './OnWorkTask.vue';
import TodoTask from './TodoTask.vue';
import FinishTask from './FinishTask.vue';
import ChildTree from '../../../../../components/ChildTree';

export default {
  components: {
    AssignTask,
    ConfirmTask,
    OnWorkTask,
    TodoTask,
    FinishTask,
    ChildTree,
  },
  data() {
    return {
      list: [],
      listLoading: false,
      form: {
        taskNo: null,
        taskName: null,
        status: 99,
        paySettlement: null,
        workType: null,
        pageCurrent: 1,
        pageSize: 20,
        userIdList: [],
      },
      total: 0,
      statusList: [
        {
          key: 0,
          label: '待完成',
        },
        {
          key: 1,
          label: '已完成',
        },
        {
          key: 2,
          label: '已撤回',
        },
        {
          key: 99,
          label: '全部',
        },
      ],
      customerList: [],
    };
  },
  created() {
    this.getList();
    this.getCustomerAll();
  },
  methods: {
    reset() {
      this.$utils.initData.call(this, { include: ['form'] });
      this.getList();
    },
    getList() {
      this.listLoading = true;
      this.$api.getWorkTaskPoolList({
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
    edit(row) {
      this.$router.push({ path: '/manage/workOrder/order/detail', query: { id: row.workOrderId } });
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
    finish(id) {
      this.$dialogs.confirm({
        title: '提示',
        content: '确定要结束任务吗？',
        onOk: () => {
          this.$api.finishWorkTask({
            id,
          }).then(() => {
            this.$message.success('结束成功');
            this.getList();
          });
        },
      });
    },
    revoke(id) {
      this.$dialogs.confirm({
        title: '提示',
        content: '确定要撤回吗？',
        onOk: () => {
          this.$api.revokeWorkTask({
            id,
          }).then(() => {
            this.$message.success('撤回成功');
            this.getList();
          });
        },
      });
    },
    assign(row) {
      // this.$refs.confirmTask.open(row);
      this.$router.push({ path: 'assign', query: { id: row.id } });
    },
    getStatusName(status) {
      let name = '';
      switch (status) {
        case 0:
          name = '待完成';
          break;
        case 1:
          name = '已完成';
          break;
        case 2:
          name = '已撤回';
          break;
      }
      return name;
    },
    getCustomerAll() {
      this.isLoading = true;
      this.$api.getCustomerAll().then((res) => {
        this.customerList = res;
      }).finally(() => {
        this.isLoading = false;
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
  .link {
    color: #1b559d;
    font-weight: 500;
    cursor: pointer;
  }
}
</style>
