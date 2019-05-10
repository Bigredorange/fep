module.exports = function(config, option) {
    const externals = option.externals

    if (externals) {
        config.externals = externals
    }
}
