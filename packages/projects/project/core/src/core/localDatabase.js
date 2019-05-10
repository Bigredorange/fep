/**
 * 用于记忆用户操作
 * 以下述"name"生成的键值对数据库，对localStorage进行操作
 * 使用前需init初始化
 * 查 db('key');
 * 增改 db('key', value);
 * 删 db.del('key');
 * 删除个人数据本地数据 db.del();
 */

let name = null; // 用户标识
let localName = 'localDatabase'; // 在localStorage中的命名
let database = {};

const db = function (key, value = null) {
  if (!name) return null;
  // 增、改、查
  if (value === null) {
    const target = database[name][key];
    if (Number.isNaN(target)) {
      return target || null;
    }
    return target;
  }
  database[name][key] = value;
  db.save();
  return null;
};
db.init = function (config = {}) {
  if (typeof (config) === 'string') {
    name = config;
  } else {
    const {
      name: configName,
      localName: configLocalName,
    } = config;
    name = configName;
    if (configLocalName) {
      localName = configLocalName;
    }
  }
  if (!name) return;
  if (localStorage[localName]) {
    try {
      database = JSON.parse(localStorage[localName]);
    } catch (err) {
      database = {};
    }
  } else {
    database = {};
  }
  if (!database[name]) {
    database[name] = {};
    db.save();
  }
};
db.save = function () {
  if (!name) return;
  // 数据保存到本地
  localStorage[localName] = JSON.stringify(database);
};
db.del = function (key) {
  if (!name) return;
  // 删
  if (key === undefined) {
    delete database[name];
  } else if (key) {
    delete database[name][key];
  }
  db.save();
};

export default db;
