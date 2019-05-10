
const loaderUtils = require('loader-utils')

function getIcons(loaderContext, icons) {
    return `{
        ${Object.keys(icons).map(key => {
        return `'${key}':require(${loaderUtils.stringifyRequest(loaderContext, icons[key])}).default.id`
    }).join(',\n')}
    }`
}

module.exports = function(content, map) {
    const loaderContext = this
    const callback = this.async()
    const query = loaderUtils.getOptions(this) || {}

    const moduleName = query.module === true ? '$icon' : query.module

    callback(null, `
        module.exports = function(Component) {
            Component.options.beforeCreate = Component.options.beforeCreate.concat(function(context){
                this['${moduleName}'] = Object.assign({}, this['${moduleName}'], ${getIcons(loaderContext, JSON.parse(content))})
            })
        }
    `, map)
}
