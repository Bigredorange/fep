import Vue from 'vue';
import axios from 'axios';
import qs from 'qs';
import { Message, MessageBox } from 'element-ui';
import iconv from 'iconv-lite';
import cookie from 'js-cookie';
import store from '../store';

const { $config } = Vue.prototype;

// 配置接口地址
axios.defaults.baseURL = $config.baseURL;
// 允许请求携带cookie信息
axios.defaults.withCredentials = true;
// 配置超时时间
axios.defaults.timeout = 180e3;
// 配置请求头
// axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

// 数据加载中动画类zeplin
const loadIn = () => {
  if (window.load) {
    return;
  }
  window.load = document.createElement('div');
  window.load.id = 'loading';
  window.load.innerHTML = `
    <div class="ripple ripple1"></div>
    <div class="ripple ripple2"></div>
    <div class="ripple ripple3"></div>
    <div class="ripple ripple4"></div>
  `;
  document.body.appendChild(window.load);
};

// 移除加载中动画
const loadOut = () => {
  if (!window.load) {
    return;
  }
  window.load.classList.add('fade-out');
  setTimeout(() => {
    try {
      document.body.removeChild(window.load);
      window.load = undefined;
    } catch (e) {
      window.load = undefined;
    }
  }, 250);
};

// 添加请求拦截器
axios.interceptors.request.use((cfg) => {
  // 若是有做鉴权token , 就给头部带上token
  const token = sessionStorage.hroTokenName && cookie.get(sessionStorage.hroTokenName);
  if (token && !cfg.noAuth) {
    cfg.headers.common.Authorization = `Bearer ${token}`;
  }
  return cfg;
}, error => Promise.reject(error));

// 添加响应拦截器
axios.interceptors.response.use((response) => {
  loadOut(); // 去除加载中动画
  const res = response.data;
  if (response.config.responseType === 'blob') { // getBlob 或 postBlob会带有responseType参数，当返回的blob data类型为json时，代表返回错误，需返回报错信息
    if (res.type !== 'application/json') {
      // 获取文件名，将文件名从gb2312转码成utf-8
      const fileName = response.headers['content-disposition'];
      if (fileName) {
        res.fileName = iconv.decode(fileName.replace(/.+filename=/, ''), 'gb2312');
      }
      return Promise.resolve(res);
    }
    return new Promise((resolve, reject) => {
      const fr = new FileReader();
      fr.onload = function getResult() {
        const r = JSON.parse(this.result);
        MessageBox.alert(r.message);
        reject(r);
      };
      fr.readAsText(res);
    });
  }
  if (res.status === 200) {
    return res.data;
  }
  if (!response.config.noMessage) {
    MessageBox.alert(res.message);
  }
  if (res.status === 4002) { // 登出
    store.dispatch('logout');
  }
  return Promise.reject(res);
}, (error) => {
  loadOut(); // 去除加载中动画
  // 对响应错误做点什么
  if (error.toString().includes('timeout of')) {
    Message.error('请求超时');
  } else if (error.toString().includes('Network Error')) {
    Message.error('网络异常');
  } else if (error.response.status === 401) {
    Message.error('登录已过期，请重新登录');
    store.dispatch('logout');
  } else if (error.response.status === 404) {
    Message.error(`${error.response.data.path}请求404，请联系运维小哥哥`);
  }
  return Promise.reject(error);
});

const get = (url, arg, cfg = {}) => axios.get(arg ? `${url}?${qs.stringify(arg, { indices: false })}` : url, cfg);

const post = (url, arg, cfg = {}) => axios.post(url, qs.stringify(arg), cfg);

const put = (url, arg, cfg = {}) => axios.put(url, qs.stringify(arg), cfg);

const del = (url, arg, cfg = {}) => axios.delete(arg ? `${url}?${qs.stringify(arg)}` : url, cfg);

const patch = (url, arg, cfg = {}) => axios.patch(arg ? `${url}?${qs.stringify(arg)}` : url, cfg);

const postForm = (url, arg, cfg = {}) => {
  const formData = new FormData();
  if (arg) {
    Object.keys(arg).forEach(key => formData.append(key, arg[key] === null ? '' : arg[key]));
  }
  return axios.post(url, formData, {
    'Content-Type': 'multipart/form-data',
    ...cfg,
  });
};

const postBlob = (url, arg, cfg = {}) => axios.post(url, qs.stringify(arg), {
  responseType: 'blob',
  ...cfg,
});

const getBlob = (url, arg, cfg = {}) => axios.get(!arg ? url : `${url}?${qs.stringify(arg)}`, {
  responseType: 'blob',
  ...cfg,
});

const postJson = (url, arg, cfg = {}) => axios.post(url, arg, {
  headers: {
    'Content-type': 'application/json;charset=UTF-8',
  },
  ...cfg,
});

const putJson = (url, arg, cfg = {}) => axios.put(url, arg, {
  headers: {
    'Content-type': 'application/json;charset=UTF-8',
  },
  ...cfg,
});

module.exports = {
  loadIn,
  loadOut,
  // 以下为请求方法
  get,
  post,
  put,
  del,
  postForm,
  postBlob,
  getBlob,
  postJson,
  putJson,
  patch,
};
