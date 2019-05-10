import router from '../index';

export default (subModules) => {
  // 生成路由列表
  const { main, ...childRoutes } = subModules;
  const [mainRoute, ...otherRoutes] = main.routes;
  Object.entries(childRoutes).forEach((item) => {
    mainRoute.children.push(item[1]);
  });

  router.addRoutes([mainRoute, ...otherRoutes]);
};
