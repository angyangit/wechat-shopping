import { cateList, productSearch } from '../../utils/api'

Page({
  data: {
    cateListNode: [],
    selectMenuIndex: 0,
    productList: [],
    pageNum: 1,
    pageSize: 10,
    productCategoryId: 0,
    totalPage: 0,
    isLoadingPro:false
  },
  onLoad: function () {
    this._cateList()
  },
  onShow: function () {
    if (typeof this.getTabBar === 'function' && this.getTabBar()) {
      this.getTabBar().setData({
        selected: 1,
      })
    }
  },
  menuItem(e) {
    const query = e.currentTarget.dataset['index']
    const node = this.data.cateListNode[query]
    this.setData({
      productCategoryId: node.id,
      selectMenuIndex: query,
    })
    this._productSearch()
  },
  _cateList() {
    wx.showLoading({
      title: '加载中',
      mask: true,
    })
    cateList()
      .then((res) => {
        const cateListNode = this._handlerCateNode(res)
        this.setData({
          cateListNode: cateListNode,
        })
        const productCategoryId =
          this.data.cateListNode.length > 0 ? this.data.cateListNode[0].id : 0
        this.setData({
          productCategoryId: productCategoryId,
        })
        this._productSearch()
        wx.hideLoading()
      })
      .catch((err) => {
        wx.hideLoading()
      })
  },
  _handlerCateNode(cateNode) {
    let node = []
    cateNode.forEach((item) => {
      console.log('item==', item)
      if (item && item.children && item.children.length > 0) {
        node = node.concat(item.children)
      }
    })
    return node
  },
  _productSearch() {
    this.setData({
      productList: [],
      totalPage: 0,
      isLoadingPro:true
    })
    if (this.data.productCategoryId <= 0) return
    const productSearchOption = {
      pageNum: this.data.pageNum,
      pageSize: this.data.pageSize,
      productCategoryId: this.data.productCategoryId,
    }
    productSearch(productSearchOption).then((res) => {
      this.setData({
        productList: res.list,
        totalPage: res.totalPage,
         isLoadingPro:false
      })
      console.log('productList', this.data.productList)
    }).catch(err=>{
         this.setData({
         isLoadingPro:false
      })
    })
  },
})
