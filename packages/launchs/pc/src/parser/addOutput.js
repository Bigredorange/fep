
const path = require('path')

module.exports = function(config, option) {
    const { publicPath, library, libraryTarget, dist, hash, chunkhash } = option

    const output = {}

    if (publicPath) {
        output.publicPath = publicPath
    }
    if (library) {
        output.library = library
    }
    if (libraryTarget) {
        output.libraryTarget = libraryTarget
    }
    if (dist) {
        output.path = path.resolve(dist)
    }

    if (!hash) {
        output.filename = '[name].js'
    }
    if (!chunkhash) {
        output.chunkFilename = '[name].[hash:4].js'
    }

    config.output = {
        filename: '[name].[hash:9].js',
        chunkFilename: '[name].[chunkhash:9].js',
        crossOriginLoading: 'anonymous',
        ...config.output,
        ...output
    }
}
