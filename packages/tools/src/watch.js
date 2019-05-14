module.exports = function(filepath, callback) {
  const gaze = require('gaze');
  gaze(filepath, function(err, watcher) {
    this.on('changed', function(filepath) {
      console.log(filepath + 'was changed')
      callback && callback(filepath)
    })
  })
}