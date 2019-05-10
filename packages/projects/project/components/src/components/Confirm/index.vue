<template>
  <el-dialog
    class="ui-dialog"
    :close-on-click-modal="false"
    :visible.sync="isShow"
    :title="title === null ? '提示' : title"
    :width="width"
  >
    <div class="tip">
      <img
        v-if="type === 'tip'"
        src="./assets/prompt.png"
      >
      <img
        v-else-if="type === 'error'"
        src="./assets/warning.png"
      >
      <img
        v-else-if="type === 'success'"
        src="./assets/success.png"
      >
      <p>{{ content }}</p>
    </div>
    <div slot="footer">
      <el-button
        v-if="showClose"
        size="small"
        @click="cancel"
      >
        {{ cancelButtonText }}
      </el-button>
      <el-button
        ref="confirm"
        type="primary"
        size="small"
        :loading="submitLoading"
        @click="submit"
      >
        {{ confirmButtonText }}
      </el-button>
    </div>
  </el-dialog>
</template>

<script>
export default {
  props: {
    title: { // 标题
      type: String,
      default: null,
    },
    width: { // 弹框宽度
      type: String,
      default: '424px',
    },
    type: { // 图标类型
      type: String,
      default: 'tip',
    },
    content: { // 内容
      type: String,
      default: '',
    },
    contentIsHTML: { // 是否使用html渲染内容
      type: Boolean,
      default: false,
    },
    onOk: { // 确认的回调函数
      type: Function,
      default: null,
    },
    onCancel: { // 取消的回调函数
      type: Function,
      default: null,
    },
    showClose: { // 是否显示取消按钮
      type: Boolean,
      default: true,
    },
    cancelButtonText: { // 取消按钮的文字
      type: String,
      default: '取消',
    },
    confirmButtonText: { // 确认按钮的文字
      type: String,
      default: '确认',
    },
    /* 异步调用 */
    sync: { // 是否异步
      type: Boolean,
      default: false,
    },
    onResolve: { // 成功时的回调
      type: Function,
      default: null,
    },
    onReject: { // 失败时的回调
      type: Function,
      default: null,
    },
    closeOnReject: { // 失败时关闭弹框
      type: Boolean,
      default: true,
    },
  },
  data() {
    return {
      isShow: false,
      submitLoading: false,
    };
  },
  watch: {
    isShow(value) {
      if (value) return;
      this.$destroy();
      document.body.removeChild(this.$el);
    },
  },
  mounted() {
    document.body.appendChild(this.$el);
    this.isShow = true;
    this.$nextTick(() => {
      this.$refs.confirm.$el.focus();
    });
  },
  methods: {
    submit() {
      if (this.onOk) {
        const cb = this.onOk();
        if (!this.sync || !(cb instanceof Promise)) {
          this.isShow = false;
          return;
        }
        this.submitLoading = true;
        cb.then((res) => {
          if (this.onResolve) {
            this.onResolve(res, this);
          }
          this.isShow = false;
        }).catch((err) => {
          if (this.onReject) {
            this.onReject(err, this);
          }
          if (this.closeOnReject) {
            this.isShow = false;
          }
        }).finally(() => {
          this.submitLoading = false;
        });
        return;
      }
      this.isShow = false;
    },
    cancel() {
      if (this.onCancel) {
        this.onCancel();
      }
      this.isShow = false;
    },
    close() {
      this.isShow = false;
    },
  },
};
</script>

<style lang="scss" scoped>
.ui-dialog {
  /deep/ .el-dialog__body {
    padding: 29px 46px 37px;
  }
}
.tip {
  display: flex;
  align-items: center;
  img {
    flex-shrink: 0;
    margin-right: 14px;
    width: 30px;
    height: 30px;
  }
  p {
    font-size: 14px;
    color: #333;
  }
}
</style>
