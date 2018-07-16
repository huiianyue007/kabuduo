const Ajax = require('../../utils/ajax.js')
Page({
  data: {
    type: 'password',
    codeText: '发送验证码',
    sendFlag: true,
    time: 60,
  },
  formsend(e) {
    if (!this.data.sendFlag) return false
    Ajax.post('/user/verify_code', {
      mobile: e.detail.value.mobile,
      isUser: '0'
    }).then(res => {
      wx.showToast({
        title: '验证码发送成功',
        icon: 'none'
      })
      this.setData({sendFlag: false})
      let Time = 60
      let interval = setInterval(() => {
        console.log(Time)
        this.setData({codeText:  `${Time --}s`})
      }, 1000)
      setTimeout(() => {
        clearInterval(interval)
        this.setData({sendFlag: true})
        this.setData({ codeText: `重新发送验证码` })
      }, 60000)
    }).catch(err => {
      wx.showToast({
        title: err.data.info || '验证码发送失败',
        icon: 'none'
      })
    })
  },
  bindblur (e) {
    console.log(e.detail.value)
  },
  formSubmit (e) {
    console.log(e.detail.value)
    // Ajax.post('/login/login_in', Object.assign(e.detail.value, {
    //   isUser: '0'
    // })).then(({ data }) => {
    //   wx.setStorage({
    //     key: 'token',
    //     data: data.token,
    //     success: () => {
    //       wx.showToast({
    //         title: '登录成功',
    //         complete: () => {
    //           wx.navigateBack()
    //         }
    //       })
          
    //     }
    //   })
    // }).catch(err => {
    //   wx.showToast({
    //     title: err.data.info,
    //     icon: 'none'
    //   })
    // })
  }
})