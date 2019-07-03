<template>
  <div>
    <div
      id="editor"
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
import Tribute from 'tributejs';
import menus from './menus';

export default {
  props: {
    value: {
      type: String,
      default: '',
    },
    tributeConfig: {
      type: Object,
      default: () => {},
    },
    params: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      isLoading: false,
      editor: null,
      inited: false,
      tribute: {

      },
    };
  },
  watch: {
    value(v) {
      this.setHtml(v);
    },
  },
  mounted() {
    const editor = new Wangeditor(this.$refs.editor);
    this.setConfig(editor);
    editor.create();
    this.editor = editor;
    // this.editor.txt.html(this.value);
    this.setTribute();
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
      // editor.customConfig.onchange = (html) => {
      //   this.$emit('input', html);
      // };
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
    uploadImage() {
      // this.isLoading = true;
      // return Promise.all(
      //   files.map(file => this.$api.fileUpload({
      //     file,
      //     type: 'USER_AVATAR',
      //   })),
      // ).then((filePaths) => {
      //   const paths = filePaths.map(path => `${this.$config.baseURL}/file/download_upload?type=USER_AVATAR&fileId=${path}`);
      //   return paths;
      // }).finally(() => {
      //   this.isLoading = false;
      // });
    },
    setTribute() {
      if (this.tributeConfig && Object.keys(this.tributeConfig).length > 0) {
        const vm = this;
        const tribute = new Tribute({
          ...vm.tributeConfig,
          selectTemplate(item) {
            console.log(item);
            vm.setParms(item.original.value);
            const temp = `<a class="contract-template-flag" style="color: #356fb8;border-bottom: 1px solid #356fb8;">#${item.original.value}#</a>&nbsp;`;
            // const temp = `#${item.original.value}#`;
            return temp;
          },
        });
        // tribute.attach(document.querySelectorAll('.w-e-text'));
        tribute.attach(document.querySelectorAll('.w-e-text'));
      }
    },
    insertVarsIntoHtml(item) {
      const insertTagName = 'a';
      // 目前仅发现在webkit内核中使用插入HTML命令，如果是在td标签内插入span标签，可能会失效，浏览器将只插入纯文本。改用label标签后，暂未发现问题
      // 需排除Edge浏览器，Edge下td中插入label将无效，最终只会保留纯文本
      // if (UA.isWebkit && !UA.isEdge) {
      //     insertTagName = 'label'
      // }
      this.editor.cmd.do('insertHTML', `<${insertTagName} class="contract-template-flag" style="color: #356fb8;
      border-bottom: 1px solid #356fb8;">#${item.value}#</${insertTagName}>&nbsp;`);
      this.setParms(item.value);
    },
    setParms(value) {
      if (this.params.indexOf(value) === -1) {
        this.params.push(value);
        this.$emit('updateParams', this.params);
      }
    },
    setContent() {
      this.editor.change();
    },
    getContent() {
      return this.editor.txt.html();
    },
  },
};
</script>
<style lang="scss">
.w-e-text-container {
  height: 500px !important;
}
.tribute-container {
  position: absolute;
  top: 0;
  left: 0;
  height: auto;
  max-height: 300px;
  max-width: 500px;
  overflow: auto;
  display: block;
  z-index: 999999;
}
.tribute-container ul {
  margin: 0;
  margin-top: 2px;
  padding: 0;
  list-style: none;
  background: #efefef;
}
.tribute-container li {
  width: 200px;
  padding: 5px 5px;
  cursor: pointer;
}
.tribute-container li.highlight {
  background: #ddd;
}
.tribute-container li span {
  font-weight: bold;
}
.tribute-container li.no-match {
  cursor: default;
}
.tribute-container .menu-highlighted {
  font-weight: bold;
}
</style>
