<template>
  <div>
    <div class="con-table">
      <div class="buttons">
        <el-button
          type="text"
          icon="el-icon-plus"
          @click="add"
        >
          新增
        </el-button>
      </div>
      <ul class="con-role">
        <li
          v-for="item in list"
          :key="item.id"
          :class="{'active': item.id === protocolId}"
          class="item"
          @click="selectItem(item)"
        >
          <!-- <img src="../../../../assets/"> -->
          <span>{{ item.name }}</span>
          <div class="info">
            {{ `${item.updater} ${item.updateTime}` }}
            <el-button
              type="text"
              class="delete"
              @click.stop="deleteProtocol(item)"
            >
              删除
            </el-button>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      list: [],
      listLoading: false,
      protocolId: null,
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
    add() {
      this.protocolId = null;
      this.$emit('select', null);
    },
    deleteProtocol(row) {
      this.$dialogs.confirm({
        content: '确定删除该协议？',
        sync: true,
        onOk: () => this.$api.deleteProtocol({
          id: row.id,
        }),
        onResolve: () => {
          if (row.id === this.protocolId) {
            this.$emit('resetEdit');
          }
          this.$message.success('删除成功');
          this.getList();
        },
      });
    },
    selectItem(item) {
      this.protocolId = item.id;
      this.$emit('select', item.id);
    },
  },
};
</script>
<style lang="scss" scoped>
.con-table {
  background: #fff;
  border-radius: 10px;
  margin: 8px 8px 8px;
  .buttons {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 16px 20px;
    border-bottom: 1px solid #f0f3f6;
    .el-button {
      color: #356fb8;
      font-size: 14px;
    }
  }
  .grey {
    color: #999999;
  }
}
.con-role {
    border-radius: 0 0 10px 10px;
    padding: 6px 20px;
    background: #fff;
    .item {
      display: flex;
      justify-content: space-between;
      padding: 10px 20px;
      border-bottom: 1px solid #f0f3f6;
      cursor: pointer;
      span {
        width: 300px;
      }
      .info {
        font-size: 12px;
        color: #999;
      }
      .delete {
        color: #F56C6C;
      }
      &.active {
        background: #f3e9d7;
      }
      &:hover {
        background: #f3e9d7;
      }
    }
}
</style>
