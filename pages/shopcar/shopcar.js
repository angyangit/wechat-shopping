import {
  getCartList,
  deleteCartItems,
  shopCarUpdateQuantity,
} from '../../utils/api'
import { getToken } from '../../utils/catch'
Page({
  /**
   * 页面的初始数据
   */
  data: {
    shopcarList: [],
    selectList: [],
    isRequest: false,
    isEditProduct: false,
    hasToken: getToken(),
    isLoad: false,
  },
  onLoad: function (options) {},

  onShow: function () {
    if (typeof this.getTabBar === 'function' && this.getTabBar()) {
      this.getTabBar().setData({
        selected: 2,
      })
    }
    if (getToken() && this.data.shopcarList.length === 0) {
      this.setData({
        hasToken: getToken(),
      })
      this._getCartList()
    }
  },
  toLogin() {
    wx.navigateTo({
      url: '/pages/login/index',
    })
  },
  countChange(e) {
    const count = e.detail.count
    const index = e.detail.index
    shopCarUpdateQuantity({
      id: this.data.shopcarList[index].id,
      quantity: count,
    }).then(
      (res) => {
        wx.showToast({
          title: '操作成功',
        })
        const id = this.data.shopcarList[index].id
        if (this.data.selectList.length > 0) {
          this.data.selectList.forEach((item) => {
            if (id === item.id) {
              item.quantity = count
            }
          })
        }
        this.setData({
          shopcarList: this.data.shopcarList,
          selectList: this.data.selectList,
        })
      },
      (err) => {
        const mess = err.message
        wx.showToast({
          title: '操作失败',
        })
      }
    )
  },
  deleteItem(e) {
    let id = e.currentTarget.dataset['id']
    let ids = []
    ids.push(id)
    deleteCartItems({ ids }).then((res) => {
      this._getCartList()
      wx.showToast({
        title: '删除成功',
        icon: 'success',
      })
    })
  },
  delItemList() {
    if (this.data.selectList.length === 0) {
      wx.showToast({
        title: '请选择商品',
        icon: 'none',
      })
      return
    }
    let ids = this.data.selectList.map((item) => {
      return item.id
    })
    deleteCartItems(ids).then((res) => {
      console.log(res)
      this.setData({
        selectList: [],
      })
      this._getCartList()
    })
  },
  itemSelect(e) {
    let itemSel = e.currentTarget.dataset['item']
    const index = this.data.selectList.findIndex((item) => {
      return item.id === itemSel.id
    })
    if (index === -1) {
      this.data.selectList.push(itemSel)
    } else {
      this.data.selectList.splice(index, 1)
    }
    this.setData({
      selectList: this.data.selectList,
    })
  },
  selectAll() {
    console.log(this.data.selectList.length, this.data.shopcarList.length)
    let selArr = []
    if (this.data.selectList.length !== this.data.shopcarList.length) {
      this.data.shopcarList.forEach((item) => {
        selArr.push(item)
      })
    }
    this.setData({
      selectList: selArr,
    })
  },
  editPro() {
    this.setData({ isEditProduct: !this.data.isEditProduct })
  },
  confirmOrder() {
    if (this.data.selectList.length === 0) {
      wx.showToast({
        title: '请选择需要支付商品',
        icon: 'none',
      })
      return
    }
  },
  _getCartList() {
    this.setData({ isLoad: true })
    wx.showLoading()
    this.shopcarList = []
    getCartList().then(
      (res) => {
        console.log('getCartList', res)
        this.setData({
          shopcarList: res,
          isLoad: false,
        })
        wx.hideLoading()
      },
      (err) => {
        wx.hideLoading()
        this.setData({
          isLoad: false,
        })
      }
    )
  },
})
