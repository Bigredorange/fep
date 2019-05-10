const linkDllReference = require('./linkDllReference')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
// const loadCDNPlugin = require('./loadCDNPlugin')
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin')

module.exports = {
    linkDllReference,
    MiniCssExtractPlugin,
    // loadCDNPlugin,
    OptimizeCSSAssetsPlugin
}
