<template>
  <div>
    <div class="con-table">
      <el-button
        class="buttons"
        type="primary"
        @click="$refs.addUser.open($route.query.id)"
      >
        添加
      </el-button>
      <el-table
        :data="list"
        :loading="listLoading"
      >
        <el-table-column
          prop="name"
          align="center"
          label="姓名"
        />
        <el-table-column
          prop="mobile"
          align="center"
          label="手机号"
        />
        <el-table-column
          prop="username"
          align="center"
          label="登录账号"
        />
        <!-- <el-table-column
          prop="cost"
          align="center"
          label="角色"
        />
        <el-table-column
          prop="cost"
          align="center"
          label="认证状态"
        /> -->
        <el-table-column
          label="操作"
          align="center"
        >
          <template slot-scope="{ row }">
            <el-button
              type="text"
              class="primary"
              @click="disable(row)"
            >
              取消添加
            </el-button>
          </template>
        </el-table-column>
      </el-table>
      <add-user
        ref="addUser"
        @update="getList"
      />
    </div>
  </div>
</template>
<script>
import AddUser from './AddUser.vue';

export default {
  components: {
    AddUser,
  },
  data() {
    return {
      list: [],
      listLoading: false,
      form: {
        event: null,
        operator: null,
        pageCurrent: 1,
        pageSize: 20,
        startTime: null,
        endTime: null,
      },
      total: 0,
      createTime: [],
    };
  },
  created() {
    this.getList();
  },
  methods: {
    reset() {
      this.$utils.initData.call(this, { include: ['form'] });
      this.getList();
    },
    getList() {
      this.listLoading = true;
      this.$api.getSealManager({
        id: this.$route.query.id,
      }).then((res) => {
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
    selectDate(val) {
      const [start, end] = val;
      this.form.startTime = start;
      this.form.endTime = end;
    },
    disable(item) {
      this.$dialogs.confirm({
        title: '提示',
        content: '确定要取消添加吗？',
        onOk: () => {
          this.$api.delSealManager({
            smId: item.id,
          }).then(() => {
            this.$message.success('操作成功');
            this.getList();
          });
        },
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
  margin: 8px;
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
