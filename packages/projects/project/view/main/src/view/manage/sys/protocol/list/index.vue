<template>
  <div>
    <div class="con-table">
      <div class="buttons">
        <el-button
          type="primary"
          icon="el-icon-plus"
          @click="add"
        >
          新增
        </el-button>
      </div>
      <el-table
        :data="list"
        :loading="listLoading"
      >
        <el-table-column
          prop="name"
          align="center"
          label="协议名称"
        />
        <el-table-column
          prop="content"
          align="center"
          label="协议内容"
        />
        <el-table-column
          prop="updater"
          align="center"
          label="更新人"
        />
        <!-- <el-table-column
          prop="companyName"
          align="center"
          label="部门名称"
        /> -->
        <el-table-column
          prop="updateTime"
          align="center"
          label="更新时间"
        />
        <el-table-column
          prop="createTime"
          align="center"
          label="创建时间"
        />
        <el-table-column
          label="操作"
          align="center"
        >
          <template
            slot-scope="{ row }"
          >
            <el-button
              type="text"
              class="primary"
              @click="edit(row)"
            >
              编辑
            </el-button>
            <el-button
              type="text"
              class="danger"
              @click="deleteProtocol(row)"
            >
              删除
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      list: [],
      listLoading: false,
      statusList: [
        {
          key: 0,
          label: '禁用',
        },
        {
          key: 1,
          label: '启用',
        },
        {
          key: 99,
          label: '全部',
        },
      ],
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
      this.$api.getProtocolList({}).then((res) => {
        this.list = res;
      }).finally(() => {
        this.listLoading = false;
      });
    },
    edit(row) {
      this.$router.push({ path: 'edit', query: { id: row.id } });
    },
    add() {
      this.$router.push('edit');
    },
    deleteProtocol(row) {
      this.$dialogs.confirm({
        content: '确定删除该协议？',
        sync: true,
        onOk: () => this.$api.deleteProtocol({
          id: row.id,
        }),
        onResolve: () => {
          this.$message.success('删除成功');
          this.getList();
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
  margin: 0px 8px 8px;
  .buttons {
    display: flex;
    margin-bottom: 16px;
  }
  .grey {
    color: #999999;
  }
}
</style>
