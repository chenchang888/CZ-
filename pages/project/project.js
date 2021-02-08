import { request } from "../../request/request"
Page({

  /**
   * 页面的初始数据
   */
  data: {

    // 请求参数
    params: {
      docTitle: '',
      subjectId: '',
      docGrade: '',
      docYear: '',
      current: 1,
      size: 10,
    },
    pages: 0,

    // 显示列表弹出层
    showPopup: false,
    // 申报列表
    applyList: [],

    // 政策主题
    policyThemes: [],
    // 选择政策主题状态
    activeTheme: '',

    // 等级
    policyGrade: [],
    // 选择政策等级状态
    activeGrade: '',

    // 年份
    policyYear: [],
    // 选择政策年份状态
    activeYear: '',
  },

  // 请求项目列表
  async getProject() {
    const res = await request({
      url: "/wx/getPolicyData",
      data: this.data.params
    })
    // 合并请求页数据
    const resList = res.data.data.records
    const applyList = this.data.applyList
    Array.prototype.push.apply(applyList, resList)
    this.setData({
      applyList,
      pages: res.data.data.pages
    })
  },
  // 上拉加载下一页数据
  loadNextPage() {
    // 判断当前页是否大于总页数
    if (this.data.params.current >= this.data.pages) {
      wx.showToast({
        title: '已经到底了',
        icon: 'none',
        duration: 2000
      })
      return
    }
    this.data.params.current++
    this.getProject()
  },

  // 请求政策条件选择项
  async getPolicyType() {
    const res = await request({
      url: "/wx/getClassify",
      data: {
        subjectType: '',
        num: 0
      }
    })
    this.setData({
      policyGrade: res.data.data.POLICY_LEVER,
      policyYear: res.data.data.POL_YEAR,
      policyThemes: res.data.data.POL_SUBJECT,
    })
  },

  // 搜索
  async handleSearch(e) {
    const value = e.detail
    if (value.trim() === '') {
      wx.showToast({
        title: '搜索内容不能为空',
        icon: 'none'
      })
      return
    }
    this.setData({
      "params.docTitle": e.detail,
      "params.current": 1,
      applyList: []
    })
    this.getProject()
  },
  // 项目查找
  lookUpHandle() {
    this.setData({ showPopup: !this.data.showPopup })
  },
  // 政策主题选择
  chooseTheme(e) {
    if (this.data.params.subjectId === e.currentTarget.dataset.id) {
      this.setData({
        "params.subjectId": ''
      })
      return
    }
    this.setData({
      "params.subjectId": e.currentTarget.dataset.id
    })
  },
  // 政策等级选择
  chooseGrade(e) {
    if (this.data.params.docGrade === e.currentTarget.dataset.itemname) {
      this.setData({
        "params.docGrade": ''
      })
      return
    }
    this.setData({
      "params.docGrade": e.currentTarget.dataset.itemname
    })
  },
  // 政策年份选择
  chooseYear(e) {
    if (this.data.params.docYear === e.currentTarget.dataset.itemname) {
      this.setData({
        "params.docYear": ''
      })
      return
    }
    this.setData({
      "params.docYear": e.currentTarget.dataset.itemname
    })
  },
  // 提交确定
  determineBtn() {
    this.setData({
      showPopup: false,
      "params.current": 1,
      applyList: []
    })
    this.getProject();
  },
  // 取消弹出层
  closePopur() {
    this.setData({ showPopup: false })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getProject()
    this.getPolicyType()
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
    this.setData({ showPopup: false })
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
    this.loadNextPage()
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})