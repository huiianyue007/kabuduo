const util = require('./util.js')
const Ajax = function () {
}
Ajax.prototype.request = function (config = {}) {
  config.url = util.server + config.url
  return new Promise(function (resolve, reject) {
    config.success = function (res) {
      if (res.data.status !== 'ok') {
        reject(res)
      } else {
        resolve(res)
      }
    }
    config.fail = reject
    wx.request(config)
  })
}
Ajax.prototype.post = function (url, data = {}, config = {}){
  data = JSON.stringify(data).replace(/"/g, '').replace(/:/g, '=').replace(/,/g, '&')
  data = '?' + data.substring(1, data.length - 1)
  return this.request(Object.assign(config, {
    method: 'post',
    url: url + data
  }))
}
Ajax.prototype.get = function (url, data) {
  return this.request({
    url,
    method: 'get',
    data
  })
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