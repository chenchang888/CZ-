const { request } = require("../../request/request");
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 内容id
    id: '',
    apply: false,
    content: {},
    // 申报材料
    applyMaterials: [],
  },

  // 获取详情数据
  async getProjectContent() {
    const res = await request({
      url: "/project/getProDeclareInfo",
      data: {
        id: this.data.id
      }
    })
    const mes = res.data.data
    const fileRes = JSON.parse(mes.proApplyDoc)
    console.log(fileRes);
    this.setData({
      content: mes,
      applyMaterials: fileRes
    })
  },
  // 申报材料
  handleApply() {
    // const files = this.data.applyMaterials[0].path
    // console.log(files);
    wx.saveFile({
      tempFilePath: this.data.applyMaterials[0].path,
      success (res) {
        const savedFilePath = res.savedFilePath
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options);
    this.setData({ id: options.id })
    this.getProjectContent();
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