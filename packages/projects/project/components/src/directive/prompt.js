/*
 * @description: 内容输入框
  type Options = {
    content: string; // 内容
    title?: string; // 标题
    width?: string; // 宽度
    onOk?: function, // 确认的回调函数
    inputPattern?: regexp, // 输入框正则校验
    inputErrorMessage?: string, // 正则校验失败时提示内容
    initValue?: string; // 初始值
    sync?: boolean, // 点击确认时是否异步
    confirmOnPressEnter?: boolean = true, // 是否按回车时提交表单
  };
  当options为字符串时，显示内容
 */
import Vue from 'vue';
import Prompt from '../components/Prompt/index.vue';

export default (options = {}) => {
  options = typeof (options) === 'string' ? {
    content: options,
  } : options;
  if (!options.content) return Promise.reject('content不能为空');
  return new Promise((resolve, reject) => {
    new Vue({
      render: h => h(Prompt, {
        props: {
          ...options,
          resolve,
          reject,
        },
      }),
    }).$mount();
  });
};
