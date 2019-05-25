<template>
  <div>
    <el-dialog
      :title="title"
      :visible.sync="isShow"
      width="1100px"
      :close-on-click-modal="false"
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
        <el-table
          :data="list"
          :loading="listLoading"
        >
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
            align="center"
            label="上岗时间"
            width="200"
          >
            <template
              slot-scope="{ row }"
            >
              <el-date-picker
                v-if="row.isEdit"
                v-model="row.gotoWorkTime"
                align="right"
                type="datetime"
                placeholder="选择日期"
                style="width: 180px"
                value-format="yyyy-MM-dd hh:mm"
                format="yyyy-MM-dd HH:mm"
              />
              <span
                v-else
              >
                {{ row.gotoWorkTime }}
              </span>
            </template>
          </el-table-column>
          <el-table-column
            align="center"
            label="完成时间"
            width="200"
          >
            <template
              slot-scope="{ row }"
            >
              <el-date-picker
                v-if="row.isEdit"
                v-model="row.completeTime"
                align="right"
                type="datetime"
                placeholder="选择日期"
                style="width: 180px"
                value-format="yyyy-MM-dd HH:mm"
                format="yyyy-MM-dd HH:mm"
              />
              <span
                v-else
              >
                {{ row.gotoWorkTime }}
              </span>
            </template>
          </el-table-column>
          <el-table-column
            label="操作"
            align="center"
            width="200"
          >
            <template
              slot-scope="{ $index, row }"
            >
              <el-button
                v-if="!row.isEdit"
                type="text"
                class="primary"
                @click="edit($index)"
              >
                编辑
              </el-button>
              <el-button
                v-else
                type="text"
                class="success"
                @click="save(row)"
              >
                保存
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
        pageCurrent: 1,
        pageSize: 20,
      },
      total: 0,
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
    selectDate(val) {
      const [start, end] = val;
      this.form.workPlanStartTime = start;
      this.form.workPlanEndTime = end;
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
    save(row) {
      this.$dialogs.confirm({
        title: '提示',
        content: '确定要保存吗？',
        onOk: () => {
          this.$api.updateEmpWorkTask({
            empWorkTaskId: row.id,
            onWorkTime: row.gotoWorkTime,
            completeTime: row.completeTime,
          }).then(() => {
            this.$message.success('更新任务成功');
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
    edit(index) {
      this.list[index].isEdit = true;
      this.$set(this.list, index, this.list[index]);
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
