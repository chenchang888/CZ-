import { request } from "../../request/request";
import { contentSearch } from '../../utils/util';
Page({

  /**
   * 页面的初始数据
   */
  data: {

    // image  写死了，不能怪我，原因我也不知道，请找开发网站和查询机的小伙伴
    imageCompany: [
      { url: '../../images/policy_08.png' },
      { url: '../../images/policy_07.png' },
      { url: '../../images/policy_06.png' },
      { url: '../../images/policy_05.png' },
      { url: '../../images/policy_04.png' },
      { url: '../../images/policy_03.png' },
      { url: '../../images/policy_02.png' },
      { url: '../../images/policy_01.png' },
    ],
    imagePerson: [
      { url: '../../images/policy_16.png' },
      { url: '../../images/policy_15.png' },
      { url: '../../images/policy_14.png' },
      { url: '../../images/policy_13.png' },
      { url: '../../images/policy_12.png' },
      { url: '../../images/policy_11.png' },
      { url: '../../images/policy_10.png' },
      { url: '../../images/policy_09.png' },
    ],


    // 搜索框内容
    inputContent: '',
    // 轮播图
    swiperImg: {},
    // 最新公告
    newNotic: {},
    // 企业导航项
    enterpriseNav: [],
    // 个人导航
    personalNav: []
  },

  // 搜索框失去焦点
  inputBlur(e) {
    const { value } = e.detail
    this.setData({ inputContent: value })
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
      url: '../list/list?content=' + inputContent + ''
    })
  },

  // 获取轮播图
  async getSwiperList() {
    const res = await request({
      url: '/wx/banners'
    })
    console.log(res);
    
    const swiperImg = res.data.data
    if (res.statusCode === 200) {
      this.setData({
        swiperImg
      })
    } else {
      wx.showToast(
        {
          title: '请求错误',
          icon: 'none',
          time: 2000
        }
      )
    }
  },

  // 获取最新公告
  async getNewNotice() {
    var res = await request({ url: "/wx/getNews" })
    const newNotic = res.data.data
    this.setData({
      newNotic
    })
    console.log(res);
    
  },

  // 获取企业导航选项
  async getNavList() {
    var res = await request({
      url: "/wx/getDatSubjectData",
      data: {
        subjectType: 0,
        Num: 8
      }
    })
    var enterpriseNav = res.data.data
    const imgUrl = this.data.imageCompany
    // 合并图片数组
    // imgUrl.forEach((value, index) => {
    //   enterpriseNav[index].subjectIcon = value.url
    // })
    this.setData({ enterpriseNav })
  },
  // 获取个人导航选项
  async getPerList() {
    var res = await request({
      url: "/wx/getDatSubjectData",
      data: {
        subjectType: 1,
        Num: 8
      }
    })
    const personalNav = res.data.data
    const imgUrl = this.data.imagePerson
    // 合并图片数组
    // imgUrl.forEach((value, index) => {
    //   personalNav[index].subjectIcon = value.url
    // })
    this.setData({ personalNav })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getSwiperList();
    this.getNewNotice();
    this.getNavList();
    this.getPerList();
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