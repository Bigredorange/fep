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
            @click="goOnWork"
          >
            批量完成
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
              slot-scope="{ row }"
            >
              <el-button
                type="text"
                class="primary"
                @click="goOnWork(row)"
              >
                完成
              </el-button>
              <el-button
                type="text"
                class="primary"
                @click="cancel(row)"
              >
                取消上岗
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
    <select-date
      ref="selectDate"
      @confirm="finish"
    />
  </div>
</template>
<script>
import SelectDate from './SelectDate.vue';

export default {
  components: {
    SelectDate,
  },
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
      isShow: false,
      title: '',
      selection: [],
    };
  },
  methods: {
    reset() {
      this.$utils.initData.call(this, { include: ['form'] });
      this.getList();
    },
    getList() {
      this.listLoading = true;
      this.$api.getAssignList({
        ...this.form,
        id: this.workTaskId,
        type: this.type,
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
    finish(obj) {
      this.$dialogs.confirm({
        title: '提示',
        content: '确定要完成吗？',
        onOk: () => {
          let empWorkTaskIds = [];
          if (obj.row.id) {
            empWorkTaskIds.push(obj.row.id);
          } else {
            empWorkTaskIds = this.selection.map(item => item.id);
          }
          this.$api.finishEmpWorkTask({
            time: obj.date,
            empWorkTaskIds,
          }).then(() => {
            this.$refs.selectDate.close();
            this.$message.success('操作成功');
            this.getList();
            this.$emit('update');
          });
        },
      });
    },
    cancel(row) {
      this.$dialogs.confirm({
        title: '提示',
        content: '确定要取消上岗吗？',
        onOk: () => {
          this.$api.cancelEmpWorkTask({
            empWorkTaskId: row.id,
          }).then(() => {
            this.$refs.selectDate.close();
            this.$message.success('操作成功');
            this.getList();
            this.$emit('update');
          });
        },
      });
    },
    goOnWork(row) {
      this.$refs.selectDate.open(row, '请确认实际完成时间');
    },
    open(id, type) {
      this.workTaskId = id;
      this.title = this.getTitle(type);
      this.type = this.getType(type);
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
