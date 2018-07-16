const Ajax = require('../../utils/ajax.js')
Page({
  data: {
    isLogin: false
  },
  onLoad: function () {
    wx.getStorage({
      key: 'token',
      success: token => {
        this.setData({
          isLogin: true
        })
      }
    })
  },
  routeLogin () {
    wx.navigateTo({
      url: '../login/login'
    })
  }
})
