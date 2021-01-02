import { request } from "../../request/request"
import { authorLogin, loginApi } from "../../utils/util"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 根据是否登录显示页面
    pageShow: false,
    // 收藏数据
    collectData: []
  },

  // 获取收藏
  async getCollectData() {
    const that = this
    const open_id = wx.getStorageSync("openId") || [];
    // 请求数据
    const res = await request({
      url: "/personal/getCollect",
      data: {
        open_id
      }
    })
    console.log(res);
    const collectData = res.data.data.records
    that.setData({
      collectData,
      pageShow: true
    })
  },
  // 删除收藏政策
  deleteCollection(event) {
    console.log(event.currentTarget.dataset.id);
    const deleteId = event.currentTarget.dataset.id
    const collectData = this.data.collectData
    const deleteIndex = collectData.findIndex((item) => {
      item.id === deleteId
    })
    if (deleteIndex === -1) {
      return
    }
    const openId = wx.getStorageSync("openId") || [];
    wx.showModal({
      title: '提示',
      content: '确定要删除吗',
      async success(res) {
        if (res.confirm) {
          console.log('用户点击确定')
          const res = await request({
            url: "/subject/Collection",
            data:{
              openId
            }
          })
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
  },
  // 是否登录
  getAuthSetting() {
    const that = this
    wx.checkSession({
      success() {
        that.getCollectData()
      },
      fail() {
        console.log("未登录");
        wx.showModal({
          title: "提示",
          content: "您还未登陆，请前往登录",
          success(res) {
            if (res.confirm) {
              console.log('点击了确定');
            } else if (res.cancel) {
              console.log('点击了取消');
            }
            wx.navigateBack({
              delta: 1
            });
          },
        })
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
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
    this.getAuthSetting()
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