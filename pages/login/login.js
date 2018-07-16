const Ajax = require('../../utils/ajax.js')
Page({
  data: {
    type: 'password',
    codeText: '发送验证码'
  },
  formsend(e) {
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