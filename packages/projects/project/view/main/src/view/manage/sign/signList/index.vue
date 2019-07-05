<template>
  <div>
    <top-bar>
      <section>
        <div class="item">
          <span>档案编号：</span>
          <el-input
            v-model="form.empArchivesNo"
            placeholder="请输入档案编号"
            style="width: 200px;"
          />
        </div>
        <div class="item">
          <span>姓名：</span>
          <el-input
            v-model="form.name"
            placeholder="请输入姓名"
            style="width: 200px;"
          />
        </div>
        <div class="item">
          <span>手机：</span>
          <el-input
            v-model="form.mobile"
            placeholder="请输入手机"
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
          <span>合同名称：</span>
          <el-input
            v-model="form.contractName"
            placeholder="请输入合同名称"
            style="width: 200px;"
          />
        </div>
        <div class="item">
          <span>签约日期：</span>
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
          @click="startContractSign"
        >
          批量发送签约
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
          prop="empArchivesNo"
          align="center"
          label="档案编号"
        />
        <el-table-column
          prop="name"
          align="center"
          label="姓名"
        />
        <el-table-column
          prop="certificateNum"
          align="center"
          label="身份证号"
        />
        <el-table-column
          prop="mobile"
          align="center"
          label="手机号"
        />
        <el-table-column
          prop="status"
          align="center"
          label="状态"
          :formatter="getStatusName"
        />
        <el-table-column
          prop="contractNo"
          align="center"
          label="合同编号"
        >
          <template
            slot-scope="{ row }"
          >
            <span
              class="link"
              @click="getContractDetail(row.contractSignFileId)"
            >
              {{ row.contractNo }}
            </span>
          </template>
        </el-table-column>
        <el-table-column
          prop="contractName"
          align="center"
          label="合同名称"
        />
        <el-table-column
          prop="sendTime"
          align="center"
          label="发送时间"
        />
        <el-table-column
          prop="signingTime"
          align="center"
          label="签约时间"
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
              v-if="row.signStatus === 0"
              type="text"
              class="primary"
              @click="startContractSign(row)"
            >
              发送签约
            </el-button>
            <el-button
              v-if="row.signStatus === 1"
              type="text"
              class="primary"
              @click="revoke(row.id)"
            >
              撤回
            </el-button>
            <el-button
              v-if="row.signStatus === 2"
              type="text"
              class="primary"
              @click="$refs.saveContract.open(row)"
            >
              存档
            </el-button>
            <el-button
              v-if="row.signStatus === 2"
              type="text"
              class="primary"
              @click="cancel(row.id)"
            >
              作废
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
      <save-contract
        ref="saveContract"
        @update="getList"
      />
    </div>
  </div>
</template>
<script>
import saveContract from './saveContract.vue';

export default {
  components: {
    saveContract,
  },
  data() {
    return {
      list: [],
      listLoading: false,
      form: {
        empArchivesNo: null,
        name: null,
        contractName: null,
        mobile: null,
        signStatus: 99,
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
          label: '未签约',
        },
        {
          key: 1,
          label: '待签约',
        },
        {
          key: 2,
          label: '已签约',
        },
        {
          key: 3,
          label: '已撤回',
        },
        {
          key: 4,
          label: '已存档',
        },
        {
          key: 5,
          label: '已失效',
        },
        {
          key: 99,
          label: '全部',
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
      this.$api.getContractSignList({
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
    startContractSign(row) {
      row.loading = true;
      let ids = [];
      if (row.id) {
        ids.push(row.id);
      } else {
        ids = this.selection.map(item => item.id);
      }
      this.$api.startContractSign(ids).then(() => {
        this.$message.success('发送成功');
        this.getList();
      }).finally(() => {
        row.loading = false;
      });
    },
    revoke(id) {
      this.$dialogs.confirm({
        title: '提示',
        content: '确定要撤回吗？',
        onOk: () => {
          this.$api.revokeContractSign({
            id,
          }).then(() => {
            this.$message.success('撤回成功');
            this.getList();
          });
        },
      });
    },
    cancel(id) {
      this.$dialogs.confirm({
        title: '提示',
        content: '确定要作废吗？',
        onOk: () => {
          this.$api.cancelContractSign({
            id,
          }).then(() => {
            this.$message.success('操作成功');
            this.getList();
          });
        },
      });
    },
    getStatusName(row) {
      const temp = this.statusList.find(item => item.key === row.signStatus);
      return temp.label;
    },
    getContractDetail(fileId) {
      this.$api.pdfDownloadById({
        fileId,
      }).then((res) => {
        window.open(res);
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
  .link {
    color: #1b559d;
    font-weight: 500;
    cursor: pointer;
  }
}
</style>
