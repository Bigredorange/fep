const md = require('markdown-it')()
const slugify = require('transliteration').slugify

const strip = function(str, tags) {
    const cheerio = require('cheerio')
    const $ = cheerio.load(str, { decodeEntities: false })
    if (!tags || tags.length === 0) {
        return str
    }
    tags = !Array.isArray(tags) ? [tags] : tags
    let len = tags.length
    while (len--) {
        $(tags[len]).remove()
    }
    return $.html()
}

const fetch = function(str, tag) {
    const cheerio = require('cheerio')
    const $ = cheerio.load(str, { decodeEntities: false })
    if (!tag) return str
    return $(tag).html()
}

const wrap = function(render) {
    return function() {
        return render.apply(this, arguments)
            .replace('<code v-pre class="', '<code class="hljs ')
            .replace('<code>', '<code class="hljs">')
    }
}

const convert = function(str) {
    str = str.replace(/(&#x)(\w{4})/gi, function($0) {
        return String.fromCharCode(parseInt(encodeURIComponent($0).replace(/(%26%23x)(\w{4})(%3B)/g, '$2'), 16))
    })
    return str
}

module.exports = {
    loader: 'vue-markdown-loader',
    options: {
        use: [
            [require('markdown-it-anchor'), {
                level: 1,
                slugify,
                permalink: true,
                // renderPermalink: (slug, opts, state, permalink) => {},
                permalinkClass: 'header-anchor',
                permalinkSymbol: '#',
                permalinkBefore: false
            }],
            [require('markdown-it-container'), 'demo', {
                validate: function(params) {
                    return params.trim().match(/^demo\s*(.*)$/)
                },
                render: function(tokens, idx) {
                    const m = tokens[idx].info.trim().match(/^demo\s*(.*)$/)
                    if (tokens[idx].nesting === 1) {
                        let description = (m && m.length > 1) ? m[1] : ''
                        let content = tokens[idx + 1].content
                        let html = convert(strip(content, ['script', 'style'])).replace(/(<[^>]*)=""(?=.*>)/g, '$1')
                        let script = fetch(content, 'script')
                        let style = fetch(content, 'style')
                        let jsfiddle = { html: html, script: script, style: style }
                        let descriptionHTML = description
                            ? md.render(description)
                            : ''

                        jsfiddle = md.utils.escapeHtml(JSON.stringify(jsfiddle))

                        return `<demo-block class="demo-box" :jsfiddle="${jsfiddle}">
                                    <div class="source" slot="source">${html}</div>
                                    ${descriptionHTML}
                                    <div class="highlight" slot="highlight">`
                    }
                    return '</div></demo-block>\n'
                }
            }],
            [require('markdown-it-container'), 'tip'],
            [require('markdown-it-container'), 'warning']
        ],
        preprocess: function(MarkdownIt, source) {
            MarkdownIt.renderer.rules.table_open = function() {
                return '<table class="table">'
            }
            MarkdownIt.renderer.rules.fence = wrap(MarkdownIt.renderer.rules.fence)
            return source
        }
    }
}
