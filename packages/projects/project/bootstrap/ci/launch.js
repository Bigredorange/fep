const launch = require('@fep/launchs-pc');
const createBootstrap = require('./createBootstrap');
const genderRoutes = require('./genderRoutes');
const getConfig = require('./getConfig.js');

/**
 * TODO: 增量运行
 */
const deps = createBootstrap();

/**
 * 生成@fep-project-lib/routes下的routes.json文件
 */
genderRoutes();

/**
 * 配置/启动项目
 */
const instance = launch.set(getConfig());

if (process.env.NODE_ENV === 'production') {
  instance.build();
} else {
  instance.dev();
}
