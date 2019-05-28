<template>
  <div>
    <top-bar>
      <section>
        <div class="item">
          <span>证件号码：</span>
          <el-input
            v-model="form.certificateNum"
            placeholder="请输入证件号码"
            style="width: 200px;"
          />
        </div>
        <div class="item">
          <span>月份：</span>
          <el-date-picker
            v-model="form.startMonth"
            type="month"
            placeholder="开始月份"
            value-format="yyyy-MM-dd"
            style="width: 200px;"
          />
          <span class="range">至</span>
          <el-date-picker
            v-model="form.endMonth"
            type="month"
            placeholder="截止月份"
            value-format="yyyy-MM-dd"
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
        <div class="item">
          <span>客户名称：</span>
          <el-input
            v-model="form.customerName"
            placeholder="请输入客户名称"
            style="width: 200px;"
          />
        </div>
        <el-button
          type="primary"
          icon="el-icon-search"
          style="margin-left:20px;"
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
            type="primary"
            icon="el-icon-plus"
            @click="importServiceReward"
          >
            导入服务报酬
          </el-button>
          <el-button
            type="primary"
            @click="downloadTemplate"
          >
            下载模板
          </el-button>
          <el-button @click="handleExport">
            导出
          </el-button>
        </div>
        <div>
          <el-button
            type="primary"
            @click="batchDelete"
          >
            批量删除
          </el-button>
          <el-button
            type="primary"
            @click="batchSend"
          >
            批量发送确认
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
          prop="certificateNum"
          align="center"
          label="证件号码"
        />
        <el-table-column
          prop="bankAccount"
          align="center"
          label="卡号"
        />
        <el-table-column
          prop="bankName"
          align="center"
          label="开户行"
        />
        <el-table-column
          prop="bankAddress"
          align="center"
          label="开户地"
        />
        <el-table-column
          prop="reward"
          align="center"
          label="服务报酬"
        >
          <template slot-scope="{ row, $index }">
            <el-input
              v-if="row.isEdit"
              v-model="list[$index].reward"
              placeholder="请输入"
            />
            <span v-else>{{ row.reward }}</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="taxesPayable"
          align="center"
          label="应交税费"
        >
          <template slot-scope="{ row, $index }">
            <el-input
              v-if="row.isEdit"
              v-model="list[$index].taxesPayable"
              placeholder="请输入"
            />
            <span v-else>{{ row.taxesPayable }}</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="actualPay"
          align="center"
          label="实发金额(元)"
        >
          <template slot-scope="{ row, $index }">
            <el-input
              v-if="row.isEdit"
              v-model="list[$index].actualPay"
              placeholder="请输入"
            />
            <span v-else>{{ row.actualPay }}</span>
          </template>
        </el-table-column>
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
        />
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
            v-if="row.status !== 2"
            slot-scope="{ $index, row }"
          >
            <el-button
              type="text"
              class="green"
              @click="sendItem(row)"
            >
              发送确认
            </el-button>
            <el-button
              v-if="row.isEdit"
              type="text"
              class="primary"
              @click="save($index)"
            >
              保存
            </el-button>
            <el-button
              v-else
              type="text"
              class="primary"
              @click="edit($index)"
            >
              编辑
            </el-button>
            <el-button
              type="text"
              class="red"
              @click="deleteItem(row)"
            >
              删除
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
        certificateNum: null,
        customerName: null,
        startMonth: null,
        endMonth: null,
        status: '',
        pageCurrent: 1,
        pageSize: 20,
      },
      total: 0,
      statusList: [
        {
          key: 0,
          label: '未确认',
        },
        {
          key: 1,
          label: '确认中',
        },
        {
          key: 2,
          label: '已确认',
        },
        {
          key: '',
          label: '全部',
        },
      ],
      selection: [],
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
      this.$api.getServiceRewardList({
        ...this.form,
      }).then((res) => {
        this.list = res.dataList;
        this.total = res.allCount;
      }).finally(() => {
        this.listLoading = false;
      });
    },
    importServiceReward() {
      this.$upload({
        multiple: false,
        fileType: 'excel',
      }).then(([item]) => {
        this.uploading = true;
        this.$message.info('导入中...');
        this.$api.importServiceReward({
          file: item.file,
        }).then(() => {
          this.$dialogs.confirm({
            content: '服务报酬导入完成',
            type: 'success',
            showClose: false,
          });
          this.getList();
        }).catch((res) => {
          if (res.status !== 1302) {
            this.$message.error('导入失败');
            return;
          }
          this.$refs.uploadDetail.open({
            detail: {
              ...res.data,
              fileName: '服务报酬错误导入信息',
              flag: 201,
            },
            cols: [
              {
                prop: 'empName',
                label: '姓名',
                align: 'center',
              },
              {
                prop: 'certificateNum',
                label: '身份证号',
                align: 'center',
              },
              {
                prop: 'customerName',
                label: '客户名称',
                align: 'center',
              },
              {
                prop: 'errorMsg',
                label: '错误描述',
              },
            ],
          });
        }).finally(() => {
          this.uploading = false;
        });
      });
    },
    downloadTemplate() {
      // 下载模板
      this.$api.downloadTemplate({
        file: 'service_reward_import.xlsx',
      }).then(blob => this.$utils.autoLoad(new Blob([blob]), '服务薪酬模板.xlsx'));
    },
    selectionChange(selection) {
      this.selection = selection;
    },
    sizeChange(n) {
      this.form.pageSize = n;
      this.getList();
    },
    save(index) {
      // 丑代码待优化
      const currentRow = this.list[index];
      const reward = currentRow.reward || 0;
      const taxesPayable = currentRow.taxesPayable || 0;
      const actualPay = currentRow.actualPay || 0;
      const serviceFee = currentRow.serviceFee || 0;
      const billingTax = currentRow.billingTax || 0;
      if (reward && this.$utils.regExp('money', reward)) {
        this.$message.warning('服务报酬只能为数值');
        return;
      }
      if (actualPay && this.$utils.regExp('money', actualPay)) {
        this.$message.warning('实发金额只能为数值');
        return;
      }
      if (taxesPayable && this.$utils.regExp('money', taxesPayable)) {
        this.$message.warning('应交税费只能为数值');
        return;
      }
      if (serviceFee && this.$utils.regExp('money', serviceFee)) {
        this.$message.warning('服务费只能为数值');
        return;
      }
      if (billingTax && this.$utils.regExp('money', billingTax)) {
        this.$message.warning('开票税费只能为数值');
        return;
      }
      const params = {
        reward,
        actualPay,
        taxesPayable,
        serviceFee,
        billingTax,
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
          name: '服务报酬.xlsx',
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
    deleteItem(row) {
      const arr = [row.id];
      this.deleteApi(arr);
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
    sendApi(arr, title = '确定发送服务报酬确认？') {
      this.$dialogs.confirm({
        content: title,
        sync: true,
        onOk: () => this.$api.batchSendServiceReward({
          arr,
        }),
        onResolve: () => {
          this.$message.success('发送成功');
          this.getList();
        },
      });
    },
    getStatusName(status) {
      let name = '';
      switch (status) {
        case 0:
          name = '未确认';
          break;
        case 1:
          name = '确认中';
          break;
        case 2:
          name = '已确认';
          break;
        case '':
          break;
      }
      return name;
    },
  },
};
</script>
<style lang="scss" scoped>
.range {
  min-width: 20px !important;
  padding: 0 2px;
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
