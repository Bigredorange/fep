module.exports = function (config, option) {
  // const LoadCDNPlugin = this.plugin.loadCDNPlugin
  let entry = option.entry

  if (Array.isArray(entry) || typeof entry === 'string') {
    entry = {
      // index: [LoadCDNPlugin.entry].concat(entry)
      index: entry
    }
  } else if (typeof entry === 'object') {
    Object.keys(entry).forEach(key => {
      entry[key] = entry[key]
    })
  }

  config.entry = entry
}