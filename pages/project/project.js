import { contentSearch } from '../../utils/util'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 显示列表弹出层
    showPopup: false,

    // 政策主题
    policyThemes: [
      {
        id: 1,
        title: '政策主题'
      },
      {
        id: 2,
        title: '政策主题'
      },
      {
        id: 3,
        title: '政策主题'
      },
      {
        id: 4,
        title: '政策主题'
      },
      {
        id: 5,
        title: '政策主题'
      },
      {
        id: 6,
        title: '政策主题'
      },
      {
        id: 7,
        title: '政策主题'
      },
      {
        id: 8,
        title: '政策主题'
      },
      {
        id: 9,
        title: '政策主题'
      },
      {
        id: 10,
        title: '政策主题'
      }
    ],
    // 选择政策主题状态
    activeTheme: 0,

    // 等级
    policyGrade: [
      {
        id: 1,
        grade: "国家级"
      },
      {
        id: 2,
        grade: "省级"
      },
      {
        id: 3,
        grade: "市级"
      },
      {
        id: 4,
        grade: "县级"
      },
      {
        id: 5,
        grade: "其他"
      },
    ],
    // 选择政策等级状态
    activeGrade: 0,

    // 年份
    policyYear: [
      {
        id: 1,
        year: "2020"
      },
      {
        id: 2,
        year: "2019"
      },
      {
        id: 3,
        year: "2018"
      },
      {
        id: 4,
        year: "2017"
      },
      {
        id: 5,
        year: "3年前"
      },
    ],
    // 选择政策年份状态
    activeYear: 0,
  },

  // 搜索
  handleSearch(e) {
    // console.log(e.detail);
    contentSearch(e)
  },
  // 项目查找
  lookUpHandle() {
    this.setData({ showPopup: true })
  },
  // 政策主题选择
  chooseTheme(e) {
    console.log(e);
    this.setData({
      activeTheme: e.currentTarget.dataset.id
    })
  },
  // 政策等级选择
  chooseGrade(e) {
    console.log(e);
    this.setData({
      activeGrade: e.currentTarget.dataset.id
    })
  },
  // 政策年份选择
  chooseYear(e) {
    console.log(e);
    this.setData({
      activeYear: e.currentTarget.dataset.id
    })
  },
  // 取消弹出层
  closePopur() {
    this.setData({ showPopup: false })
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