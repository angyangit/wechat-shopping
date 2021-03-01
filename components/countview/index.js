Component({
  /**
   * 组件的属性列表
   */
  properties: {
    maxCount: {
      type: Number,
      value: 0,
    },
    innerCount: {
      type: Number,
      value: 1,
    },
    listIndex: {
      type: Number,
      value: 0,
    },
  },

  /**
   * 组件的初始数据
   */
  data: {
    count: 1,
    isInit: false,
  },
  lifetimes: {
    attached() {
      this.setData({
        count: this.properties.innerCount,
        isInit: true,
      })
    },
  },
  observers: {
    count: function (newVal) {
      console.log(newVal)
      if (this.data.isInit) {
        this.setData({
          isInit: false,
        })
        return
      }
      if (newVal > this.data.maxCount) {
        this.setData({
          count: this.data.maxCount,
        })
      }
      this.triggerEvent('countChangeListener', {
        count: newVal,
        index: this.data.listIndex,
      })
    },
  },

  /**
   * 组件的方法列表
   */
  methods: {
    onPost(event) {
      const comment = event.detail.text || event.detail.value
      console.log('comment', comment)
      this.setData({
        count: comment,
      })
    },
    reduce() {
      console.log('--', this.data.count)
      if (this.data.count === 1) return
      this.setData({
        count: Number.parseInt(this.data.count) - 1,
      })
    },
    add() {
      if (this.data.count === this.properties.maxCount) return
      this.setData({
        count: Number.parseInt(this.data.count) + 1,
      })
    },
    getVal() {
      return this.data.count
    },
  },
})
