// pages/center/center.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 是否登录
    show: false,
    userInfo: {}
  },

  // 登录
  getUserInfo(e) {
    const that = this
    console.log(e);
    if(e.detail.errMsg==='getUserInfo:fail auth deny'){
      return
    }
    const { userInfo } = e.detail
    this.setData({
      userInfo,
      show: true
    })
  },
  // 检验登录
  getInfo() {
    const that = this
    wx.getSetting({
      success(res) {
        if (res.authSetting['scope.userInfo']) {
          wx.getUserInfo({
            success: function (res) {
              console.log(res);
              const { userInfo } = res
              that.setData({
                userInfo,
                show: true
              })
            }
          })
        }
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getInfo()
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