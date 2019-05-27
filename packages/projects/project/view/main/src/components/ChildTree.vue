<template>
  <div class="childs">
    <el-button
      size="small"
      @click="open"
    >
      {{ childName || $store.state.fepUserInfo.name }}
    </el-button>
    <el-dialog
      :close-on-click-modal="false"
      :visible.sync="isShow"
      title="部门与人员"
      width="946px"
      class="dialog"
      append-to-body
    >
      <el-tree
        ref="tree"
        v-loading="isLoading"
        show-checkbox
        highlight-current
        node-key="id"
        :props="{
          label: data => data.userName || data.name,
          children: 'children',
        }"
        :data="list"
        :expand-on-click-node="false"
      >
        <span
          slot-scope="{ node, data }"
          class="title"
        >
          <i :class="data.userName ? 'icon-person' : 'icon-dept'" />
          <span class="node-name">{{ data.userName || data.name }}</span>
        </span>
      </el-tree>
      <div slot="footer">
        <el-button @click="isShow = false">
          取消
        </el-button>
        <el-button
          type="primary"
          :loading="isLoading"
          @click="submit"
        >
          确定
        </el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  props: {
    keysName: {
      type: String,
      default: null,
    },
  },
  data() {
    return {
      isLoading: false,
      isShow: false,
      list: [],
      childName: '',
    };
  },
  mounted() {
    this.getList();
  },
  methods: {
    // reset() {
    //   this.$utils.initData.call(this);
    // },
    getList() {
      if (this.list.length) return;
      this.isLoading = true;
      this.$api.getUserDepartTreeById().then((res) => {
        const getChild = (child) => {
          child.forEach((item) => {
            if (item.childrenList && item.childrenList.length) getChild(item.childrenList);
            item.children = item.childrenList.concat(item.userDeptList);
          });
        };
        getChild(res);
        this.list = res;
        // this.setChecked();
      }).finally(() => {
        this.isLoading = false;
      });
    },
    setChecked() {
      // 设置选中项
      const keys = this.$db(`ChildTree-${this.keysName}`);
      if (!keys || !keys.length) return;
      this.$refs.tree.setCheckedKeys(keys);
      const nodes = this.$refs.tree.getCheckedNodes();
      console.log('nodes: ', nodes);
    },
    open() {
      this.isShow = true;
    },
    submit() {
      const selection = this.$refs.tree.getCheckedNodes();
      const userNums = [];
      let childName = '';
      selection.forEach((item) => {
        if (item.userName) {
          userNums.push(item.id);
          childName += `,${item.userName}`;
        }
      });
      this.childName = childName.slice(1);
      this.$emit('selected', selection);
      this.isShow = false;
    },
  },
};
</script>

<style lang="scss" scoped>

.childs {
  display: inline-block;
  vertical-align: middle;
  > .el-button {
    max-width: 100px;
    @include clamp(1);
  }
}
.title {
  [class^=icon] {
    margin-right: 6px;
    vertical-align: middle;
    display: inline-block;
    width: 15px;
    height: 15px;
    background-position: center;
    background-repeat: no-repeat;
    background-size: 15px;
    &.icon-person {
      background-image: url('../assets/icon/person.png');
    }
    &.icon-dept {
      background-image: url('../assets/icon/dept.png');
    }
  }
  .node-name {
    vertical-align: middle;
    display: inline-block;
  }
}
</style>
