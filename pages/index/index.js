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
    polyline: []
  },
  onReady () {
    this.mapCtx = wx.createMapContext('myMap')
    // wx.getLocation({
    //   type: 'gcj02',
    //   altitude: true,
    //   success: res => {
    //     this.setData({ latitude: res.latitude})
    //     this.setData({ longitude: res.longitude})
    //   },
    // })
    this.setData({ "longitude": 116.2965745074327 })
    this.setData({ "latitude": 40.10560022710834 })
  },
  markertap(e) {
    let marker = this.data.markers.find(item => {
      return item.id = e.markerId
    })
    this.setData({
      polyline: {
        points: [{
          latitude: this.data.latitude,
          longitude: this.data.longitude
        }, {
            latitude: marker.latitude,
            longitude: marker.longitude
        }]
      }
    })
  },
  bindregionchange () {
    this.mapCtx.getCenterLocation({
      success: location => {
        if (location.longitude !== this.data.longitude && location.latitude !== this.data.latitude) {
          this.setData({ "longitude": location.longitude })
          this.setData({ "latitude": location.latitude })
        }
        
        Ajax.post({
          url: '/shop/shop_list_chead',
          data: {
            longitude: location.longitude,
            latitude: location.latitude
          }
        }).then(({ data }) => {
          if (data.info === '') {
            wx.showToast({
              title: '附近没有商家',
              icon: 'none'
            })
            return false
          }
          var markers = data.info.map(item => {
            let shopMinRate = item.shopMinRate.toString().split('.')
            return {
              id: item.id,
              longitude: item.shopLongitude,
              latitude: item.shopLatitude
            }
          })
          this.setData({markers: markers})
        }).catch(err => {
          console.log(err)
        })
      }
    })
  }
})
