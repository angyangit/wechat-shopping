import { productDetail, productSearch, addShopCar } from '../../utils/api'
const app = getApp()
import { cache } from '../../config'
Page({
  data: {
    indicatorDots: true,
    vertical: false,
    autoplay: false,
    interval: 2000,
    duration: 500,
    isShowPop: false,
    tabIndex: 'productWrapper',
    proImgList: [],
    proInfo: null,
    isShowDisPop: false,
    isShowSkuPop: false,
    recommendList: [],
    recomendPageIndex: 0,
    originSkuStockList: [],
    skuStockList: [],
    skuStockListUi: [],
    selectSkuArr: [],
    selectSkuBean: undefined,
    buyCount: 1,
    navBarHeight: app.globalData.navBarHeight, //导航栏高度
    menuRight: app.globalData.menuRight, // 胶囊距右方间距（方保持左、右间距一致）
    menuBotton: app.globalData.menuBotton,
    menuHeight: app.globalData.menuHeight,
    statusbarHeight: app.globalData.statusBarHeight,
  },
  onLoad: function (options) {
    // if (options.id <= 0) {
    //   wx.navigateBack({
    //     delta: 1,
    //   })
    // }
    // if (options.cateId>0) {

    // }
    // this.getProductDetail(26)
    // this.productSearchWithCateid(19)

    //   productDetail(26).then((res) => {
    //   console.log(res)
    //   this.handlerRes(res)
    //   this.handlerSkuList(res)
    // })

    const productSearchOption = {
      pageNum: 1,
      pageSize: 32,
      productCategoryId: options.cateId,
    }
    // productSearch(productSearchOption).then((res) => {
    //   this.getRecommendList(res.list)
    // })
    wx.showLoading()
    const productDetailR = productDetail(options.id)
    const productSearchR = productSearch(productSearchOption)
    Promise.all([productDetailR, productSearchR]).then(
      (res) => {
        console.log(res)
        this.handlerRes(res[0])
        this.handlerSkuList(res[0])
        this.getRecommendList(res[1].list)
        wx.hideLoading()
      },
      (err) => {
        wx.hideLoading()
      }
    )
  },
  tabClick(e) {
    this.setData({
      tabIndex: e.target.dataset.idx,
    })
  },
  toBuy() {
    this.setData({ isShowSkuPop: true })
  },
  hideSkuPop() {
    this.setData({ isShowSkuPop: false })
  },
  back() {
    wx.navigateBack({
      delta: 1,
    })
  },
  addShopCar() {
    const memberInfo = wx.getStorageSync(cache.MEMBER_INFO)
    const selectSkuBean = this.data.selectSkuBean
    const proInfo = this.data.proInfo
    console.log('proInfo', this.data.proInfo)
    console.log('selectSkuBean', this.data.selectSkuBean)
    console.log('memberInfo', memberInfo)

    if (this.buyCount <= 0) {
      wx.showToast({
        title: '选择商品',
        icon: '',
      })
      return
    }
    if (!memberInfo) {
      wx.navigateTo({
        url: '/pages/login/index',
      })
      return
    }
    const omsCartItem = {
      productId: selectSkuBean.productId,
      productSkuId: selectSkuBean.id,
      memberId: memberInfo.id,
      quantity: this.data.buyCount,
      price: selectSkuBean.price,
      productPic: proInfo.pic,
      productName: proInfo.name,
      productSubTitle: proInfo.subTitle,
      productSkuCode: selectSkuBean.skuCode,
      memberNickname: memberInfo.nickname,
      productCategoryId: proInfo.productCategoryId,
      productBrand: proInfo.brandName,
      productAttr: selectSkuBean.spData,
    }
    addShopCar(omsCartItem).then((res) => {
      this.hideSkuPop()
    })
  },
  countChange(e) {
    this.data.buyCount = e.detail.count
  },
  getProductDetail(id) {
    productDetail(id).then((res) => {
      console.log(res)
      this.handlerRes(res)
      this.handlerSkuList(res)
    })
  },
  handlerRes(res) {
    if (res.product.pic) {
      this.data.proImgList.push(res.product.pic)
    }
    if (res.product && res.product.albumPics) {
      this.data.proImgList = this.data.proImgList.concat(
        res.product.albumPics.split(',')
      )
    }
    this.setData({
      proInfo: res.product,
      proImgList: this.data.proImgList,
    })
  },
  handlerSkuList(res) {
    const skuStockList = res.skuStockList
    this.data.originSkuStockList = skuStockList
    let skuStockListOnce = []
    skuStockList.forEach((item, index) => {
      const spData = item.spData
      const spDataJson = JSON.parse(spData)
      if (index === 0) {
        this.data.selectSkuBean = item
        spDataJson.forEach((item) => {
          this.data.selectSkuArr.push(item)
        })
      }
      skuStockListOnce = skuStockListOnce.concat(spDataJson)
    })
    this.data.skuStockList = skuStockListOnce
    const arr = {}
    const keyArr = []
    this.data.skuStockList.forEach((item) => {
      const key = item.key
      const val = item.value
      const hasKey = keyArr.findIndex((item) => {
        return item === key
      })
      if (hasKey === -1) {
        keyArr.push(key)
        arr[key] = []
      } else {
        if (
          arr[key].findIndex((item) => {
            return item === val
          }) === -1
        ) {
          arr[key].push(val)
        }
      }
    })
    this.setData({
      skuStockListUi: arr,
      selectSkuArr: this.data.selectSkuArr,
      selectSkuBean: this.data.selectSkuBean,
    })
    console.log('selectSkuArr11-', this.data.selectSkuArr)
  },
  selectSku(e) {
    let skuVal = e.currentTarget.dataset['skuval']
    let val = e.currentTarget.dataset['val']
    let keyVal = e.currentTarget.dataset['keyval']
    console.log('sel---', keyVal, val, skuVal)
    const bolVal = this.data.selectSkuArr.findIndex((item) => {
      return item.value === skuVal
    })
    if (bolVal !== -1) {
      return
    }
    let oldSelIndex = -1
    this.data.selectSkuArr.forEach((item, index) => {
      val.forEach((valItem) => {
        if (item.value === valItem) oldSelIndex = index
      })
    })
    this.data.selectSkuArr.splice(oldSelIndex, 1)
    const mySku = {
      key: keyVal,
      value: skuVal,
    }
    this.data.selectSkuArr.push(mySku)

    let selIndx = -1
    this.data.originSkuStockList.forEach((item, index) => {
      const spData = item.spData
      const spDataJson = JSON.parse(spData)
      let match = 0
      spDataJson.forEach((sku) => {
        this.data.selectSkuArr.forEach((selSku) => {
          if (sku.value == selSku.value) match++
        })
      })
      if (match === this.data.selectSkuArr.length) {
        selIndx = index
        return
      }
    })
    this.setData({
      selectSkuBean: this.data.originSkuStockList[selIndx],
      selectSkuArr: this.data.selectSkuArr,
    })
    console.log('selectSkuBean--', this.data.selectSkuBean)
  },
  productSearchWithCateid(productCategoryId) {
    if (productCategoryId <= 0) return
    const productSearchOption = {
      pageNum: 1,
      pageSize: 32,
      productCategoryId: productCategoryId,
    }
    productSearch(productSearchOption).then((res) => {
      this.getRecommendList(res.list)
    })
  },
  getRecommendList(list) {
    const length = Math.ceil(list.length / 6)
    let arr = []
    for (let i = 0; i < length; i++) {
      arr.push(list.slice(i * 6, i * 6 + 6))
    }
    this.setData({
      recommendList: arr,
    })
  },
})
