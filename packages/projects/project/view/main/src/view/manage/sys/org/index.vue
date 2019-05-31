<template>
  <div class="con">
    <org-tree
      :list="list"
      @update="getDepartTree"
    />
  </div>
</template>
<script>
import OrgTree from './OrgTree.vue';

export default {
  components: {
    OrgTree,
  },
  data() {
    return {
      list: [],
    };
  },
  created() {
    this.getDepartTree();
  },
  methods: {
    getDepartTree() {
      this.$api.getDepartTree().then(
        (res) => {
          this.list = res;
        },
      );
    },
  },
};
</script>
<style lang="scss" scoped>
.con {
  padding: 8px;
}
</style>
