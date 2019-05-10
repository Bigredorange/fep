module.exports = () => {
  const fs = require('fs');
  const path = require('path');
  const packageJson = require('../package.json');
  
  /**
   * 获取所有路由
   */
  const views = Object.keys(packageJson.dependencies).filter(dep => /@fep-project\/v-main$/.test(dep));
  
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
  })
  
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
};
