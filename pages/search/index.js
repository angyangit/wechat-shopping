import { productSearch } from '../../utils/api'
import { debounce } from '../../utils/util'
// albumPics: ""
// brandId: 6
// brandName: "小米"
// deleteStatus: 0
// detailTitle: ""
// feightTemplateId: 0
// giftGrowth: 649
// giftPoint: 649
// id: 28
// keywords: ""
// lowStock: 0
// name: "小米 红米5A 全网通版 3GB+32GB 香槟金 移动联通电信4G手机 双卡双待"
// newStatus: 1
// note: ""
// originalPrice: 649
// pic: "http://macro-oss.oss-cn-shenzhen.aliyuncs.com/mall/images/20180615/5a9d248cN071f4959.jpg"
// previewStatus: 0
// price: 649
// productAttributeCategoryId: 3
// productCategoryId: 19
// productCategoryName: "手机数码"
// productSn: "7437789"
// promotionPerLimit: 0
// promotionType: 4
// publishStatus: 1
// recommandStatus: 1
// sale: 0
// serviceIds: ""
// sort: 0
// stock: 100
// subTitle: "8天超长待机，137g轻巧机身，高通骁龙处理器小米6X低至1299，点击抢购"
// unit: ""
// usePointLimit: 0
// verifyStatus: 0
// weight: 0
Page({
  /**
   * 页面的初始数据
   */
  data: {
    pageNum: 1,
    pageSize: 10,
    keyword: '',
    goodsList: [],
    totalPage: 0,
    isloading: false,
    multipleShow: true,
    tags: [
      {
        key: '最近搜索',
        value: [],
      },
      {
        key: '热门搜索',
        value: ['手机', '男装', '干果', '华为', '笔记本电脑', '水果', '饼干'],
      },
      'aa',
    ],
    brandId: 0,
  },
  onLoad: function (options) {
    console.log(options)
    const brandName = options.brandName
    const brandId = options.brandId
    if (brandId > 0) {
      this.setData({
        brandId: brandId,
      })
      this._productSearch()
    } else {
      this.handlerNearKeyUi()
    }
  },
  onShow: function () {},
  toggleListUi() {
    this.setData({
      multipleShow: !this.data.multipleShow,
    })
  },
  onInputChange(e) {
    const inputValue = e.detail

    this.setData({
      keyword: inputValue,
    })
    this._productSearch()
  },
  tagClick(e) {
    this.setData({
      keyword: e.detail,
    })
    this._productSearch()
    console.log('tagClick', e.detail)
  },
  clearInput() {
    this.setData({
      keyword: '',
    })
  },
  _productSearch() {
    wx.showLoading({
      title: '正在加载...',
      mask: true,
    })
    this.setData({
      goodsList: [],
      totalPage: 0,
      isloading: true,
    })
    this.handlerKeyLocal(this.data.keyword)
    const productSearchOption = {
      pageNum: this.data.pageNum,
      pageSize: this.data.pageSize,
      keyword: this.data.keyword,
    }
    if (this.data.brandId > 0) {
      productSearchOption['brandId'] = this.data.brandId
    }
    productSearch(productSearchOption)
      .then((res) => {
        this.setData({
          goodsList: res.list,
          totalPage: res.totalPage,
          isloading: false,
        })
        wx.hideLoading()
      })
      .catch((err) => {
        this.setData({
          goodsList: [],
          totalPage: 0,
          isloading: false,
        })
        wx.hideLoading()
      })
  },
  handlerKeyLocal(keyword) {
    if (!keyword) {
      return
    }
    let words = this.getHistory()
    const has = words.includes(keyword)
    // 队列 栈
    if (!has) {
      // 数组末尾 删除 ， keyword 数组第一位
      const length = words.length
      if (length >= 10) {
        words.pop()
      }
      words.unshift(keyword)
    } else {
      const index = words.findIndex((item) => {
        return item === keyword
      })
      words.splice(index, 1)
      words.unshift(keyword)
    }
    wx.setStorageSync('nearSearch', words)
    this.handlerNearKeyUi()
  },
  getHistory() {
    const words = wx.getStorageSync('nearSearch')
    if (!words) {
      return []
    }
    return words
  },
  handlerNearKeyUi() {
    const nearSearchKey = wx.getStorageSync('nearSearch')
    if (nearSearchKey && nearSearchKey.length > 0) {
      this.data.tags[0].value = nearSearchKey
      this.setData({
        tags: this.data.tags,
      })
    }
  },
})
