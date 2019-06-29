<template>
  <div>
    <div class="con-table">
      <el-table
        :data="list"
        :loading="listLoading"
      >
        <el-table-column
          type="index"
          align="center"
        />
        <el-table-column
          prop="chargeItem"
          align="center"
          label="收费项目"
        />
        <el-table-column
          prop="chargeMethod"
          align="center"
          label="收费方式"
        />
        <el-table-column
          prop="chargeAmount"
          align="center"
          label="收费金额"
        />
        <el-table-column
          prop="remark"
          align="center"
          label="备注"
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
              @click="$refs.modifyStandard.open(row.id)"
            >
              编辑
            </el-button>
          </template>
        </el-table-column>
      </el-table>
      <modify-standard
        ref="modifyStandard"
        @update="getList"
      />
    </div>
  </div>
</template>
<script>
import ModifyStandard from './ModifyStandard.vue';

export default {
  components: {
    ModifyStandard,
  },
  data() {
    return {
      list: [],
      listLoading: false,
      total: 0,
      createTime: [],
      selection: [],
    };
  },
  created() {
    this.getList();
  },
  methods: {
    getList() {
      this.listLoading = true;
      this.$api.getStandardFeeList().then((res) => {
        this.list = res;
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
    getContractDetail(id) {
      this.$api.getContractDetail({
        id,
      }).then((res) => {
        console.log(res);
      });
    },
    getStatusName(row) {
      const temp = this.statusList.find(item => item.key === row.contractStatus);
      return temp.label;
    },
  },
};
</script>
<style lang="scss" scoped>
.con-table {
  background: #fff;
  padding: 15px 20px;
  border-radius: 10px;
  margin: 10px;
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
