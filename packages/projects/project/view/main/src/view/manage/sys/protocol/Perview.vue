<template>
  <el-dialog
    class="ui-dialog"
    :close-on-click-modal="false"
    :visible.sync="isShow"
    title="预览效果"
    width="419px"
  >
    <div
      class="perview"
      v-html="value"
    />
  </el-dialog>
</template>
<script>
export default {
  props: {
    value: {
      type: [String, Number],
      default: '',
    },
  },
  data() {
    return {
      isShow: false,
    };
  },
  methods: {
    open() {
      this.isShow = true;
    },
  },
};
</script>

<style lang="scss" scoped>
.perview {
  width: 375px;
  height: 550px;
  overflow-x: auto;
}
</style>
