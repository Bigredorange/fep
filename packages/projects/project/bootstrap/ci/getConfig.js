const projectConfig = require('@fep-project/config');
const path = require('path');

const pages = [
  {
    key: 'entry',
    title: '灵工平台',
    outputPublicPath: '',
  },
];

function getConfig(page) {
  return {
    eslint: true,
    entry: {
      [page.key]: [path.join(__dirname, `../src/entry/${page.key}.js`)]
    },
    dist: path.join(__dirname, '../../../../../dist'),
    library: page.key,
    template: {
      title: page.title,
      chunks: ['vendors', page.key],
      favicon: path.join(__dirname, `../src/assets/${projectConfig.system.alias}.ico`),
      template: path.join(__dirname, '../src/index.html'),
      filename: page.outputPublicPath ? `${page.outputPublicPath}/index.html` : 'index.html',
    },
    copy: {
      from: path.join(__dirname, '../src/update.html'),
      to: page.outputPublicPath,
    },
    optimization: {
      splitChunks: {
        chunks: 'async',
        minSize: 30000,
        minChunks: 1,
        maxAsyncRequests: 5,
        maxInitialRequests: 3,
        automaticNameDelimiter: '~',
        name: true,
        cacheGroups: {
          vendors: {
            test: /(vue\.esm\.js|vuex|vue-router|axios|babel|element-ui)/,
            chunks: 'all',
            name: 'vendors',
            priority: 100,
          },
        },
      },
    },
    loader: {
      sassResources: {
        options: {
          sourceMap: true,
          resources: [
            path.join(__dirname, '../node_modules/@fep-project-lib/sass-resources/src/*.scss'),
          ],
        },
      },
    },
  };
};

module.exports = () => {
  // 多页面入口
  return pages.map(getConfig);
};
