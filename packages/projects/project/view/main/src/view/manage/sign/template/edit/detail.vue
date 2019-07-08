<template>
  <el-dialog
    title="模板示例"
    :visible.sync="isShow"
    width="1000px"
  >
    <Editor
      ref="editor"
      v-model="content.html"
      class="editor"
    />
  </el-dialog>
</template>
<script>
import res from './template.json';

export default {
  data() {
    return {
      isShow: false,
      content: {
        html: '',
      },
    };
  },
  methods: {
    open() {
      // this.content = res.data.contractContent;
      this.isShow = true;
      console.log(this.$refs.editor);
      this.$nextTick(() => {
        this.$set(this.content, 'html', res.data.content);
      });
    },
  },
};
</script>
<style lang="scss" scoped>
  /deep/ .el-dialog__body {
    padding: 10px 20px;
  }
  .con {
    display: flex;
    justify-content: center;
    margin: 10px 0;
    p {
      min-width: 100px;
      line-height: 35px;
    }
  }
</style>
