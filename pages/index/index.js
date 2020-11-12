import { request } from "../../request/request";
import { contentSearch } from '../../utils/util';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 搜索框内容
    inputContent: '',
    // 轮播图
    swiperImg: {},
    // 最新公告
    newNotic: '',
    // 导航项
    navList: ''
  },

  // 搜索框失去焦点
  inputBlur(e) {
    console.log(e);
    const { value } = e.detail
    this.setData({ inputContent: value })
    console.log(this.data.inputContent);

  },

  // 搜索
  handleSearch(e) {
    const inputContent = this.data.inputContent
    if (inputContent.trim() === '') {
      wx.showToast({
        title: '搜索内容不能为空',
        icon: 'none',
        duration: 2000
      })
      return
    }
    this.setData({ inputContent: '' })
    wx.navigateTo({
      url: '../list/list?content=inputContent'
    })
  },

  // 获取轮播图
  // async getSwiperList() {
  //   var res = await request({
  //     url: '/banners'
  //   })
  //   console.log(res);
  //   const swiperImg = res.data.data
  //   if (res.statusCode === 200) {
  //     this.setData({
  //       swiperImg
  //     })
  //   } else {
  //     wx.showToast(
  //       {
  //         title: '加载错误',
  //         icon: 'none',
  //         time: 2000
  //       }
  //     )
  //   }
  // },

  // 获取最新公告
  getNewNotice() {

  },

  // 获取导航选项
  getNavList() {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // this.getSwiperList();
    this.getNewNotice();
    this.getNavList();
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