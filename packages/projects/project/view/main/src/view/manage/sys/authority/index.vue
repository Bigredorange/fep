<template>
  <div class="page">
    <div class="container">
      <div>
        <el-button
          type="primary"
          size="small"
          @click="addLevelOne"
        >
          新增一级菜单
        </el-button>
      </div>
      <div
        v-loading="isLoading"
        class="tree-container"
      >
        <el-input
          v-if="list.length > 0"
          v-model="filterText"
          placeholder="请输入关键字进行过滤"
        />
        <el-tree
          ref="tree"
          :props="{
            children: 'children',
            label: 'name',
          }"
          node-key="id"
          :default-expanded-keys="expandNodes"
          :filter-node-method="filterNode"
          :data="list"
          @node-expand="expandNode"
          @node-collapse="collapseNode"
        >
          <div
            slot-scope="{ node, data }"
            class="row"
          >
            <span>
              <i :class="data.type === 0 ? 'icon-menu' : 'icon-btn'" />
              <span
                class="node-name"
                @click.stop="edit(data, node)"
              >{{ data.name }}</span>
            </span>
            <span class="btns">
              <el-button
                v-if="data.type === 0"
                type="text"
                size="mini"
                @click.stop="add(data, node)"
              >新增</el-button>
              <el-button
                type="text"
                size="mini"
                @click.stop="del(data.id)"
              >删除</el-button>
            </span>
          </div>
        </el-tree>
      </div>
    </div>
    <!-- 新增/编辑资源 -->
    <modify-resource
      ref="modifyResource"
      :list="list"
      @update="getList"
    />
  </div>
</template>

<script>
import ModifyResource from './ModifyResource.vue';

export default {
  components: {
    ModifyResource,
  },
  data() {
    return {
      isLoading: false,
      list: [],
      filterText: '',
      expandNodes: [], // 树的展开情况
    };
  },
  watch: {
    filterText(value) {
      this.$refs.tree.filter(value);
    },
  },
  mounted() {
    this.getList();
  },
  methods: {
    getList() {
      this.isLoading = true;
      const { fepUserInfo } = this.$store.state;
      this.$api.getPermissionTree({
        userLevel: fepUserInfo.level,
        userId: fepUserInfo.id,
      }).then(
        (res) => {
          this.list = res;
        },
      ).finally(() => {
        this.isLoading = false;
      });
    },
    addLevelOne() {
      const selectedList = this.list.map(item => item.path);
      this.$refs.modifyResource.open({ selectedList });
    },
    filterNode(value, data) {
      if (!value) return true;
      return data.name.indexOf(value) !== -1;
    },
    edit(data, node) {
      let selectedList = node.parent.childNodes.map(child => child.data.code);
      selectedList = selectedList.filter(code => code !== data.code);
      const form = {
        pid: data.pid,
        id: data.id,
        type: data.type,
        name: data.name,
        code: data.code,
        sort: data.sort,
        coVisible: data.coVisible,
        cusVisible: data.cusVisible,
      };
      this.$refs.modifyResource.open({
        selectedList,
        form,
      });
    },
    add(data, node) {
      console.log(node);
      const selectedList = node.childNodes.map(child => child.data.code);
      const form = {
        pid: data.id,
        name: null,
        code: null,
        sort: null,
        sysNum: 1,
      };
      this.$refs.modifyResource.open({
        selectedList,
        form,
      });
    },
    del(resourcesId) {
      this.$dialogs.confirm({
        title: '提示',
        content: '确定要删除当前权限吗',
        onOk: () => {
          this.$api.delPermission({
            id: resourcesId,
          }).then(() => {
            this.$message.success('删除成功');
            this.getList();
          });
        },
      });
    },
    expandNode(data, node) {
      this.expandSwitch(true, data, node);
    },
    collapseNode(data, node) {
      this.expandSwitch(false, data, node);
    },
    expandSwitch(isExpand, { id }, node) {
      // 控制节点展开关闭
      const idx = this.expandNodes.indexOf(id);
      if (isExpand) {
        if (idx === -1) {
          this.expandNodes.push(id);
        }
        node.expanded = true;
      } else {
        if (idx > -1) {
          this.expandNodes.splice(idx, 1);
        }
        node.expanded = false;
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.page {
  width: 100%;
  overflow: auto;
  padding: 8px;
  border-radius: 10px;
  > .topbar {
    padding: 18px 30px 16px;
    background-color: #fff;
    span {
      font-size: 16px;
      line-height: 1;
      color: #666;
    }
    .second {
      color: #000;
    }
  }
  > .container {
    padding: 20px;
    background: #fff;
    border-radius: 10px;
  }
  /deep/ .el-button--mini, .el-button--mini.is-round {
    padding: 7px 5px;
  }
}
.row {
  padding-right: 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  [class^=icon-] {
    margin-right: 8px;
    vertical-align: middle;
    display: inline-block;
    width: 15px;
    height: 15px;
    background-size: 15px;
    background-repeat: no-repeat;
    background-position: center;
  }
  .icon-menu {
    background-image: url('../../../../assets/icon/menu.png');
  }
  .icon-btn {
    background-image: url('../../../../assets/icon/btn.png');
  }
  .node-name {
    vertical-align: middle;
  }
  .btns {
    opacity: 0;
    transition: opacity 0.3s;
  }
  &:hover .btns {
    opacity: 1;
  }
}
.tree-container {
  margin-top: 10px;
  display: inline-block;
  min-width: 500px;
}
.el-tree {
  height: 100%;
  padding: 10px 0;
}
</style>
