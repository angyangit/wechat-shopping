// components/cateview/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    dateList: {
      type: Array,
      value: [],
      observer(val) {
        if (val.length < 10) return
        this.setData({
          getFristCats: val.slice(0, 10),
          getSecondCats: val.slice(10, val.length),
        })
      },
    },
  },

  /**
   * 组件的初始数据
   */
  data: {
    indicatorDots:false,
    vertical: false,
    autoplay: false,
    interval: 2000,
    duration: 500,
    getFristCats: [],
    getSecondCats: [],
  },

  /**
   * 组件的方法列表
   */
  methods: {},
})
