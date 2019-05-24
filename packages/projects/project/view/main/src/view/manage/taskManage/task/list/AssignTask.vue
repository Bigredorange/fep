<template>
  <div>
    <el-dialog
      :title="title"
      :visible.sync="isShow"
      width="1000px"
      @close="reset"
    >
      <section class="con-top">
        <div class="item">
          <span>姓名：</span>
          <el-input
            v-model="form.empName"
            placeholder="请输入姓名"
            style="width: 200px;"
          />
        </div>
        <div class="item">
          <span>手机号码：</span>
          <el-input
            v-model="form.mobile"
            placeholder="请输入手机号码"
            style="width: 200px;"
          />
        </div>
        <div class="item">
          <span>状态：</span>
          <el-select
            v-model="form.state"
            placeholder="请选择"
            style="width: 200px;"
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
      <div class="con-table">
        <div class="buttons">
          <el-button
            type="primary"
            @click="revoke"
          >
            批量撤回
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
            :selectable="(row) => row.status === 0"
          />
          <el-table-column
            prop="mobile"
            align="center"
            label="档案编号"
          />
          <el-table-column
            prop="customerName"
            align="center"
            label="姓名"
          />
          <el-table-column
            prop="customerName"
            align="center"
            label="手机号码"
          />
          <el-table-column
            prop="status"
            align="center"
            label="状态"
            :formatter="({status}) => getStatusName(status)"
          />
          <el-table-column
            prop="assignTime"
            align="center"
            label="指派时间"
          />
          <el-table-column
            prop="receiveOrderTime"
            align="center"
            label="接单时间"
          />
          <el-table-column
            prop="gotoWorkTime"
            align="center"
            label="上岗时间"
          />
          <el-table-column
            prop="completeTime"
            align="center"
            label="完成时间"
          />
          <el-table-column
            label="操作"
            align="center"
            width="200"
          >
            <template
              v-if="row.status === 0"
              slot-scope="{ row }"
            >
              <el-button
                type="text"
                class="primary"
                @click="revoke(row)"
              >
                撤回
              </el-button>
              <el-button
                type="text"
                class="primary"
                @click="finish(row.id)"
              >
                完成
              </el-button>
            </template>
          </el-table-column>
        </el-table>
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
      </div>
    </el-dialog>
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
        empName: null,
        status: 99,
        pageCurrent: 1,
        pageSize: 20,
      },
      total: 0,
      statusList: [
        {
          key: 0,
          label: '待接单',
        },
        {
          key: 1,
          label: '已拒绝',
        },
        {
          key: 2,
          label: '已接单',
        },
        {
          key: 3,
          label: '待上岗',
        },
        {
          key: 4,
          label: '待完成',
        },
        {
          key: 5,
          label: '已完成',
        },
        {
          key: 6,
          label: '已撤回',
        },
        {
          key: 7,
          label: '已结束',
        },
        {
          key: 99,
          label: '已结束',
        },
      ],
      isShow: false,
      title: '',
      selection: [],
    };
  },
  methods: {
    reset() {
      this.$utils.initData.call(this, { include: ['form'] });
    },
    getList() {
      this.listLoading = true;
      this.$api.getAssignList({
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
    revoke(row) {
      this.$dialogs.confirm({
        title: '提示',
        content: '确定要撤回吗？',
        onOk: () => {
          let empWorkTaskIds = [];
          if (row) {
            empWorkTaskIds.push(row.id);
          } else {
            empWorkTaskIds = this.selection.map(item => item.id);
          }
          this.$api.revokeEmpWorkTask({
            id: this.workTaskId,
            empWorkTaskIds,
          }).then(() => {
            this.$message.success('撤回任务成功');
            this.getList();
          });
        },
      });
    },
    open(id, type) {
      this.workTaskId = id;
      this.title = this.getTitle(type);
      this.form.type = this.getType(type);
      this.isShow = true;
      this.getList();
    },
    getTitle(type) {
      let title = '';
      if (type === 'assigned') {
        title = '已指派详情';
      } else if (type === 'onWork') {
        title = '待上岗详情';
      } else if (type === 'todo') {
        title = '待完成详情';
      } else if (type === 'finish') {
        title = '已完成详情';
      }
      return title;
    },
    getType(type) {
      let temp = '';
      if (type === 'assigned') {
        temp = 1;
      } else if (type === 'onWork') {
        temp = 2;
      } else if (type === 'todo') {
        temp = 3;
      } else if (type === 'finish') {
        temp = 4;
      }
      return temp;
    },
    getStatusName(status) {
      // const temp = this.statusList.findItem(item => item.status === status) || [];
      // return temp.label || '';
      return status;
    },
  },
};
</script>
<style lang="scss" scoped>
.con-top {
  display: flex;
  padding: 0 8px;
  .item {
    margin-left: 20px;
    width: 22%;
    display: flex;
    span {
      min-width: 70px;
      line-height: 35px;
    }
  }
}
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
}
</style>
