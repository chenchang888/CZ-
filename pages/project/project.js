import { contentSearch } from '../../utils/util'
import { request } from "../../request/request"
Page({

  /**
   * 页面的初始数据
   */
  data: {

    // 请求参数
    params: {
      proTitle: '',
      datSubjectId: '',
      docGrade: '',
      docYear: '',
      pagenum: 1,
      pagesize: 8,
    },

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
    wx.showLoading({
      title: "加载中",
      mask: true
    });
    const res = await request({
      url: "/project/list",
      data: this.data.params
    })
    this.setData({
      applyList: res.data.data.records
    })
    wx.hideLoading()
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
    this.setData({
      "params.proTitle": e.detail
    })
    // if (e.detail.trim() === '') {
    //   wx.showToast({
    //     title: '搜索内容不能为空',
    //     icon: 'none',
    //     duration: 2000
    //   })
    //   return
    // }
    this.getProject()
  },
  // 项目查找
  lookUpHandle() {
    this.setData({ showPopup: !this.data.showPopup })
  },
  // 政策主题选择
  chooseTheme(e) {
    if (this.data.params.datSubjectId === e.currentTarget.dataset.id) {
      this.setData({
        "params.datSubjectId": ''
      })
      return
    }
    this.setData({
      "params.datSubjectId": e.currentTarget.dataset.id
    })
  },
  // 政策等级选择
  chooseGrade(e) {
    if (this.data.params.docGrade === e.currentTarget.dataset.id) {
      this.setData({
        "params.docGrade": ''
      })
      return
    }
    this.setData({
      "params.docGrade": e.currentTarget.dataset.id
    })
  },
  // 政策年份选择
  chooseYear(e) {
    if (this.data.params.docYear === e.currentTarget.dataset.id) {
      this.setData({
        "params.docYear": ''
      })
      return
    }
    this.setData({
      "params.docYear": e.currentTarget.dataset.id
    })
  },
  // 提交确定
  determineBtn() {
    // const res = await request({
    //   url:"",
    //   data:{}
    // })
    // console.log(res);
    this.setData({ showPopup: false })
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

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})