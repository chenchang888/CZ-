import {
  request
} from "../../request/request"
import {
  authorLogin,
  loginApi,
  userInfoLogin
} from "../../utils/util"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 根据是否登录显示页面
    pageShow: false,

    // 根据是否有数据显示组件
    noDataShow: false,
    // 收藏数据
    collectData: [],
    // 取消收藏参数
    cancelParams: {
      // 基础文章id
      baseDetailsId: '',
      // 精选文章id
      detailsId: '',
    },
    // 总页数
    total: '',
    params: {
      current: 1,
      size: 10,
    },
  },

  // 获取收藏
  async getCollectData() {
    const that = this
    wx.showLoading({
      title: '加载中',
    })
    // 请求数据
    const res = await request({
      url: "/personal/getCollect",
      data: this.data.params
    })
    if (res.data.code === 200) {
      wx.hideLoading()
    }
    const collectData = res.data.data.records
    const list = this.data.collectData
    // 拼接数组
    Array.prototype.push.apply(list, collectData)
    this.setData({
      collectData: list,
      total: res.data.data.pages
    })
  },
  // 删除收藏政策
  async deleteCollection(event) {
    const that = this
    console.log(event);
    // if (event.currentTarget.dataset.typeid) {
    that.setData({
      "cancelParams.baseDetailsId": event.currentTarget.dataset.id
    })
    // }
    //  else {
    //   that.setData({
    //     "cancelParams.baseDetailsId": event.currentTarget.dataset.id
    //   })
    // }
    wx.showModal({
      title: '提示',
      content: '确定要删除吗',
      async success(res) {
        if (res.confirm) {
          const res = await request({
            url: "/subject/Collection",
            method: "post",
            data: that.data.cancelParams
          })
          if (res.data.code === 200) {
            that.setData({
              collectData: []
            })
            that.getCollectData()
          }
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
  },

  // 判断用户是否登录 
  async getAuthSetting() {
    const that = this
    const mes = await authorLogin()
    const {
      errMsg
    } = await userInfoLogin()
    if (errMsg === "getUserInfo:ok" && mes.errMsg === "checkSession:ok") {
      that.setData({
        pageShow: true
      })
      this.getCollectData()
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
    if (this.data.total > this.data.params.current) {
      this.setData({
        'params.current': this.data.params.current + 1
      })
      this.getCollectData()
    } else {
      wx.showToast({
        title: '已全部加载',
        icon: 'none',
        duration: 1000
      })
    }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})