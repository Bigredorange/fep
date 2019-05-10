<template>
  <el-dialog
    class="ui-dialog"
    :close-on-click-modal="false"
    :visible.sync="isShow"
    :title="title === null ? '提示' : title"
    :width="width"
  >
    <div class="tip">
      <h2>{{ content }}</h2>
      <el-input
        v-if="confirmOnPressEnter"
        ref="input"
        v-model.trim="value"
        :type="type"
        size="small"
        @keyup.enter.native="submit"
      />
      <el-input
        v-else
        ref="input"
        v-model.trim="value"
        :type="type"
        size="small"
      />
    </div>
    <div slot="footer">
      <el-button
        size="small"
        @click="cancel"
      >
        取消
      </el-button>
      <el-button
        type="primary"
        size="small"
        :loading="submitLoading"
        @click="submit"
      >
        确定
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
    type: { // 文本类型
      type: String,
      default: 'text',
    },
    width: { // 弹框宽度
      type: String,
      default: '424px',
    },
    content: { // 内容
      type: String,
      default: '',
    },
    onOk: { // 回调
      type: Function,
      default: null,
    },
    onCancel: { // 取消的回调函数
      type: Function,
      default: null,
    },
    inputPattern: { // 输入框正则校验
      type: RegExp,
      default: null,
    },
    inputErrorMessage: { // 正则校验失败时的信息提示
      type: String,
      default: '',
    },
    initValue: { // 初始值
      type: String,
      default: '',
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
    confirmOnPressEnter: { // 是否按回车时提交表单
      type: Boolean,
      default: true,
    },
  },
  data() {
    return {
      isShow: false,
      submitLoading: false,
      value: '',
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
    this.value = this.initValue;
    this.isShow = true;
    this.$nextTick(() => {
      this.$refs.input.focus();
    });
  },
  methods: {
    submit() {
      // 表单校验
      if (this.inputPattern && this.inputErrorMessage) {
        const isValid = new RegExp(this.inputPattern).test(this.value);
        if (!isValid) {
          this.$message.error(this.inputErrorMessage);
          return;
        }
      }
      // 执行提交回调
      if (this.onOk) {
        const cb = this.onOk(this.value);
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
  h2 {
    margin-bottom: 20px;
    line-height: 1;
    font-size: 16px;
    color: #718193;
  }
}
</style>
