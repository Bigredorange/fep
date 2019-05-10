import CryptoJS from 'crypto-js';

const aesKey = 'abcdefgabcdefg12';

// aes加密
const aesEncrypt = data => CryptoJS.AES.encrypt(data, CryptoJS.enc.Utf8.parse(aesKey), {
  mode: CryptoJS.mode.ECB,
  padding: CryptoJS.pad.Pkcs7,
}).toString();

function checkIdentity(value, getDetail = false) {
  if (value.length === 15) return true;
  if (value.length !== 18) return false;
  const address = value.substring(0, 6); // 6位，地区代码
  const birthday = value.substring(6, 14); // 8位，出生日期
  const sequenceCode = value.substring(14, 17);
  const province = {
    11: '北京',
    12: '天津',
    13: '河北',
    14: '山西',
    15: '内蒙古',
    21: '辽宁',
    22: '吉林',
    23: '黑龙江 ',
    31: '上海',
    32: '江苏',
    33: '浙江',
    34: '安徽',
    35: '福建',
    36: '江西',
    37: '山东',
    41: '河南',
    42: '湖北 ',
    43: '湖南',
    44: '广东',
    45: '广西',
    46: '海南',
    50: '重庆',
    51: '四川',
    52: '贵州',
    53: '云南',
    54: '西藏 ',
    61: '陕西',
    62: '甘肃',
    63: '青海',
    64: '宁夏',
    65: '新疆',
    71: '台湾',
    81: '香港',
    82: '澳门',
    91: '国外',
  };
  const year = birthday.substring(0, 4);
  const month = birthday.substring(4, 6);
  const day = birthday.substring(6);
  const tempDate = new Date(Number(year), parseFloat(month) - 1, parseFloat(day));
  if (province[parseInt(address.substr(0, 2), 10)] === undefined || (
    tempDate.getFullYear() !== parseFloat(year)
    || tempDate.getMonth() !== parseFloat(month) - 1
    || tempDate.getDate() !== parseFloat(day)
  )) {
    // 这里用getFullYear()获取年份，避免千年虫问题
    return false;
  }
  const weightedFactors = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2, 1]; // 加权因子
  const valideCode = [1, 0, 10, 9, 8, 7, 6, 5, 4, 3, 2]; // 身份证验证位值，当中10代表X
  const certificateNoArray = value.split(''); // 得到身份证数组
  let sum = 0; // 声明加权求和变量
  if (certificateNoArray[17].toLowerCase() === 'x') {
    certificateNoArray[17] = '10'; // 将最后位为x的验证码替换为10
  }
  for (let i = 0; i < 17; i += 1) {
    sum += weightedFactors[i] * Number(certificateNoArray[i]); // 加权求和
  }
  const valCodePosition = sum % 11; // 得到验证码所在位置
  if (Number(certificateNoArray[17]) !== valideCode[valCodePosition]) return false;
  if (!getDetail) return true;
  return {
    age: new Date().getFullYear() - Number(value.substr(6, 4)),
    birthday: `${year}-${month}-${day}`,
    gender: Number(sequenceCode) % 2 === 0 ? '女' : '男',
  };
}

const regExp = (value, type = 'mp') => {
  let result = false;
  switch (type) {
    case 'mp': // 验证手机号格式
      result = /^1[3,4,5,6,7,8,9]{1}[0-9]{9}$/.test(value);
      break;
    case 'em': // 验证email格式
      result = /\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/.test(value);
      break;
    case 'qq': // 验证qq号格式
      result = /^[1-9]{1}[0-9]{5,11}$/.test(value);
      break;
    case 'wx': // 验证微信号格式
      result = /^[a-zA-Z\d_]{5,}$/.test(value);
      break;
    case 'pw': // 校验6-16位数字+英文密码+下划线
      result = /^\w{6,16}$/.test(value);
      break;
    case 'account': // 校验账号只包含数字和字母
      result = /^[a-zA-Z0-9]{1,}$/.test(value);
      break;
    case 'password': // 校验密码不少于6位
      result = /^[a-zA-Z0-9]{6,}$/.test(value);
      break;
    case 'number': // 校验是否为数字
      result = /^\d+\.?\d*$/.test(value);
      break;
    case 'money': // 校验是否为金钱
      result = /^(0|[1-9][0-9]*)(\.{1}\d{1,})?$/.test(value);
      break;
    case 'postcode': // 校验邮编
      result = /^\d{6}$/.test(value);
      break;
    case 'identity': // 校验身份证
      result = !!checkIdentity(value);
      break;
    case 'nonWhitespace': // 无空格
      result = /^\S*$/.test(value);
      break;
    case 'name': // 校验中英文名称
      result = (/^([a-zA-Z\s]+)$/.test(value) && !/\s{2,}/.test(value)) || /^\S*$/.test(value);
      break;
    case 'tel': // 固定电话
      result = /^(\(0\d{2,3}\)|0\d{2,3}-|0\d{2,3}|\s)?\d{7,10}$/.test(value);
      break;
  }
  return result;
};

const formatDate = (timestamp, fmt = 'yyyy-MM-dd hh:mm:ss') => {
  if (!timestamp) return null;
  const date = new Date(timestamp);
  const o = {
    'y+': date.getFullYear(),
    'M+': date.getMonth() + 1,
    'd+': date.getDate(),
    'h+': date.getHours(),
    'm+': date.getMinutes(),
    's+': date.getSeconds(),
    'w+': date.getDay(),
  };
  let result = fmt;
  Object.entries(o).forEach(([rxp, value]) => {
    result = result.replace(new RegExp(rxp), ($1) => {
      const str = `0000${value}`;
      if ($1 === 'M' || $1 === 'd') {
        if (value > 9) {
          return String(value);
        }
      } else if ($1 === 'ww') {
        const week = '一二三四五六日'.substr(value - 1, 1);
        return `周${week}`;
      }
      return str.substr(str.length - $1.length);
    });
  });
  return result;
};

const formatMoney = (number, precision = 2) => {
  if (number === 0 || number === '0') return Number(number).toFixed(precision);
  if (Number.isNaN(number) || !number) return null;
  const fixedNumber = Math.round(number * 100) / 100; // 四舍五入
  let [int, float] = String(fixedNumber).split('.');
  int = int.replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
  let result = int;
  if (precision) {
    if (float) {
      float = float.substr(0, precision).padEnd(precision, '0');
    } else {
      float = ''.padEnd(precision, '0');
    }
    result = `${int}.${float}`;
  }
  return result;
};

const autoLoad = (blob, fileName = 'data.xlsx') => {
  const name = `${fileName}`;
  if (window.navigator.msSaveOrOpenBlob) {
    window.navigator.msSaveOrOpenBlob(blob, name);
  } else {
    const urlObject = window.URL || window.webkitURL || window;
    const dom = document.createElement('a');
    dom.href = urlObject.createObjectURL(blob);
    dom.download = name;
    if (document.all) {
      dom.click();
    } else {
      const ev = document.createEvent('MouseEvents');
      ev.initMouseEvent('click', true, false, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
      dom.dispatchEvent(ev);
    }
  }
};

/*
  用于重新初始化实例的data
  // 使用示例
  this.$utils.initData.call(this, { exclude: ['key'] });
*/
function initData(options = {}) {
  const data = this.$options.data.call(this);
  let result = data;
  if (options.include) {
    result = {};
    options.include.forEach((key) => {
      if (/\./.test(key)) {
        const [parentKey, childKey] = key.split('.');
        if (!result[parentKey]) {
          result[parentKey] = Array.isArray(data[parentKey]) ? [] : {};
        }
        result[parentKey][childKey] = data[parentKey][key];
      } else {
        result[key] = data[key];
      }
    });
  }
  if (options.exclude) {
    options.exclude.forEach((key) => {
      if (/\./.test(key)) {
        const [parentKey, childKey] = key.split('.');
        result[parentKey][childKey] = this[parentKey][childKey];
      } else {
        result[key] = this[key];
      }
    });
  }
  Object.assign(this.$data, result);
}

/*
  防抖函数：最后一次操作后执行一次
 */
function debounce(fn, waitTime = 3e2, immediate) {
  let timer = null;
  return function (...args) {
    if (immediate && !timer) fn.apply(this, args);
    if (timer) clearTimeout(timer);
    timer = setTimeout(() => {
      fn.apply(this, args);
    }, waitTime);
  };
}

/*
  节流函数：一定间隔后执行一次
*/
function throttle(fn, waitTime = 3e2, immediate) {
  let timer = null;
  let callNow = immediate;
  return function (...args) {
    if (callNow) {
      fn.apply(this, args);
      callNow = false;
    }
    if (!timer) {
      timer = setTimeout(() => {
        fn.apply(this, args);
        timer = null;
      }, waitTime);
    }
  };
}

/*
  从字符串中获取数字
 */
function takeNum(value) {
  const splitValue = value.match(/[\d.]/g);
  if (splitValue === null) return '';
  const matchNum = splitValue.join('').match(/\d+\.?\d*/);
  if (matchNum === null) return '';
  return matchNum[0];
}

const download = (url) => {
  const aLink = document.createElement('a');
  aLink.target = '_blank';
  aLink.href = url;
  aLink.click();
};

export default {
  aesEncrypt,
  regExp,
  formatDate,
  formatMoney,
  autoLoad,
  checkIdentity,
  initData,
  debounce,
  throttle,
  takeNum,
  download,
};
