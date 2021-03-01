// components/swiper/index.js

Component({
  /**
   * 组件的属性列表
   */
  properties: {
    dataList: {
      type: Array,
      value: [],
    },
  },

  /**
   * 组件的初始数据
   */
  data: {
    indicatorDots: true,
    vertical: false,
    autoplay: true,
    interval: 2000,
    duration: 500,
  },

  lifetimes: {
    attached() {
      console.log('attached', this.data.dataList)
    }
  },

  /**
   * 组件的方法列表
   */
  methods: {},
})
