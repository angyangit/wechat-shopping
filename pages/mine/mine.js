// pages/mine/mine.js
import { getToken } from '../../utils/catch'
import { recommendList, getMemberInfo } from '../../utils/api'
import { cache } from '../../config'
Page({
  /**
   * 页面的初始数据
   */
  data: {
    validSucc: false,
    error: false,
    multipleShow: true,
    recommendList: [],
    opacity: 1,
    memberInfo: null,
  },

  onLoad: function (options) {
    console.log('mine onLoad')
    this.getRecommendList()
  },

  onShow: function () {
    console.log('mine onShow')
    if (typeof this.getTabBar === 'function' && this.getTabBar()) {
      this.getTabBar().setData({
        selected: 3,
      })
    }
    const token = getApp().globalData.token
    if (token) {
      this._getMemberInfo()
    }
  },
  scroll(e) {
    const scrollTop = e.detail.scrollTop
    if (scrollTop > 110) {
      return
    } else if (scrollTop < 20) {
      this.setData({
        opacity: 1,
      })
    } else {
      const opc = 1 - Math.min(scrollTop / 100, 1)
      this.setData({
        opacity: opc,
      })
    }
  },
  login() {
    const token = getToken()
    console.log('token', token)
    if (!token) {
      wx.navigateTo({
        url: '/pages/login/index',
      })
      return
    }
  },
  _getMemberInfo() {
    getMemberInfo().then((res) => {
      wx.setStorageSync({
        key: cache.MEMBER_INFO,
        data: res,
      })
      this.setData({
        memberInfo: res,
      })
    })
  },
  getRecommendList() {
    wx.showLoading({
      title: '正在加载',
      mask: true,
    })
    const params = {
      pageSize: 20,
      pageNum: 1,
    }
    recommendList(params)
      .then((res) => {
        this.setData({
          recommendList: res,
        })
        wx.hideLoading()
      })
      .catch((res) => {
        wx.hideLoading()
      })
  },
})
