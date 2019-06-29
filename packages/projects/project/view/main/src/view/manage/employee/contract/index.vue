<template>
  <div>
    <top-bar>
      <section>
        <div class="item">
          <span>合同编号：</span>
          <el-input
            v-model="form.contractNo"
            placeholder="请输入合同编号"
            style="width: 200px;"
          />
        </div>
        <div class="item">
          <span>合同名称：</span>
          <el-input
            v-model="form.contractName"
            placeholder="请输入合同名称"
            style="width: 200px;"
          />
        </div>
        <div class="item">
          <span>签约对象：</span>
          <el-input
            v-model="form.signObject"
            placeholder="请输入签约对象"
            style="width: 200px;"
          />
        </div>
        <div class="item">
          <span>证件号码</span>
          <el-input
            v-model="form.certificateNum"
            placeholder="请输入证件号码"
            style="width: 200px;"
          />
        </div>
        <div class="item">
          <span>签约状态：</span>
          <el-select
            v-model="form.signStatus"
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
          <span>合同日期：</span>
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
          :disabled="selection.length === 0"
          type="primary"
          @click="batchDownloadContract"
        >
          批量下载
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
          :selectable="(row) => row.signStatus === 0"
        />
        <el-table-column
          prop="contractNo"
          align="center"
          label="合同编号"
        />
        <el-table-column
          prop="contractName"
          align="center"
          label="合同名称"
        />
        <el-table-column
          prop="signObject"
          align="center"
          label="签约对象"
        />
        <el-table-column
          prop="certificateNum"
          align="center"
          label="证件号码"
        />
        <el-table-column
          prop="mobile"
          align="center"
          label="手机号"
        />
        <el-table-column
          prop="contractStartTime"
          align="center"
          label="合同开始日期"
        />
        <el-table-column
          prop="contractEndTime"
          align="center"
          label="合同结束日期"
        />
        <el-table-column
          prop="contractStatus"
          align="center"
          label="合同状态"
          :formatter="getStatusName"
        />
        <el-table-column
          prop="creatorName"
          align="center"
          label="创建人"
        />
        <el-table-column
          prop="createTime"
          align="center"
          label="创建时间"
        />
        <el-table-column
          label="操作"
          align="center"
          width="300"
          fixed="right"
        >
          <template
            slot-scope="{ row }"
          >
            <el-button
              type="text"
              class="primary"
              @click="getContractDetail(row.contractSignFileId)"
            >
              查看详情
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
        contractNo: null,
        signObject: null,
        contractName: null,
        certificateNum: null,
        pageCurrent: 1,
        pageSize: 20,
        startTime: null,
        endTime: null,
        companyId: null,
      },
      total: 0,
      statusList: [
        {
          key: 0,
          label: '未生效',
        },
        {
          key: 1,
          label: '已生效',
        },
        {
          key: 2,
          label: '已到期',
        },
      ],
      createTime: [],
      selection: [],
    };
  },
  created() {
    this.form.companyId = this.$store.state.fepUserInfo.companyId;
    this.getList();
  },
  methods: {
    reset() {
      this.$utils.initData.call(this, { include: ['form'] });
      this.getList();
    },
    getList() {
      this.listLoading = true;
      this.$api.getEmpContractList({
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
    view(row) {
      this.$router.push({ path: 'detail', query: { id: row.id } });
    },
    selectDate(val) {
      const [start, end] = val;
      this.form.startTime = start;
      this.form.endTime = end;
    },
    add() {
      this.$router.push('edit');
    },
    batchDownloadContract() {
      let ids = [];
      ids = this.selection.map(item => item.id);
      this.$api.batchDownloadContract(ids).then((res) => {
        this.fileDownloadById({
          fileId: res,
        });
      });
    },
    getContractDetail(fileId) {
      this.$api.pdfDownloadById({
        fileId,
      }).then((res) => {
        window.open(res);
      });
    },
    getStatusName(row) {
      const temp = this.statusList.find(item => item.key === row.contractStatus);
      return temp ? temp.label : '';
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
