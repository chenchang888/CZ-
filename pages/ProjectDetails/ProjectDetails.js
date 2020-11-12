// pages/ProjectDetails/ProjectDetails.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    apply: false,
    content: {
      department: '市科技局',
      object: '企事业单位',
      year: '2015',
      money: '省按出租仪器设备年度收入的20%给予设备管理单位补助，每个单位最高不超过500万元，补助资金用于仪器设备的更新维护、运行和人员培训等。设备租用单位所在市（县）按租用仪器设备年度支出的20%给予租用单位补助，每个租用单位最高不超过200万元。',
      starTime: '2020-01-01',
      endTime: '2025-12-31',
      place: '滁州市南谯区龙蟠大道99号市政务服务中心二楼科技局B23窗口',
      handleTime: '工作日 8:30-12:00，14:00-17:00 ',
      consultPphone: '0550-3820116',
      supervisePphone: '0550-3024441',
    },
    // 申报材料
    applyMaterials: {
      title01: '1.仪器设备出租服务收费凭证仪器设备出租服务收费凭证仪器设备出租服务收费凭证',
      title02: '2.安徽省大型科学仪器资源共享共用补仪器设备出租服务收费凭证仪器设备出租服务收费凭证'
    },
    // 申请流程
    process: '具体申请流程详情咨询主管部门'
  },
  // 申报材料
  handleApply() {
    wx.navigateTo({
      url: '/pages/webView/webView',
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