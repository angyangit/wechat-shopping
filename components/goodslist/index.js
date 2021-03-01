// components/goodlist/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    goodsList: {
      type: Array,
      value: [],
    },
    multipleShow: {
      type: Boolean,
      value: true,
    },
  },

  /**
   * 组件的初始数据
   */
  data: {},

  /**
   * 组件的方法列表
   */
  methods: {
    select(event) {
      const id = event.currentTarget.dataset['id']
      const cateid = event.currentTarget.dataset['cateid']
      console.log(id)
      wx.navigateTo({
        // url: '/pages/product-detail/index?id=' + id,
        url: `/pages/product-detail/index?id=${id}&cateId=${cateid}`,
      })
    },
  },
})
