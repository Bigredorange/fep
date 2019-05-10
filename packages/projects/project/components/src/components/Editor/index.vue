<template>
  <div>
    <div ref="editor" />
  </div>
</template>

<script>
/**
 * TODO: 后期上线帮助文档编写使用
 */
import Wangeditor from 'wangeditor';
import menus from './menus';

export default {
  data() {
    return {};
  },
  mounted() {
    const editor = new Wangeditor(this.$refs.editor);
    this.setConfig(editor);
    editor.create();
  },
  methods: {
    setConfig(editor) {
      // 调试模式
      editor.customConfig.debug = process.env.NODE_ENV === 'production';
      // 菜单列表
      editor.customConfig.menus = menus;
      // 图片上传链接
      editor.customConfig.showLinkImg = false; // 不上传网络图片
      // editor.customConfig.customUploadImg = (files, insert) => {
      //   insert(url); //插入完整url
      // };
    },
  },
};
</script>

<style lang="scss" scoped>
</style>
