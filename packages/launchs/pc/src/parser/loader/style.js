const path = require('path')

module.exports = {
    loader: 'style-loader',
    options: {
        transform: path.resolve(__dirname, './util/transform.js')
    }
}
