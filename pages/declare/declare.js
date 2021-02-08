import { request } from '../../request/request'
import { authorLogin, userInfoLogin } from "../../utils/util"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 总页数
    total: '',
    params: {
      current: 1,
      size: 8,
    },
    // 订阅列表数据
    subscribe: [],
    // 无数据是否现实
    noDataShow: false,
    // 根据是否登录显示页面
    pageShow: false
  },

  // 获取我的订阅数据
  async getMySubscribe() {
    const that = this
    // 请求数据
    const res = await request({
      url: "/personal/getProject",
      data: this.data.params
    })
    const subscribeData = res.data.data.records
    const list = this.data.subscribe
    if (!subscribeData.length) {
      this.setData({
        noDataShow: true
      })
    }
    // 拼接数组
    Array.prototype.push.apply(list, subscribeData)
    this.setData({
      subscribe: list,
      total: res.data.data.pages
    })
  },

  // 判断用户是否登录 
  async getAuthSetting() {
    const that = this
    const mes = await authorLogin()
    const { errMsg } = await userInfoLogin()
    if (errMsg === "getUserInfo:ok" && mes.errMsg === "checkSession:ok") {
      that.setData({
        pageShow: true
      })
      this.getMySubscribe()
    }
  },

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