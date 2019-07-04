<template>
  <div>
    <top-bar>
      <section>
        <div class="item">
          <span>客户名称：</span>
          <el-input
            v-model="form.customerName"
            placeholder="请输入客户名称"
            style="width: 200px;"
          />
        </div>
        <div
          class="item"
          style="width: 40%;"
        >
          <span>月份：</span>
          <el-date-picker
            v-model="form.startMonth"
            type="month"
            placeholder="开始月份"
            value-format="yyyy-MM"
            style="width: 200px;"
          />
          <span class="range">至</span>
          <el-date-picker
            v-model="form.endMonth"
            type="month"
            placeholder="截止月份"
            value-format="yyyy-MM"
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
      </section>
    </top-bar>
    <div class="con-table">
      <div class="buttons">
        <div>
          <el-button
            v-if="$p('/settle/cusService/export')"
            @click="handleExport"
          >
            导出
          </el-button>
        </div>
        <div>
          <el-button
            v-if="$p('/settle/cusService/batchDel')"
            type="primary"
            @click="batchDelete"
          >
            批量删除
          </el-button>
          <el-button
            v-if="$p('/settle/cusService/batchSend')"
            type="primary"
            @click="batchSend"
          >
            批量发送确认
          </el-button>
          <el-button
            v-if="$p('/settle/cusService/batchConfirm')"
            type="primary"
            @click="batchConfirm"
          >
            批量确认
          </el-button>
        </div>
      </div>
      <el-table
        :data="list"
        :loading="listLoading"
        @selection-change="selectionChange"
      >
        <el-table-column
          type="selection"
          width="50"
          align="center"
          fixed="left"
          :selectable="selectable"
        />
        <el-table-column
          prop="importTime"
          align="center"
          label="导入时间"
        />
        <el-table-column
          prop="month"
          align="center"
          label="月份"
        />
        <el-table-column
          prop="customerNo"
          align="center"
          label="客户编码"
        />
        <el-table-column
          prop="customerName"
          align="center"
          label="客户名称"
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
          prop="reward"
          align="center"
          label="服务报酬"
        />
        <el-table-column
          prop="taxesPayable"
          align="center"
          label="应交税费"
        />
        <el-table-column
          prop="actualPay"
          align="center"
          label="实发金额(元)"
        />
        <el-table-column
          prop="serviceFee"
          align="center"
          label="服务费"
        >
          <template slot-scope="{ row, $index }">
            <el-input
              v-if="row.isEdit"
              v-model="list[$index].serviceFee"
              placeholder="请输入"
            />
            <span v-else>{{ row.serviceFee }}</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="billingTax"
          align="center"
          label="开票税费"
        >
          <template slot-scope="{ row, $index }">
            <el-input
              v-if="row.isEdit"
              v-model="list[$index].billingTax"
              placeholder="请输入"
            />
            <span v-else>{{ row.billingTax }}</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="totalAmount"
          align="center"
          label="合计"
        >
          <template slot-scope="{ row, $index }">
            <el-input
              v-if="row.isEdit"
              v-model="list[$index].totalAmount"
              placeholder="请输入"
            />
            <span v-else>{{ row.totalAmount }}</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="status"
          align="center"
          label="状态"
          :formatter="({ status }) => getStatusName(status)"
        />
        <el-table-column
          label="操作"
          align="center"
          fixed="right"
          width="220px"
        >
          <template
            v-if="row.status !== 4"
            slot-scope="{ $index, row }"
          >
            <el-button
              v-if="row.status === 2 && $p('/settle/cusService/send')"
              type="text"
              class="green"
              @click="sendItem(row)"
            >
              发送确认
            </el-button>
            <el-button
              v-if="row.status === 3 && $p('/settle/cusService/confirm')"
              type="text"
              class="green"
              @click="confirmItem(row)"
            >
              确认
            </el-button>
            <el-button
              v-if="row.isEdit && $p('/settle/cusService/edit')"
              type="text"
              class="primary"
              @click="save($index)"
            >
              保存
            </el-button>
            <el-button
              v-if="row.status === 2 && $p('/settle/cusService/edit')"
              type="text"
              class="primary"
              @click="edit($index)"
            >
              编辑
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
    <upload-detail ref="uploadDetail" />
  </div>
</template>
<script>
export default {
  data() {
    return {
      list: [],
      listLoading: false,
      form: {
        customerName: null,
        startMonth: null,
        endMonth: null,
        status: -2, // -1 灵工服务全部 -2 客户服务结算全部 -3 当前客户的全部
        pageCurrent: 1,
        pageSize: 20,
      },
      total: 0,
      statusList: [
        {
          key: 2,
          label: '未确认',
        },
        {
          key: 3,
          label: '确认中',
        },
        {
          key: 4,
          label: '已确认',
        },
        {
          key: -2,
          label: '全部',
        },
      ],
      selection: [],
      status: '',
    };
  },
  created() {
    if (this.$store.state.fepUserInfo.level === 5) {
      this.form.status = -3;
      this.statusList = [
        {
          key: 3,
          label: '未确认',
        },
        {
          key: 4,
          label: '已确认',
        },
        {
          key: -3,
          label: '全部',
        },
      ];
    }
    this.getList();
  },
  methods: {
    reset() {
      this.$utils.initData.call(this, { include: ['form'] });
      this.getList();
    },
    getList() {
      this.listLoading = true;
      this.$api.getServiceRewardList({
        ...this.form,
      }).then((res) => {
        this.list = res.dataList;
        this.total = res.allCount;
      }).finally(() => {
        this.listLoading = false;
      });
    },
    // downloadTemplate() {
    //   // 下载模板
    //   this.$api.downloadTemplate({
    //     file: 'service_reward_import.xlsx',
    //   }).then(blob => this.$utils.autoLoad(new Blob([blob]), '服务薪酬模板.xlsx'));
    // },
    selectionChange(selection) {
      this.selection = selection;
    },
    sizeChange(n) {
      this.form.pageSize = n;
      this.getList();
    },
    save(index) {
      const currentRow = this.list[index];
      const serviceFee = currentRow.serviceFee || 0;
      const billingTax = currentRow.billingTax || 0;
      const totalAmount = currentRow.totalAmount || 0;
      if (serviceFee && !this.$utils.regExp(serviceFee, 'money')) {
        this.$message.warning('服务费只能为数值');
        return;
      }
      if (billingTax && !this.$utils.regExp(billingTax, 'money')) {
        this.$message.warning('开票税费只能为数值');
        return;
      }
      if (totalAmount && !this.$utils.regExp(totalAmount, 'money')) {
        this.$message.warning('合计只能为数值');
        return;
      }

      const params = {
        serviceFee,
        billingTax,
        totalAmount,
      };
      Object.keys(params).forEach((k) => {
        if (typeof params[k] === 'string') {
          params[k] = Number(params[k]);
        }
      });
      this.$api.updateServiceReward({
        id: currentRow.id,
        ...params,
      }).then(() => {
        this.$message.success('修改成功');
        this.list[index].isEdit = false;
        this.$set(this.list, index, this.list[index]);
        this.getList();
      });
    },
    handleExport() {
      this.$api.exportServiceReward({
        ...this.form,
      }).then(async (res) => {
        await this.$api.fileDownloadById({
          fileId: res,
        });
        this.$dialogs.confirm({ content: '成功', type: 'success', showClose: false });
      });
    },
    edit(index) {
      this.list[index].isEdit = true;
      this.$set(this.list, index, this.list[index]);
    },
    batchDelete() {
      if (!this.selection.length) {
        this.$message.warning('请选择批量删除操作项');
        return;
      }
      const ids = this.selection.map(item => item.id);
      this.deleteApi(ids, '确定批量删除该服务报酬？');
    },
    deleteApi(arr, title = '确定批量删除该服务报酬？') {
      this.$dialogs.confirm({
        content: title,
        sync: true,
        onOk: () => this.$api.batchDeleteServiceReward({
          arr,
        }),
        onResolve: () => {
          this.$message.success('删除成功');
          this.getList();
        },
      });
    },
    batchSend() {
      if (!this.selection.length) {
        this.$message.warning('请选择批量发送操作项');
        return;
      }
      if (this.selection.some(t => t.status === 3)) {
        this.$message.warning('包含确认中的数据，请勾选未确认的数据');
        return;
      }
      const ids = this.selection.map(item => item.id);
      this.sendApi(ids, '确定批量发送服务报酬确认？');
    },
    sendItem(row) {
      const arr = [row.id];
      if (row.isEdit) {
        this.$message.warning('请先点击保存');
        return;
      }
      this.sendApi(arr);
    },
    batchConfirm() {
      if (!this.selection.length) {
        this.$message.warning('请选择批量发送操作项');
        return;
      }
      // if (this.selection.some(t => t.status === 3)) {
      //   this.$message.warning('包含确认中的数据，请勾选未确认的数据');
      //   return;
      // }
      const ids = this.selection.map(item => item.id);
      this.confirmApi(ids, '确定批量确认嘛？');
    },
    confirmItem(row) {
      const arr = [row.id];
      this.confirmApi(arr);
    },
    sendApi(arr, title = '确定发送服务报酬确认？') {
      this.$dialogs.confirm({
        content: title,
        sync: true,
        onOk: () => this.$api.batchSendServiceReward({
          arr,
          status: 3,
        }),
        onResolve: () => {
          this.$message.success('发送成功');
          this.getList();
        },
      });
    },
    confirmApi(arr, title = '确定要确认嘛？') {
      this.$dialogs.confirm({
        content: title,
        sync: true,
        onOk: () => this.$api.batchSendServiceReward({
          arr,
          status: 4,
        }),
        onResolve: () => {
          this.$message.success('确认成功');
          this.getList();
        },
      });
    },
    getStatusName(status) {
      const temp = this.statusList.find(item => item.key === status);
      console.log(temp);
      return temp ? temp.label : '';
    },
    selectable(row) {
      return row.status !== 4 ? 1 : 0;
    },
  },
};
</script>
<style lang="scss" scoped>
.range {
  min-width: 20px !important;
  padding: 0 10px;
}
.con-table {
  background: #fff;
  padding: 15px 20px;
  border-radius: 10px;
  margin: 0px 8px 8px;
  .buttons {
    display: flex;
    justify-content: space-between;
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
