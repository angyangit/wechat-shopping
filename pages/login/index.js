import { login, getMemberInfo } from '../../utils/api'
import { json2Form } from '../../utils/util'
const appInst = getApp()
import { setToken } from '../../utils/catch'
import { cache } from '../../config'

Page({
  /**
   * 页面的初始数据
   */
  data: {
    name: '',
    pwd: '',
    error: '',
    validSucc: false,
  },

  onLoad: function (options) {},

  onShow: function () {
    console.log('login back', appInst)
  },
  login() {
    if (!this.data.validSucc) return
    login(
      json2Form({
        username: this.data.name,
        password: this.data.pwd,
      })
    ).then(
      (res) => {
        const tokenStr = res.tokenHead + res.token
        appInst.globalData.token = tokenStr
        setToken(tokenStr)
        console.log('getApp().globalData.token', getApp().globalData.token)
        wx.navigateBack({
          delta: 1,
        })
      },
      (err) => {
        console.log('err', err)
        this.setData({
          error: err.message,
        })
      }
    )
    this._getMemberInfo()
  },
  _getMemberInfo() {
    getMemberInfo().then((res) => {
      wx.setStorageSync(cache.MEMBER_INFO, res)
      console.log(res)
    })
  },
  backListener() {
    wx.navigateBack({
      delta: 1,
    })
  },
  nameIpt(e) {
    const name = e.detail.value
    this.setData({
      name: name,
    })
    const pwd = this.data.pwd
    this.valid(name, pwd)
  },
  pwdIpt(e) {
    const pwd = e.detail.value
    this.setData({
      pwd: pwd,
    })
    const name = this.data.name
    this.valid(name, pwd)
  },
  valid(name, pwd) {
    if (name.length > 2 && pwd.length > 5) {
      this.setData({
        validSucc: true,
        error: '',
      })
    } else {
      this.setData({
        validSucc: false,
      })
    }
  },
})
