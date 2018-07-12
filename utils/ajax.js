const util = require('./util.js')
const Ajax = function () {
}
Ajax.prototype.request = function (config = {}) {
  config.url = util.server + config.url
  return new Promise(function (resolve, reject) {
    config.success = function (res) {
      resolve(res)
    }
    config.fail = reject
    wx.request(config)
  })
}
Ajax.prototype.post = function (config = {}){
  config.methods = 'post'
  return this.request(config)
}
Ajax.prototype.downloadFile = function (config = {}) {
  return new Promise((resolve, reject) => {
    wx.downloadFile({
      url: util.imgServer + config.url, //仅为示例，并非真实的资源
      success: resolve
    })
  })
}
module.exports = new Ajax()