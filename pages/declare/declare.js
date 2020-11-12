import { showModal } from "../../utils/util"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 根据是否登录显示页面
    pageShow: false
  },

  // 是否登录
  getAuthSetting() {
    const that = this
    // let setTime = null
    wx.getSetting({
      success(res) {
        if (!res.authSetting['scope.userInfo']) {
          showModal()
          // clearTimeout(setTime)
        } else {
          // setTime = setTimeout(() => {
            that.setData({
              pageShow: true
            })
          // }, 1);
        }
      }
    })
  },

  // // 文件
  // wenjain(){
  //   wx.downloadFile({
  //     // 示例 url，并非真实存在
  //     url: 'http://example.com/somefile.pdf',
  //     success: function (res) {
  //       const filePath = res.tempFilePath
  //       wx.openDocument({
  //         filePath: filePath,
  //         success: function (res) {
  //           console.log('打开文档成功')
  //         }
  //       })
  //     }
  //   })
  // },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getAuthSetting()
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