// components/listview/index.js
Component({
  options: {
    multipleSlots: true,
  },
  /**
   * 组件的属性列表
   */
  properties: {
    
  },

  /**
   * 组件的初始数据
   */
  data: {
    triggered: false,
    scanPercent: 0,
    refreshTip: '下拉刷新',
    startRefresh: false,
    loadMoreFinish: false,
  },

  /**
   * 组件的方法列表
   */
  methods: {
    onPulling: function () {
      console.log('onPulling--')

      // this.setData({
      //   isRefreshLoading: true,
      // })
    },
    onRefresh() {
      console.log('onRefresh--')
      this.setData({
        startRefresh: true,
        triggered: true,
        loadMoreFinish: false,
      })
      this.triggerEvent('refresh')
    },

    onPulling: function (evt) {
      var p = Math.min(evt.detail.dy / 80, 1)
      let upTitle = '下拉刷新'
      if (p > 0.9) {
        upTitle = '释放加载'
      }
      this.setData({
        scanPercent: p,
        refreshTip: upTitle,
      })
    },
    lower: function (e) {
     !this.data.loadMoreFinish&& this.triggerEvent('loadMore')
    },
    refreshFinish() {
      this.setData({
        startRefresh: false,
        triggered: false,
        refreshTip: '下拉刷新',
        scanPercent: 0,
      })
    },
    loadingMoreFinish() {
      this.setData({
        loadMoreFinish: true,
      })
    },
  },
})
