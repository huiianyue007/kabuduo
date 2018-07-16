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
Ajax.prototype.post = function (url, data = {}){
  data = JSON.stringify(data).replace(/"/g, '').replace(/:/g, '=').replace(/,/g, '&')
  data = '?' + data.substring(1, data.length - 1)
  return this.request({
    method: 'post',
    url,
    data
  })
}
Ajax.prototype.get = function (url, config = {}) {
  config.url = url
  config.method = 'get'
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