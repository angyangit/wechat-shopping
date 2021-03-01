// components/toolbar/index.js
import { constants } from '../../config'
const app = getApp()
Component({
  /**
   * 组件的属性列表
   */
  options: {
    addGlobalClass: true,
  },
  properties: {
    title: {
      type: String,
      value: '',
    },
    hasBack: {
      type: Boolean,
      value: true,
    },
    opacity: {
      type: Number,
      value: 1,
    },
  },

  /**
   * 组件的初始数据
   */
  data: {
    navBarHeight: app.globalData.navBarHeight, //导航栏高度
    menuRight: app.globalData.menuRight, // 胶囊距右方间距（方保持左、右间距一致）
    menuBotton: app.globalData.menuBotton,
    menuHeight: app.globalData.menuHeight,
    statusbarHeight: app.globalData.statusBarHeight,
  },

  lifetimes: {
    // attached() {
    //     this._handlerStyle()
    // }
  },

  /**
   * 组件的方法列表
   */
  methods: {
    // _handlerStyle() {
    // const info = wx.getSystemInfoSync();
    // let navBarHeight = 0
    // let left = info.windowWidth
    // const menuButtonInfo = wx.getMenuButtonBoundingClientRect();
    // // (胶囊底部高度 - 状态栏的高度) + (胶囊顶部高度 - 状态栏内的高度) = 导航栏的高度
    // navBarHeight = (menuButtonInfo.bottom - info.statusBarHeight) + (menuButtonInfo.top - info.statusBarHeight);
    // left = menuButtonInfo.left;
    // try {
    //     wx.setStorageSync(constants.STATUSBAR_HEIGHT, info.statusBarHeight ? info.statusBarHeight : 0);
    //     wx.setStorageSync(constants.WINDOW_WIDTH, info.windowWidth ? info.windowWidth : 0);
    //     wx.setStorageSync(constants.TOOLBAR_HEIGHT, navBarHeight);
    //     wx.setStorageSync(constants.MENUBUTTON_LEFT, left);
    // } catch (e) {
    // }
    //     this.setData({
    //
    //     })
    // }
  },
})
