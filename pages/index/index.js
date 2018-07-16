//index.js
//获取应用实例
const Ajax = require('../../utils/ajax.js')
const app = getApp()

Page({
  data: {
    latitude: 23.099994,
    longitude: 113.324520,
    markers: [],
    icons: [],
    shadowIcon: [],
    swiperFlag: false,
    icons: []
  },
  onLoad () {
    this.mapCtx = wx.createMapContext('myMap')
    // wx.getLocation({
    //   type: 'gcj02',
    //   altitude: true,
    //   success: res => {
    //     this.setData({ latitude: res.latitude})
    //     this.setData({ longitude: res.longitude})
    //   }
    // })
    this.setData({ "longitude": 116.2965745074327 })
    this.setData({ "latitude": 40.10560022710834 })
    this.drawMarker({ 
      "longitude": 116.2965745074327,
      "latitude": 40.10560022710834
    })
  },
  markertap(e) {
    let index = this.data.markers.findIndex(item => {
      return item.id === e.markerId
    })
    let marker = this.data.markers[1]
    this.data.markers[1] = this.data.markers[index]
    this.data.markers[index] = marker
    this.setData({marker: this.data.markers})
  },
  route (url) {
    wx.navigateTo({
      url: '../user/user',
    })
  },
  drawMarker (location) {
    Ajax.get('/shop/shop_list_chead', {
      longitude: location.longitude,
      latitude: location.latitude
    }).then(({ data }) => {
      if (data.info === '') {
        wx.showToast({
          title: '附近没有商家',
          icon: 'none'
        })
        return false
      }
      // let arr = data.info.filter(item => {
      //   let index = this.data.icons.findIndex(it => {
      //     return it.shopMinRate === item.shopMinRate
      //   })
      //   return index == -1
      // })
      // if (arr.length) {
      //   let functionArr = arr.map(item => {
      //     let shopMinRate = item.shopMinRate.toString().split('.')
      //     shopMinRate = shopMinRate[0] + (shopMinRate[1] || '0')

      //     return new Promise(resolve => {
      //       Ajax.downloadFile({
      //         url: `img/shadow/sale_icon_${shopMinRate}@1x.png`
      //       }).then(({ tempFilePath}) => {
      //         item.tempFilePath = tempFilePath
      //         resolve(item)
      //       })
      //     })
      //   })
      //   Promise.all(functionArr).then(res => {
      //     this.data.icons = this.data.icons.concat(res.map(item => {
      //       return {
      //         shopMinRate: item.shopMinRate,
      //         tempFilePath: item.tempFilePath
      //       }
      //     }))
      //     this.setData({icons: this.data.icons})
      //     this.setData({
      //       markers: res.map(item => {
      //         return {
      //           id: item.id,
      //           longitude: item.shopLongitude,
      //           latitude: item.shopLatitude,
      //           iconPath: item.tempFilePath
      //         }
      //       })
      //     })
      //   })
      // } else {
      //   let markers = data.info.map(item => {
      //     let { tempFilePath } = this.data.icons.find(it => {
      //       return it.shopMinRate === item.shopMinRate
      //     })
      //     return {
      //       id: item.id,
      //       longitude: item.shopLongitude,
      //       latitude: item.shopLatitude,
      //       iconPath: tempFilePath
      //     }
      //   })
      //   this.setData({markers: markers})
      //   console.log(this.data.markers)
      // }
      data.info.forEach(item => {
        let marker = this.data.markers.find(it => {
          return it.longitude !== item.longitude && it.latitude !== item.latitude
        })
        if (!marker) {
          let Index = this.data.icons.find(it => {
            return it.shopMinRate === shopMinRate
          })
          if (!Index) {
            let shopMinRate = item.shopMinRate.toString().split('.')
            shopMinRate = shopMinRate[0] + (shopMinRate[1] || '0')
            Ajax.downloadFile({
              url: `img/shadow/sale_icon_${shopMinRate}@1x.png`
            }).then(({ tempFilePath }) => {
              this.data.markers.push({
                id: item.id,
                longitude: item.shopLongitude,
                latitude: item.shopLatitude,
                iconPath: tempFilePath
              })
              this.data.icons.push({
                shopMinRate: shopMinRate,
                icons: tempFilePath
              })
              this.setData({ icons: this.data.icons })
              this.setData({ markers: this.data.markers })
            })
          } else {
            this.data.markers.push({
              id: item.id,
              longitude: item.shopLongitude,
              latitude: item.shopLatitude,
              iconPath: Index.icons
            })
            this.setData({ markers: this.data.markers })
          }
          }
        })
    }).catch(err => {
      console.log(err)
    })
  },
  bindregionchange () {
    this.mapCtx.getCenterLocation({
      success: location => {
        if (location.longitude === this.data.longitude && location.latitude === this.data.latitude) {
          return false
        }
        this.drawMarker(location)
      }
    })
  }
})
