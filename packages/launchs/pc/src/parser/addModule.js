module.exports = function (config, option) {
  const loader = {}
  const extension = option.extension
  const rules = []

  Object.keys(this.loader).forEach((key) => {
    if (option.loader[key] !== false) {
      loader[key] = {
        ...this.loader[key],
        ...option.loader[key]
      }
    }
  })

  const scssLoader = [
    loader.style,
    loader.css,
    loader.postcss,
    loader.sass
  ]

  if (loader.sassResources) {
    scssLoader.push(loader.sassResources)
  }

  const jsLoader = [
    loader.babel,
  ];

  const vueLoader = [
    {
      ...loader.vue,
      options: {
        hotReload: config.mode === 'development',
        cssModules: {
          localIdentName: '[local]-[hash:base64:5]',
          camelCase: true
        },
        loaders: {
          icon: require.resolve('./loader/vue-icon/index.js'),
          js: [
            loader.babel
          ],
          css: scssLoader,
          scss: scssLoader
        }
      },
    },
  ];

  if (loader.eslint) {
    jsLoader.push(loader.eslint);
    vueLoader.push(loader.eslint);
  }

  Array.from(['js']).forEach(key => {
    rules.push({
      test: new RegExp(`\\.${key}$`),
      exclude: /node_modules/,
      use: jsLoader,
      ...extension[key]
    })
  })

  Array.from(['vue']).forEach(key => {
    rules.push({
      test: new RegExp(`\\.${key}$`),
      use: vueLoader,
      ...extension[key]
    })
  })

  // Array.from(['html', 'md', 'icon']).forEach(key => {
  //     rules.push({
  //         test: new RegExp(`\\.${key}$`),
  //         use: [
  //             {
  //                 ...loader[key]
  //             }
  //         ],
  //         ...extension[key]
  //     })
  // })

  Array.from(['css']).forEach(key => {
    rules.push({
      test: new RegExp(`\\.${key}$`),
      use: [
        loader.style,
        loader.css
      ],
      ...extension[key]
    })
  })

  Array.from(['scss']).forEach(key => {
    rules.push({
      test: new RegExp(`\\.${key}$`),
      use: scssLoader,
      ...extension[key]
    })
  })

  Array.from(['woff', 'svg', 'eot', 'ttf', 'gif', 'jpg', 'swf', 'png']).forEach(key => {
    rules.push({
      test: new RegExp(`\\.${key}$`),
      use: [{
        options: {
          limit: option.urlLoaderLimit,
          name: '[sha512:hash:base64:8].[ext]'
        },
        ...loader.url
      }],
      ...extension[key]
    })
  })

  config.module.rules = rules
}