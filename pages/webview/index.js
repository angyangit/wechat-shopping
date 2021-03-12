// pages/webview/index.js
Page({
  /**
   * 页面的初始数据
   */
  data: {
    url: '', // 页面中需要的数据
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(JSON.stringify(options))
    console.log(options.url + '  44  ' + options.navTip)
    this.setData({
      url: options.url, // 从跳转页面中传过来的url在options中可以拿到
    })
    wx.setNavigationBarTitle({
      title: options.navTip,
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {},

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {},
})
