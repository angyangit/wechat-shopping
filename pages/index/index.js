import { homeInfo, brandList, recommendList } from '../../utils/api'
import { cateList } from '../../config'
import * as watch from '../../utils/watch'
// bigPic: "http://macro-oss.oss-cn-shenzhen.aliyuncs.com/mall/images/20180518/5afd7778Nf7800b75.jpg"
// factoryStatus: 1
// firstLetter: "M"
// id: 6
// logo: "http://macro-oss.oss-cn-shenzhen.aliyuncs.com/mall/images/20180518/5a912944N474afb7a.png"
// name: "小米"
// productCommentCount: 100
// productCount: 100
// showStatus: 1
// sort: 500
Page({
  data: {
    bannerList: [],
    cateList: cateList,
    brandList: [],
    homeLoading: true,
    brandLoading: true,
    recommendLoading: true,
    goodsList: [],
    recommendPageSize: 10,
    recommendPageNum: 1,
  },
  onLoad() {
    watch.setWatcher(this)
    this.refreshData(true)
  },
  onShow() {
    if (typeof this.getTabBar === 'function' && this.getTabBar()) {
      this.getTabBar().setData({
        selected: 0,
      })
    }
  },
  watch: {
    homeLoading: function (newVal, oldVal) {
      this.hideLoading(
        newVal,
        this.data.brandLoading,
        this.data.recommendLoading
      )
    },
    brandLoading: function (newVal, oldVal) {
      this.hideLoading(
        this.data.homeLoading,
        newVal,
        this.data.recommendLoading
      )
    },
    recommendLoading: function (newVal, oldVal) {
      this.hideLoading(this.data.homeLoading, this.data.brandLoading, newVal)
    },
  },
  hideLoading(homeLoading, brandLoading, recommendLoading) {
    if (
      brandLoading === false &&
      homeLoading === false &&
      recommendLoading === false
    ) {
      wx.hideLoading()
      this.refreshFinish()
    }
  },
  refresh() {
    this.setData({
      recommendPageNum: 1,
    })
    this.refreshData(false)
  },
  loadMore() {
    this.setData({
      recommendPageNum: this.data.recommendPageNum + 1,
    })
    this.getRecommendList()
  },
  refreshFinish() {
    this.listview = this.selectComponent('#listview')
    this.listview.refreshFinish()
  },
  loadingFinish() {
    this.listview = this.selectComponent('#listview')
    this.listview.loadingMoreFinish()
  },
  refreshData(init) {
    if (init) {
      wx.showLoading({
        title: '加载中',
        mask: true,
      })
    }
    this.setData({
      homeLoading: true,
      brandLoading: true,
      recommendLoading: true,
    })
    this.getHomeData()
    this.getBrandList()
    this.getRecommendList()
  },

  getHomeData(isFrefresh = false) {
    homeInfo()
      .then((res) => {
        this.setData({
          homeLoading: false,
          bannerList: res.advertiseList,
        })
      })
      .catch((err) => {
        this.setData({
          homeLoading: false,
        })
      })
  },
  getBrandList() {
    brandList({ pageNum: 1, pageSize: 20 })
      .then((res) => {
        this.setData({
          brandLoading: false,
          brandList: res,
        })
      })
      .catch((err) => {
        this.setData({
          brandLoading: false,
        })
      })
  },
  getRecommendList() {
    const params = {
      pageSize: this.data.recommendPageSize,
      pageNum: this.data.recommendPageNum,
    }
    recommendList(params)
      .then((res) => {
        if (res.length < this.data.recommendPageSize) {
          this.loadingFinish()
        }
        this.setData({
          recommendLoading: false,
          goodsList:
            this.data.recommendPageNum == 1
              ? res
              : this.data.goodsList.concat(res),
        })
      })
      .catch((res) => {
        this.setData({
          recommendLoading: false,
        })
      })
  },

  brandSearch(event) {
    const brandId = event.currentTarget.dataset['id']
    const brandName = event.currentTarget.dataset['name']
    wx.navigateTo({
      url: `/pages/search/index?brandId=${brandId}&brandName=${brandName}`,
    })
  },
})
