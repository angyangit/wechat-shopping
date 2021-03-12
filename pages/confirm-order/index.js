import { generateConfirmOrder } from '../../utils/api'
Page({
  /**
   * 页面的初始数据
   */
  data: {
    memberReceiveAddressList: [],
    cartPromotionItemList: [],
    calcAmount: null,
    addressFiexd: false,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const cardIds = options.cartIds
    wx.showLoading()
    generateConfirmOrder(cardIds).then(
      (res) => {
        console.log(res)
        wx.hideLoading()
        this.setData({
          memberReceiveAddressList: res.memberReceiveAddressList,
          cartPromotionItemList: res.cartPromotionItemList,
        })
      },
      (err) => {
        wx.hideLoading()
      }
    )
  },
  leftClick() {
    this.$router.back()
  },
  countChange() {},
  scrollListener(pos) {
    console.log(pos)
    const y = pos.y
    if (y < -40) {
      this.addressFiexd = true
    } else {
      this.addressFiexd = false
    }
  },
  toAddressList() {
    wx.navigateTo({
      url: '/pages/address-list/index',
    })
  },
})
