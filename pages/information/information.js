import { showModal } from "../../utils/util"
import { userInfoLogin } from "../../utils/util"
import { authorLogin } from "../../utils/util"
import { request } from "../../request/request"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 用户信息
    userInfo: {},
    // 资料性别确认
    genderFlag01: true,
    genderFlag02: false,

    // 请求参数
    params: {
      phone: '',
      name: '',
      email: ''
    },
    // 信息
    personInfo: {
      phone: '输入手机号码',
      name: '输入真实姓名',
      email: '输入邮箱地址'
    },
    // 根据是否登录显示页面
    pageShow: false,
    // 是否显示手机输入框
    phoneInput: true,
    // 是否显示姓名输入框
    nameInput: true,
    // 是否显示邮箱地址输入框
    addressInput: true
  },

  // 检验登录状态
  async getAuthSetting() {
    
    wx.showLoading({
      title: '加载中',
    })
    const that = this
    const mes = await authorLogin()
    const { errMsg, userInfo } = await userInfoLogin()
    if (errMsg === "getUserInfo:ok" && mes.errMsg === "checkSession:ok") {
      that.setData({
        userInfo,
        pageShow: true
      })
      this.getUserIfo();
    }
  },

  // 获取个人资料
  async getUserIfo() {
    const res = await request({
      url: "/personal/getUser"
    })
    if (res.data.code === 200) {
      wx.hideLoading()
    }
    if (res.data.data.name) {
      this.setData({
        "personInfo.name": res.data.data.name
      })
    }
    if (res.data.data.phone) {
      this.setData({
        "personInfo.phone": res.data.data.phone
      })
    }
    if (res.data.data.email) {
      this.setData({
        "personInfo.email": res.data.data.email
      })
    }
  },

  // 点击输入手机号
  getPhoneNumber(e) {
    this.setData({ phoneInput: false })
  },
  // 点击输入姓名
  getName(e) {
    this.setData({ nameInput: false })
  },
  // 点击输入邮箱地址
  getAddress() {
    this.setData({ addressInput: false })
  },
  // 手机输入框失去焦点
  losePhoneFocus() {
    this.setData({
      phoneInput: true
    })
  },
  inputPhoneFocus(e) {
    const { value } = e.detail
    if (value.trim() === '') {
      this.setData({
        "personInfo.phone": this.data.personInfo.phone
      })
    } else {
      this.setData({
        "personInfo.phone": value
      })
    }
    this.setData({
      "params.phone": value
    })
  },
  // 姓名输入框失去焦点
  loseNameFocus() {
    this.setData({
      nameInput: true
    })
  },
  inputNameFocus(e) {
    const { value } = e.detail
    if (value.trim() === '') {
      this.setData({
        "personInfo.name": this.data.personInfo.name
      })
    } else {
      this.setData({
        "personInfo.name": value
      })
    }
    this.setData({
      "params.name": value
    })
  },
  // 邮箱地址输入框失去焦点
  loseAddressFocus() {
    this.setData({
      addressInput: true
    })
  },
  inputAddressFocus(e) {
    const { value } = e.detail
    if (value.trim() === '') {
      this.setData({
        "personInfo.email": this.data.personInfo.email
      })
    } else {
      this.setData({
        "personInfo.email": value
      })
    }
    this.setData({
      "params.email": value
    })
  },
  // 保存
  async preservation() {
    const res = await request({
      url: "/personal/saveUser",
      data: this.data.personInfo
    })
    if (res.data.code === 200) {
      wx.showToast({
        title: '保存成功',
        icon: 'success',
        duration: 2000
      })
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getAuthSetting();
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