module.exports = function (config, option) {
  const {
    minimize,
    optimization
  } = option;

  if (minimize) {
    config.optimization.minimize = minimize;
  }
  
  if (optimization) {
    config.optimization = optimization;
  }
}