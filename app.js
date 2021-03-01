// app.js
App({
    onLaunch() {
        // 展示本地存储能力
        this.setNavBarInfo()

        // wx.setStorageSync('logs', logs)

        // 登录
        wx.login({
            success: res => {
                // 发送 res.code 到后台换取 openId, sessionKey, unionId
            }
        })
        // 获取用户信息
        wx.getSetting({
            success: res => {
                if (res.authSetting['scope.userInfo']) {
                    // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
                    wx.getUserInfo({
                        success: res => {
                            // 可以将 res 发送给后台解码出 unionId
                            this.globalData.userInfo = res.userInfo

                            // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
                            // 所以此处加入 callback 以防止这种情况
                            if (this.userInfoReadyCallback) {
                                this.userInfoReadyCallback(res)
                            }
                        }
                    })
                }
            }
        })
    },
    globalData: {
        navBarHeight: 0, // 导航栏高度
        menuBotton: 0, // 胶囊距底部间距（保持底部间距一致）
        menuRight: 0, // 胶囊距右方间距（方保持左、右间距一致）
        menuHeight: 0, // 胶囊高度（自定义内容可与胶囊高度保证一致）
        statusBarHeight:0,
        userInfo: null,
        token:''
    },
    /**
     * @description 设置导航栏信息
     */
    setNavBarInfo() {
        // 获取系统信息
        const systemInfo = wx.getSystemInfoSync();
        // 胶囊按钮位置信息
        const menuButtonInfo = wx.getMenuButtonBoundingClientRect();
        // 导航栏高度 = 状态栏到胶囊的间距（胶囊距上距离-状态栏高度） * 2 + 胶囊高度 + 状态栏高度
        this.globalData.navBarHeight = (menuButtonInfo.bottom - systemInfo.statusBarHeight) + (menuButtonInfo.top - systemInfo.statusBarHeight);

        this.globalData.menuBotton = menuButtonInfo.top - systemInfo.statusBarHeight;
        this.globalData.menuRight = systemInfo.screenWidth - menuButtonInfo.right;
        this.globalData.menuHeight = menuButtonInfo.height;
        this.globalData.statusBarHeight=systemInfo.statusBarHeight;
        console.log(systemInfo.statusBarHeight)
    }
})
