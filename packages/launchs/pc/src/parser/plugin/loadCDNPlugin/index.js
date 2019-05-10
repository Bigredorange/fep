
// TODO:改为将/stc开头的地址替换为cdn地址
const fs = require('fs')
const path = require('path')
const dm_dir = path.resolve(__dirname, './.dm')
const dm_file = path.resolve(__dirname, './.dm/setPublicPath.js')
const replaceRegExp = `^\\/${process.env.DM_ASSET_PATH}\\/(\\S+)\\/(\\S+)\\/(.*)`
const replaceStr = process.env.NODE_ENV === 'development' ? `/node_modules/@$1/$2/${process.env.DM_DIST_DIR}/$3` : `${process.env.DM_CDN_URL}$1/$2/$3`

// 创建 .dm 文件夹
if (!fs.existsSync(dm_dir)) {
    !fs.existsSync(dm_dir) && fs.mkdirSync(dm_dir)
}

// 写入setPublicPath.js
fs.writeFileSync(dm_file, `
if(window.getPublicPath){
    __webpack_public_path__ = window.getPublicPath(__webpack_public_path__);
}`)

class LoadCDNPlugin {
    apply(compiler) {
        compiler.hooks.compilation.tap('LoadCDNPlugin', (compilation) => {
            compilation.hooks.htmlWebpackPluginAfterHtmlProcessing && compilation.hooks.htmlWebpackPluginAfterHtmlProcessing.tapAsync(
                'LoadCDNPlugin',
                (data, cb) => {
                    data.html = data.html.replace(/<\/head>/, `  <script>window.getPublicPath = function(url){ return url.replace(/${replaceRegExp}/, '${replaceStr}') }</script>\n</head>`)
                    data.html = data.html.replace(/(src|href)=\".*?\"/gi, (str) => {
                        const arr = str.split(/\"/)
                        return arr[0] + '"' + arr[1].replace(new RegExp(replaceRegExp), replaceStr) + '"' + arr[2]
                    })
                    cb(null, data)
                }
            )
        })
    }
}

LoadCDNPlugin.entry = path.resolve(__dirname, './.dm/setPublicPath.js')

module.exports = LoadCDNPlugin
