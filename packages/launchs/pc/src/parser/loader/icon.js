module.exports = {
    loader: 'svg-sprite-loader',
    options: {
        runtimeGenerator: require.resolve('./vue-icon/svg-custom-runtime-generator'),
        symbolId: 'icon-[hash:5]',
        symbolRegExp: /([^<>/\\\|:""\*\?]+)\.icon$/
    }
}
