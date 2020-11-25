import { request } from '../../request/request';
import { contentSearch } from '../../utils/util'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 显示对应列表id
    listId: null,
    // 搜索内容
    searchContent: '',
    // 当前页搜索内容
    inputContent: '',
    // 当前页面从全局搜索进入显示个人企业，还是点击政策导航项进入，类型
    selectCategory: false,
    // 当前页面从全局搜索进入显示个人企业，还是点击政策导航项进入，类型
    typeId: '',
    // 政策主题id
    policyTitleId: null,
    // 选择个人企业状态
    selsecState: 0,
    // 单页数量
    pageSize: 10,
    // 总条数
    total: '',
    // 当前页
    pageNum: 1,

    // 显示政策列表图片
    shows: true,

    // 列表点击状态,显示弹出层
    current: 0,
    // 列表选择
    selectList: [
      {
        id: 1,
        title: '政策主题'
      },
      {
        id: 2,
        title: '政策等级'
      },
      {
        id: 3,
        title: '政策年份'
      }
    ],
    // 政策列表
    listData: [],

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

  // 封装页面请求数据函数
  async getRequest(params) {
    wx.showLoading({
      title: "加载中",
      mask: true
    });
    const res = await request({
      url: "/wx/getArticleData",
      data: params
    })
    console.log(res);
    // 合并请求页数据
    const resList = res.data.data.records
    const listData = this.data.listData
    const listNum = Array.prototype.push.apply(listData, resList)
    this.setData({
      listData: listData,
      total: res.data.data.total
    })
    wx.hideLoading()
  },

  // 进入政策列表页面方式获取数据
  async getPolicyList() {
    // 搜索方式进入
    if (!this.data.typeId) {
      console.log('搜索进入');
      const params = {
        docTitle: this.data.searchContent,
        current: this.data.pageNum,
        size: this.data.pageSize
      }
      this.setData({
        selectCategory: true
      })
      this.getRequest(params)
    }
    // 点击个人和企业类型进入
    if (this.data.typeId) {
      // 判断是否点击更多进入页面
      if (!this.data.policyTitleId) {
        // 点击更多进入
        console.log('点击更多进入');
        const params = {
          docCategory: this.data.typeId,
          current: this.data.pageNum,
          size: this.data.pageSize
        }
        this.getPolicyType()
        this.getRequest(params)
      } else {
        // 点击个人惠企进入
        console.log('点击个人惠企进入');
        const params = {
          docCategory: this.data.typeId,
          subjectId: this.data.policyTitleId,
          current: this.data.pageNum,
          size: this.data.pageSize
        }
        this.getPolicyType()
        this.getRequest(params)
      }
    }
  },

  // 当前页搜索
  handleSearch(e) {
    console.log(e);
    if (e.detail.trim() === '') {
      wx.showToast({
        title: '搜索内容不能为空',
        icon: 'none',
        duration: 2000
      })
      return
    }
    this.setData({
      listData: []
    })
    if(!this.data.typeId){
      const params = {
        docTitle: e.detail,
        current: this.data.pageNum,
        size: this.data.pageSize
      }
      this.getRequest(params)
      return
    }
    const params = {
      docCategory: this.data.typeId,
      docTitle: e.detail,
      current: this.data.pageNum,
      size: this.data.pageSize
    }
    this.getRequest(params)
  },

  // 上拉加载下一页数据
  loadNextPage() {
    // 判断当前页是否大于总页数
    if (this.data.pageNum > this.data.total / this.data.pageSize) {
      wx.showToast({
        title: '已经到底了',
        icon: 'none',
        duration: 2000
      })
      return
    }
    this.data.pageNum++
    this.getPolicyList()
  },

  // -----------------------------------------------------------
  // 获取政策选择项
  async getPolicyType() {
    const res = await request({
      url: "/wx/getClassify",
      data: { subjectType: this.data.typeId }
    })
    console.log(res);
    this.setData({
      policyGrade: res.data.data.POLICY_LEVER,
      policyYear: res.data.data.POL_YEAR,
      policyThemes: res.data.data.POL_SUBJECT,
    })
  },

  // 显示弹出层
  showPopup(e) {
    console.log(e);
    const { id } = e.currentTarget.dataset
    console.log(id);
    // 当再次点击当前状态取消弹出层
    if (this.data.current === id) {
      this.setData({
        current: 0
      })
      return
    }
    this.setData(
      {
        current: id
      }
    );
  },

  // 关闭弹出层
  closePopur(e) {
    console.log(e);
    this.setData({ current: 0 });
  },

  // 选择政策主题
  chooseTheme(e) {
    console.log(e);
    const { id } = e.currentTarget.dataset;
    if (this.data.activeTheme === id) {
      this.setData({ activeTheme: '' })
      return
    }
    this.setData({ activeTheme: id })
  },
  // 选择政策等级
  chooseGrade(e) {
    console.log(e);
    const { id } = e.currentTarget.dataset;
    if (this.data.activeGrade === id) {
      this.setData({ activeGrade: '' })
      return
    }
    this.setData({ activeGrade: id })
  },
  // 选择政策年份
  chooseYear(e) {
    console.log(e);
    const { id } = e.currentTarget.dataset;
    if (this.data.activeYear === id) {
      this.setData({ activeYear: '' })
      return
    }
    this.setData({ activeYear: id })
  },

  // 确定
  async determineBtn() {
    const params = {
      subjectId: this.data.activeTheme,
      docGrade: this.data.activeTheme,
      docYear: this.data.activeTheme
    }
    this.getRequest(params)
    this.setData({ current: 0 })
  },
  //  取消
  cancelBtn() {
    this.setData({ current: 0 })
  },

  // ------------------------------------------------------
  // 个人企业切换
  // 个人
  selectPersonal() {
    const params = {
      docCategory: 1
    }
    this.getRequest(params)
    this.setData({ selsecState: 1 })
  },
  // 企业
  selectEnterprise() {
    const params = {
      docCategory: 0
    }
    this.getRequest(params)
    this.setData({ selsecState: 2 })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      typeId: options.typeId,
      policyTitleId: options.itemId,
      searchContent: options.content
    })
    this.getPolicyList()
    // 分享功能
    wx.showShareMenu({
      withShareTicket: true,
      menus: ['shareAppMessage', 'shareTimeline']
    })
  },

  /**
    * 页面上拉触底事件的处理函数
    */
  onReachBottom: function (e) {
    this.loadNextPage()
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
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})