<template>
  <section class="org-tree">
    <el-tree
      ref="orgTree"
      default-expand-all
      highlight-current
      node-key="id"
      :props="{
        label: 'title',
        children: 'childrenList',
      }"
      :data="treeData"
      :filter-node-method="filterNode"
      :expand-on-click-node="false"
      @node-click="showMember"
    >
      <el-tooltip
        slot-scope="{ node, data }"
        class="node"
        placement="right"
      >
        <div class="label">
          {{ data.title }}
        </div>
        <div
          slot="content"
          class="btns"
        >
          <template v-if="node.level <= 4">
            <el-button
              type="text"
              size="mini"
              @click="() => $refs.modifyModal.open({
                parentId: data.id,
              })"
            >
              新增
            </el-button>
            <span>|</span>
          </template>
          <el-button
            type="text"
            size="mini"
            @click="() => $refs.modifyModal.open({
              id: data.id,
              title: data.title,
              sort: data.sort,
              parentId: data.parentId,
            })"
          >
            修改
          </el-button>
          <span>|</span>
          <el-button
            type="text"
            size="mini"
            @click="() => del(data)"
          >
            删除
          </el-button>
        </div>
      </el-tooltip>
    </el-tree>
    <!-- 新增/修改层级 -->
    <modify-modal
      ref="modifyModal"
      @update="$emit('update')"
    />
  </section>
</template>

<script>
import ModifyModal from './OrgModify.vue';

export default {
  components: {
    ModifyModal,
  },
  props: {
    data: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      treeData: [],
      filterText: '',
      curId: null, // 当前选中的层级id
    };
  },
  watch: {
    data(value) {
      this.treeData = value;
    },
    filterText(value) {
      this.$refs.orgTree.filter(value);
    },
  },
  methods: {
    filterNode(value, data) {
      if (!value) return true;
      return data.label.indexOf(value) !== -1;
    },
    del({ id: departmentId }) {
      this.$confirm('此操作将删除该层级, 是否继续?', '提示', {
        type: 'warning',
      }).then(() => {
        this.$api.organizationDepartmentDel({
          departmentId,
        }).then(() => {
          this.$message.success('删除成功!');
          this.$emit('update');
        });
      });
    },
    showMember(data) {
      this.$emit('showMember', data);
      this.curId = data.id;
    },
  },
};
</script>

<style lang="scss" scoped>
@import '~styles/utils';

.org-tree {
  height: 100%;
  border-right: 1px solid #e7e5e5;
  background-color: #fff;
  /deep/ .el-tree-node__content {
    height: 32px;
  }
  h3 {
    text-align: center;
    padding: 10px;
    font-weight: bold;
  }
  > .el-input {
    margin-bottom: 10px;
    padding-right: 10px;
  }
  .node {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    .label {
      flex: 1;
    }
  }
  /deep/ .el-tree-node__content > .el-tree-node__expand-icon {
    margin-left: 24px;
  }
  /deep/ .el-tree--highlight-current .el-tree-node.is-current > .el-tree-node__content {
    color: $blue-1;
  }
}
.btns {
  display: flex;
  align-items: center;
  color: #fff;
  /deep/ .el-button {
    color: #fff !important;
  }
  > span {
    margin: 0 9px;
  }
}
</style>
