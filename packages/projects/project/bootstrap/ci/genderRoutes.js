
const fs = require('fs');
const path = require('path');
const launch = require('@fep/launchs-pc');
 
const create = (views) => {
  /**
   * 获取主路由
   */
  const commonRoutes = [];
  let mainRoutes = null;
  views.forEach((view) => {
    if (view === '@fep-project/v-main') {
      mainRoutes = require(`../node_modules/${view}/src/router/routes.js`).staticRoutes;
    } else {
      const route = JSON.parse(JSON.stringify(require(`../node_modules/${view}`))); // 移除component
      commonRoutes.push(route);
    }
  });
  /**
   * 获取系统路由
   */
  mainRoutes[0].children = mainRoutes[0].children.concat(commonRoutes);
  /**
   * 生成路由文件至@fep-project-lib/routes
   */
  const routesPath = path.join(__dirname, '../node_modules/@fep-project-lib/routes/src/routes.json');
  const routes = {
    main: mainRoutes,
  }
  fs.writeFileSync(routesPath, JSON.stringify(routes));
}
 
module.exports = () => {
  /**
   * 获取所有路由
   */
  const packageJson = require('../package.json');
  const views = Object.keys(packageJson.dependencies).filter(dep => /@fep-project\/v-main$/.test(dep));
  // 生成路由
  create(views);
  console.log(process.env.NODE_ENV);
  if (process.env.NODE_ENV === 'development') {
    // 监听routes变化并生成路由
    console.log(views);
    // const routesPath = views.map(name => path.join(__dirname, `../node_modules/${name}/src/router/routes.js`));
    const routesPath = path.join(__dirname, '../node_modules/@fep-project-lib/routes/src/routes.json');
    launch.watch(routesPath, (filePath) => {
      create(views);
    });
  }
}

