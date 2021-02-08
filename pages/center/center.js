import { request } from "../../request/request";
import { authorLogin, userInfoLogin } from "../../utils/util"
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
    const { userInfo } = e.detail
    if (e.detail.errMsg === 'getUserInfo:fail auth deny') {
      return
    }
    wx.login({
      async success(res) {
        if (res.code) {
          console.log(res.code);
          //发起网络请求
          const result = await request({
            url: '/personal/wxLogin',
            method: 'post',
            data: {
              code: res.code
            }
          })
          console.log(result);
          const token = result.data.msg
          // console.log(token);
          wx.setStorageSync('token', token)
          wx.showToast({
            title: '登录成功！',
            icon: 'success',
            duration: 2000
          })
          that.setData({
            userInfo,
            show: true
          })
        }
      }
    })
  },
  // 检验用户登录
  async getAuthSetting() {
    const that = this
    const mes = await authorLogin()
    const { errMsg, userInfo } = await userInfoLogin()
    if (errMsg === "getUserInfo:ok" && mes.errMsg === "checkSession:ok") {
      that.setData({
        userInfo,
        show: true
      })
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getAuthSetting()
    // 分享
    wx.showShareMenu({
      withShareTicket: true,
      menus: ['shareAppMessage', 'shareTimeline']
    })
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