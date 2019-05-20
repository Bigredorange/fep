<template>
  <div>
    <div
      ref="editor"
      v-loading="isLoading"
    />
  </div>
</template>

<script>
/**
 * TODO: 后期上线帮助文档编写使用
 *
 */
import Wangeditor from 'wangeditor';
import menus from './menus';

export default {
  props: {
    value: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      isLoading: false,
      editor: null,
      inited: false,
    };
  },
  watch: {
    value(value) {
      if (this.inited) return;
      this.inited = true;
      this.setHtml(value);
    },
  },
  mounted() {
    const editor = new Wangeditor(this.$refs.editor);
    this.setConfig(editor);
    editor.create();
    this.editor = editor;
  },
  methods: {

    /**
     * 配置编辑器
     */
    setConfig(editor) {
      // 调试模式
      editor.customConfig.debug = process.env.NODE_ENV === 'production';
      // 菜单列表
      editor.customConfig.menus = menus;
      // 编辑区域层级
      editor.customConfig.zIndex = 10;
      // 图片上传链接
      editor.customConfig.showLinkImg = false; // 不上传网络图片
      editor.customConfig.customUploadImg = async (files, insert) => {
        // 插入图片链接
        const urls = await this.uploadImage(files);
        urls.forEach(url => insert(url));
      };
      // 监听内容更改事件
      editor.customConfig.onchange = (html) => {
        this.$emit('input', html);
        this.$emit('update:value', html);
      };
    },

    /**
     * 设置编辑器内容
     */
    setHtml(html) {
      this.editor.txt.html(html);
    },

    /**
     * 上传并返回图片路径
     */
    uploadImage(files) {
      this.isLoading = true;
      return Promise.all(
        files.map(file => this.$api.filesUploadFile({
          file,
          type: 2,
        })),
      ).then((filePaths) => {
        const paths = filePaths.map(path => `${this.$config.baseURL}/files/downLoadUpFile?type=2&filePath=${path}`);
        return paths;
      }).finally(() => {
        this.isLoading = false;
      });
    },

  },
};
</script>
