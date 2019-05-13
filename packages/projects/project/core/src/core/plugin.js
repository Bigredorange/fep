import cookie from 'js-cookie';
import './element'; // 引入element-ui
import utils from './utils';
import upload from './upload';
import store from '../store/index';
import localDatabase from './localDatabase';
import clickoutside from './directives/clickoutside';

export default {
  install(Vue) {
    const api = require('./api');
    const { loadIn, loadOut } = require('./ajax');

    Vue.directive('clickoutside', clickoutside);

    Vue.filter('formatMoney', utils.formatMoney);
    Vue.filter('formatDate', utils.formatDate);

    Vue.prototype.$cookie = cookie;
    Vue.prototype.$loadIn = loadIn;
    Vue.prototype.$loadOut = loadOut;
    Vue.prototype.$utils = utils;
    Vue.prototype.$api = api;
    Vue.prototype.$upload = upload;
    Vue.prototype.$p = (permission) => { // 判断是否有权限
      if (!store.state.permissionList.length || !permission) return false;
      return store.state.permissionList.includes(permission);
    };
    Vue.prototype.$opt = (key) => { // 获取key对应options值
      const dics = store.state.options[key];
      if (!dics || !dics.length) {
        // store.dispatch('options/getDataDictionary', key);
      }
      return dics || [];
    };
    Vue.prototype.$optDicLabel = (dicKey, value, conf = {}) => { // 根据某个数据字典的标识获取对应显示文本
      const {
        labelKey = 'value', // 显示的文本的键
        valueKey = 'id', // 传给后台的唯一标识
      } = conf;
      const options = Array.isArray(dicKey) ? dicKey : store.state.options[dicKey];
      if (!Array.isArray(dicKey) && (!options || !options.length)) {
        store.dispatch('options/getDataDictionary', dicKey);
        return null;
      }
      const target = options.find(option => option[valueKey] === value);
      return target ? target[labelKey] : null;
    };
    Vue.prototype.$db = localDatabase; // 本地缓存
  },
};
