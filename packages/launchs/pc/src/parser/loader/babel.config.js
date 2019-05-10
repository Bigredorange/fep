module.exports = {
  "presets": [
    [
      "@babel/preset-env",
      {
        "targets": {
          'browsers': ['last 2 versions', 'ie >= 10']
        }
      }
    ]
  ],
  "plugins": [
    ["@babel/plugin-transform-modules-commonjs"],
    "@babel/plugin-syntax-dynamic-import",
    "@babel/plugin-proposal-class-properties",
    // [
    //   "component",
    //   {
    //     "libraryName": "element-ui",
    //     "styleLibraryName": "theme-chalk"
    //   }
    // ]
  ]
}