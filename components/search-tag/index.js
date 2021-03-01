// components/search-tag/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    tags: {
      type: Array,
      value: [],
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
    tagClick(event) {
      this.triggerEvent('tagClick',event.detail)
    },
  },
})
