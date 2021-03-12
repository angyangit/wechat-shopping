import {
  addressAdd,
  addressUpdate,
  addressList,
  addressDetail,
  addressDelete,
} from '../../utils/api'

Page({
  /**
   * 页面的初始数据
   */
  data: {
    addressList: [],
  },
  onShow() {
    addressList().then((res) => {
      console.log('addressList', res)
      this.setData({
        addressList: res,
      })
    })
  },

  toEdit(event) {
    // JSON.stringify(对象)
    wx.navigateTo({
      url:
        '/pages/address-edit/index?item=' +
        JSON.stringify(event.currentTarget.dataset.item),
    })
  },
  addAddress() {
    wx.navigateTo({
      url: '/pages/address-edit/index',
    })
  },
})
