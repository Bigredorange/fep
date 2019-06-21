<template>
  <div>
    <Editor
      ref="editor"
    />
    <el-button
      @click="onInsertVar($event, '姓名')"
    >
      姓名
    </el-button>
  </div>
</template>
<script>
export default {
  data() {
    return {

    };
  },
  methods: {
    async onInsertVar(e, item) {
      this.$refs.editor.insertVarIntoHtml(e, {
        text: item,
      });
    },
  },
};
</script>
<style lang="scss" scoped>

</style>
