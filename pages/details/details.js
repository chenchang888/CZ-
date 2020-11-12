// pages/details/details.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    flag: false,
    // 是否有评论内容
    commentFlag: false,
    // 点赞状态
    likes: false,
    // 点赞数
    number: 998,
    // 收藏状态
    collection: false,
    // 是否显示立即申请按钮
    showBtn: false,
    // 评论输入框内容
    inputContent: ''
  },
  tiaozhaun() {
    this.setData({ flag: true })
  },


  // 获取政策详情
  getDetails() {
    wx.downloadFile({
      // 示例 url，并非真实存在
      url: 'http://example.com/somefile.pdf',
      success: function (res) {
        const filePath = res.tempFilePath
        wx.openDocument({
          filePath: filePath,
          success: function (res) {
            console.log('打开文档成功')
          }
        })
      }
    })
  },
  // 政策附件
  handleFiles() {
    wx.downloadFile({
      // 示例 url，并非真实存在
      url: 'http://example.com/somefile.pdf',
      success: function (res) {
        const filePath = res.tempFilePath
        wx.openDocument({
          filePath: filePath,
          success: function (res) {
            console.log('打开文档成功')
          }
        })
      }
    })
  },

  // 点赞
  likesHandle() {
    if (this.data.likes) {
      this.setData({ number: this.data.number - 1 })
    } else {
      this.setData({ number: this.data.number + 1 })
    }
    this.setData({
      likes: !this.data.likes,
    })
  },
  // 收藏
  collectHandle() {
    if (this.data.collection) {
      wx.showToast({
        title: '已取消收藏',
        icon: 'none',
        duration: 2000
      })
    } else {
      wx.showToast({
        title: '已收藏',
        icon: 'success',
        duration: 2000
      })
    }
    this.setData({ collection: !this.data.collection })
  },

  // 失去焦点获取输入框评论内容
  getInputContent(e) {
    console.log(e.detail.value);
    this.setData({
      inputContent: e.detail.value
    })
  },
  // 评论提交
  commenHandle() {
    if (this.data.inputContent.trim() === '') {
      wx.showToast({
        title: '内容不能为空',
        icon: 'none',
        duration: 2000
      })
      return
    }
    wx.showToast({
      title: '提交成功',
      icon: 'success',
      duration: 2000
    })
    this.setData({ inputContent: '' })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options);
    if (options.id === '8') {
      this.setData({ showBtn: true })
    }
    this.getDetails();
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})