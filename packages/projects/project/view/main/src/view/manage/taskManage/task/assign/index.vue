<template>
  <div>
    <top-bar>
      <section>
        <div class="item">
          <span>手机号码：</span>
          <el-input
            v-model="form.mobile"
            placeholder="请输入手机号码"
            style="width: 200px;"
          />
        </div>
        <div class="item">
          <span>是否在线：</span>
          <el-select
            v-model="form.state"
            placeholder="请选择"
            style="width: 200px;"
          >
            <el-option value="全部" />
            <el-option value="在线" />
            <el-option value="离线" />
          </el-select>
        </div>
        <div class="item">
          <span>指派状态：</span>
          <el-select
            v-model="form.assignStatus"
            placeholder="请选择"
            style="width: 200px;"
          >
            <el-option value="全部" />
            <el-option value="已指派" />
            <el-option value="未指派" />
          </el-select>
        </div>
        <div
          class="item"
        >
          <el-checkbox
            v-model="form.showOnly"
          >
            只看服务过当前客户的灵工
          </el-checkbox>
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
          :disabled="selection.length === 0"
          @click="assign"
        >
          批量指派
        </el-button>
      </div>
      <el-table
        :data="list"
        :loading="listLoading"
        @selection-change="(select) => selection = select"
      >
        <el-table-column
          type="selection"
          align="center"
          :selectable="(row) => row.assignStatus === '未指派'"
        />
        <el-table-column
          prop="archivesNo"
          align="center"
          label="档案编号"
        />
        <el-table-column
          prop="empName"
          align="center"
          label="姓名"
        />
        <el-table-column
          prop="mobile"
          align="center"
          label="手机号码"
        />
        <el-table-column
          prop="lastAddress"
          align="center"
          label="最新地址"
        />
        <el-table-column
          align="center"
          label="性别"
          :formatter="({ sex }) => $optDicLabel('Sex', sex)"
        />
        <el-table-column
          prop="companyName"
          align="center"
          label="来源"
        />
        <el-table-column
          prop="workType"
          align="center"
          label="工种"
          :formatter="({ workType }) => getWorkTypeName(workType)"
        />
        <!-- <el-table-column
          prop="confirmCount"
          align="center"
          label="待接单任务数"
        />
        <el-table-column
          prop="acceptCount"
          align="center"
          label="已接单任务数"
        />
        <el-table-column
          prop="goToWorkCount"
          align="center"
          label="待上岗任务数"
        />
        <el-table-column
          prop="toDoCount"
          align="center"
          label="待完成任务数"
        />
        <el-table-column
          prop="finishCount"
          align="center"
          label="已完成任务数"
        /> -->
        <el-table-column
          prop="state"
          align="center"
          label="是否在线"
        />
        <el-table-column
          prop="assignStatus"
          align="center"
          label="指派状态"
        />
        <el-table-column
          label="操作"
          align="center"
          width="200"
        >
          <template
            slot-scope="{ row }"
          >
            <el-button
              v-if="row.assignStatus === '未指派'"
              v-loading="loading"
              type="text"
              class="primary"
              @click="assign(row)"
            >
              指派
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
export default {
  data() {
    return {
      list: [],
      listLoading: false,
      form: {
        mobile: null,
        assignStatus: null,
        state: '全部',
        showOnly: false,
        pageCurrent: 1,
        pageSize: 20,
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
      ],
      selection: [],
      workTaskId: false,
      loading: false,
    };
  },
  mounted() {
    this.workTaskId = this.$route.query.id;
    this.getList();
  },
  methods: {
    reset() {
      this.$utils.initData.call(this, { include: ['form'] });
      this.getList();
    },
    getList() {
      this.listLoading = true;
      this.$api.getNotAssignList({
        ...this.form,
        id: this.workTaskId,
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
      this.$router.push({ path: '/manage/workOrder/check/edit', query: { id: row.workOrderId } });
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
      // this.loading = false;
      let empIds = [];
      if (row.id) {
        empIds.push(row.id);
      } else {
        empIds = this.selection.map(item => item.id);
      }
      this.$api.assignEmpWorkTask({
        id: this.workTaskId,
        empIds,
      }).then(() => {
        this.$message.success('指派任务成功');
        this.getList();
      }).finally(() => {
        // this.loading = true;
      });
    },
    getWorkTypeName(workType) {
      let name = '';
      if (workType) {
        const arr = workType.split(',');
        name = arr.map((label) => {
          const labelName = this.$optDicLabel('typeofwork', label);
          return labelName;
        }).join(',');
      }
      return name;
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
  .link {
    color: #1b559d;
    font-weight: 500;
    cursor: pointer;
  }
  /deep/ .el-radio-button__orig-radio:checked+.el-radio-button__inner {
    background-color: #356fb8;
    border-color: #356fb8;
  }
}
</style>
