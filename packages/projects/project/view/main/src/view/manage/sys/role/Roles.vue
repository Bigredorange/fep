<template>
  <div class="con">
    <div class="topbar">
      <div class="left">
        <el-input
          v-model="form.name"
          placeholder="搜索 角色名称"
          suffix-icon="el-icon-search"
          style="width: 200px;"
          @blur="getList"
        />
        <el-select
          v-model="form.status"
          style="width: 200px;margin-left: 20px;"
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
        size="small"
        @click="add"
      >
        +新增角色
      </el-button>
    </div>
    <ul class="con-role">
      <li
        v-for="item in list"
        :key="item.id"
        :class="{'active': item.id === roleId}"
        class="item"
        @click="selectRole(item)"
      >
        <!-- <img src="../../../../assets/"> -->
        <span>{{ item.name }}</span>
        <div @click.stop="del(item)">
          <img :src="require(`../../../../assets/icon/${item.status === 1 ? 'K_abled.png' : 'K_disabled.png'}`)">
          <span
            :class="{'grey': item.status === 0}"
          >
            {{ item.status === 1 ? '启用' : '禁用' }}
          </span>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isLoading: false,
      list: [],
      pageNum: 1,
      pageSize: 1000,
      total: 0,
      form: {
        name: '',
        status: 99,
      },
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
      roleId: 0,
    };
  },
  mounted() {
    this.getList();
  },
  methods: {
    getList() {
      this.isLoading = true;
      this.$api.getAllRole({
        ...this.form,
      }).then((res) => {
        this.list = res;
      }).finally(() => {
        this.isLoading = false;
      });
    },
    add() {
      this.$emit('setRoleId', this.roleId);
      this.$message.info('请在右侧填写角色信息');
    },
    del(item) {
      this.$dialogs.confirm({
        title: '提示',
        content: `确定要${item.status === 1 ? '禁用' : '启用'}角色吗？`,
        onOk: () => {
          this.$api.disableRole({
            id: item.id,
            status: Number(!item.status),
          }).then(() => {
            this.$message.success(`${item.status === 1 ? '禁用' : '启用'}成功`);
            this.getList();
          });
        },
      });
    },
    selectRole(item) {
      this.roleId = item.id;
      this.$emit('setRoleId', this.roleId);
    },
  },
};
</script>

<style lang="scss" scoped>
.con {
  padding: 8px;
  border-radius:10px;
  .topbar {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 15px 20px;
    background-color: #fff;
    border-bottom: 1px solid #f0f3f6;
    border-radius: 10px 10px 0 0;
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
      .grey {
        color: #999999;
      }
      &.active {
        background: #f3e9d7;
      }
      &:hover {
        background: #f3e9d7;
      }
    }
  }
}
.el-table {
  border-radius: 8px;
}
</style>
