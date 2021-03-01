// components/search-tag/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    taglist: {
      type: Array,
      value: [],
    },
    title: {
      type: String,
      value: '',
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
      this.triggerEvent('tagClick',event.target.dataset.txt)
    },
  },
})
