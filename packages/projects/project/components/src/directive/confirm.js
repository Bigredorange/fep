/*
 * @description: 确认框
  type Options = {
    content: string; // 内容
    contentIsHTML?: boolean = false, // 是否使用html渲染内容
    title?: string; // 标题
    width?: string; // 宽度
    type?: string, // 内容左侧的图标
    onOk?: function, // 确认的回调函数
    onCancel?: function, // 取消的回调函数
    showClose?: boolean = true, // 是否显示取消按钮
    cancelButtonText?: string = 取消, // 取消按钮文字
    confirmButtonText? string = 确认, // 确认按钮文字
    sync?: boolean, // 点击确认时是否异步
    onResolve?: function, // 成功时的回调
    onReject?: function, // 失败时的回调
    closeOnReject?: boolean = true, // 失败时关闭弹框
  };
  当options为字符串时，显示内容
 */
import Vue from 'vue';
import Confirm from '../components/Confirm/index.vue';

export default (options = {}) => {
  options = typeof (options) === 'string' ? {
    content: options,
  } : options;
  if (!options.content) return Promise.reject('content不能为空');
  return new Promise((resolve, reject) => {
    new Vue({
      render: h => h(Confirm, {
        props: {
          ...options,
          resolve,
          reject,
        },
      }),
    }).$mount();
  });
};
