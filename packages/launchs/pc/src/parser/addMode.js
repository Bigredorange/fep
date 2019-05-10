module.exports = function(config, option) {
    const mode = option.mode || process.env.NODE_ENV || 'production'

    if (mode) {
        config.mode = mode
    }
}
