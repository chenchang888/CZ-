import { showModal } from "../../utils/util"
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

    // 信息
    personInfo: {
      phone: '输入手机号码',
      name: '输入真实姓名',
      address: '输入邮箱地址'
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

  // 登录状态
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
            // 已授权获取信息
            wx.getUserInfo({
              success(res) {
                console.log(res);
                const { userInfo } = res
                that.setData({
                  userInfo,
                  pageShow: true
                })
              }
            })
          // }, 1);
        }
      }
    })
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
  losePhoneFocus(e) {
    const { value } = e.detail
    if (value.trim() === '') {
      this.setData({
        phoneInput: true,
        "personInfo.phone": this.data.personInfo.phone
      })
    } else {
      this.setData({
        phoneInput: true,
        "personInfo.phone": value
      })
    }
  },
  // 姓名输入框失去焦点
  loseNameFocus(e) {
    const { value } = e.detail
    if (value.trim() === '') {
      this.setData({
        nameInput: true,
        "personInfo.name": this.data.personInfo.name
      })
    } else {
      this.setData({
        nameInput: true,
        "personInfo.name": value
      })
    }
  },
  // 邮箱地址输入框失去焦点
  loseAddressFocus(e) {
    const { value } = e.detail
    if (value.trim() === '') {
      this.setData({
        addressInput: true,
        "personInfo.address": this.data.personInfo.address
      })
    } else {
      this.setData({
        addressInput: true,
        "personInfo.address": value
      })
    }
  },
  // 保存
  preservation() {
    wx.showToast({
      title: '保存成功',
      icon: 'success',
      duration: 2000
    })
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