// components/my-search/my-search.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {

  },

  /**
   * 组件的初始数据
   */
  data: {
    inputContent: ''
  },

  /**
   * 组件的方法列表
   */
  methods: {
    // 输入框失去焦点
    inputBlur(e) {
      const { value } = e.detail;
      this.setData({ inputContent: value })
    },
    // 搜索
    searchBtn() {
      var myEventDetail = this.data.inputContent
      this.triggerEvent('InputEvent', myEventDetail)
      this.setData({ inputContent: '' })
    }
  }
})
