// pages/adress-map/index.js
var QQMapWX = require('../../sdk/qqmap-wx-jssdk')
var qqmapsdk
Page({
  /**
   * 页面的初始数据
   */
  data: {
    myLatitude: 0.0,
    myLongitude: 0.0,
    addressList: [],
    markers: null,
    iptFocus: false,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    // 实例化API核心类
    qqmapsdk = new QQMapWX({
      key: 'GPEBZ-JR2CI-NL5G2-5SS2B-KKHJO-NWFHX',
    })
    wx.getLocation({
      type: 'gcj02',
      success: function (res) {
        console.log(res)
        that.setData({
          myLatitude: res.latitude,
          myLongitude: res.longitude,
        })
      },
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    this.getLngLat()
  },
  inputChange(e) {
    const ipt = e.detail.value
    if (!ipt) {
      this.getLngLat()
    }
    this.setData({
      addressList: [],
    })
    if (this.timeout) clearTimeout(this.timeout)
    this.timeout = setTimeout(() => {
      console.log(ipt)
      this.nearby_search(ipt)
    }, 600)
  },
  bindfocus() {
    this.setData({
      iptFocus: true,
    })
  },
  //获取中间点的经纬度，并mark出来
  getLngLat: function () {
    var that = this
    this.mapCtx = wx.createMapContext('map')
    this.mapCtx.getCenterLocation({
      success: function (res) {
        that.setData({
          markers: [
            {
              id: 0,
              iconPath: '../../resources/images/map_landmark.png',
              longitude: res.longitude,
              latitude: res.latitude,
              width: 40,
              height: 40,
            },
          ],
        })
        that.getPoiList(res.longitude, res.latitude)
      },
    })
  },
  getPoiList: function (longitude, latitude) {
    var that = this
    // 调用接口
    qqmapsdk.reverseGeocoder({
      location: {
        latitude: latitude,
        longitude: longitude,
      },
      get_poi: 1,
      poi_options: 'policy=2;radius=3000;page_size=20;page_index=1',
      success: function (res) {
        that.setData({
          addressList: res.result.pois,
        })
      },
      fail: function (res) {},
      complete: function (res) {},
    })
  },

  regionchange(e) {
    // 地图发生变化的时候，获取中间点，也就是用户选择的位置toFixed
    if (
      e.type == 'end' &&
      (e.causedBy == 'scale' || e.causedBy == 'drag' || e.causedBy == 'update')
    ) {
      this.getLngLat()
    }
  },
  //定位到自己的位置事件
  toMyLocation: function (e) {
    var that = this
    wx.getLocation({
      type: 'gcj02',
      success: function (res) {
        that.setData({
          myLatitude: res.latitude,
          myLongitude: res.longitude,
        })
      },
    })
    this.movetoPosition()
  },
  movetoPosition: function () {
    this.mapCtx.moveToLocation()
  },

  // 事件触发，调用接口
  nearby_search: function (key) {
    var _this = this

    // 调用接口
    qqmapsdk.search({
      keyword: key, //搜索关键词
      location: `${_this.data.myLatitude},${_this.data.myLongitude}`, //设置周边搜索中心点
      success: function (res) {
        //搜索成功后的回调
        var mks = []
        for (var i = 0; i < res.data.length; i++) {
          mks.push({
            // 获取返回结果，放到mks数组中
            title: res.data[i].title,
            id: res.data[i].id,
            latitude: res.data[i].location.lat,
            longitude: res.data[i].location.lng,
            iconPath: '../../resources/images/map_landmark.png', //图标路径
            width: 20,
            height: 20,
          })
        }
        _this.setData({
          //设置markers属性，将搜索结果显示在地图中
          markers: mks,
          addressList: res.data,
        })
      },
      fail: function (res) {
        console.log(res)
      },
      complete: function (res) {
        console.log(res)
      },
    })
  },

  clickItem: function (e) {
    //     ad_info:
    // adcode: "310101"
    // city: "上海市"
    // district: "黄浦区"
    // province: "上海市"
    let pages = getCurrentPages()
    let prevPage = pages[pages.length - 2]
    console.log('clickItem--')
    const itemAddress = e.currentTarget.dataset.item
    prevPage.setData({
      detailAddress: itemAddress.address,
      province: itemAddress.ad_info.province,
      city: itemAddress.ad_info.city,
      region: itemAddress.ad_info.district,
      ssq:
        itemAddress.ad_info.province +
        itemAddress.ad_info.city +
        itemAddress.ad_info.district,
    })
    wx.navigateBack({
      delta: 1,
    })
    console.log(pages)
  },
  touchMove(e) {
    console.log('touchMove')
  },
})
