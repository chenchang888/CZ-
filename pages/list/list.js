import {
  request
} from '../../request/request';
Page({

  /**
   * 页面的初始数据
   */
  data: {

    // 搜索内容
    searchContent: '',

    // 选择个人企业状态
    selsecState: 0,

    // 显示政策列表图片
    shows: true,

    // 总条数
    total: '',
    // 列表点击状态,显示弹出层
    current: 0,
    // 列表选择
    selectList: [{
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
    // --------------------------------------------------------
    // 当前页面从全局搜索进入显示个人企业，还是点击政策导航项进入，类型
    selectCategory: false,
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

    // 请求参数
    params: {
      docCategory: '', //0为个人，1为惠企
      docTitle: '',
      subjectId: '',
      docGrade: '',
      docYear: '',
      current: 1,
      size: 8,
    },
  },

  // 请求列表数据
  async getPolicyList() {
    wx.showLoading({
      title: '加载中',
    })
    const res = await request({
      url: "/wx/getArticleData",
      data: this.data.params
    })
    console.log(res);
    if (res.data.code === 200) {
      wx.hideLoading()
      // 合并请求页数据
      const resList = res.data.data.records
      const listData = this.data.listData
      Array.prototype.push.apply(listData, resList)
      this.setData({
        listData,
        total: res.data.data.total
      })
    }

  },

  // 请求政策条件选择项
  async getPolicyType() {
    const res = await request({
      url: "/wx/getClassify",
      data: {
        subjectType: this.data.params.docCategory,
        num: 0
      }
    })
    console.log(res);
    this.setData({
      policyGrade: res.data.data.POLICY_LEVER,
      policyYear: res.data.data.POL_YEAR,
      policyThemes: res.data.data.POL_SUBJECT,
    })
  },

  // 当前列表页搜索
  handleSearch(e) {
    const inputContent = e.detail
    if (inputContent.trim() === '') {
      wx.showToast({
        title: '搜索内容不能为空',
        icon: 'none',
        duration: 2000
      })
      return
    }
    this.setData({
      listData: [],
      "params.docTitle": inputContent,
      "params.current": 1
    })
    this.getPolicyList()
  },
  // 选择政策主题类型
  chooseTheme(e) {
    const {
      id
    } = e.currentTarget.dataset;
    if (this.data.params.subjectId === id) {
      this.setData({
        "params.subjectId": ''
      })
      return
    }
    this.setData({
      "params.subjectId": id
    })
  },
  // 选择政策等级
  chooseGrade(e) {
    const {
      grade
    } = e.currentTarget.dataset;
    if (this.data.params.docGrade === grade) {
      this.setData({
        "params.docGrade": ''
      })
      return
    }
    this.setData({
      "params.docGrade": grade
    })
  },
  // 选择政策年份
  chooseYear(e) {
    const {
      year
    } = e.currentTarget.dataset;
    if (this.data.params.docYear === year) {
      this.setData({
        "params.docYear": ''
      })
      return
    }
    this.setData({
      "params.docYear": year,
    })
  },

  // 确定
  async determineBtn() {
    this.setData({
      current: 0,
      listData: [],
      "params.current": 1
    })
    this.getPolicyList()
  },
  //  取消
  cancelBtn() {
    this.setData({
      current: 0
    })
  },

  // 个人，企业切换
  selectPersonal() {
    if (this.data.params.docCategory === 0) {
      this.setData({
        "params.docCategory": ''
      })
      return
    }
    this.setData({
      "params.docCategory": 0
    })
  },
  selectEnterprise() {
    if (this.data.params.docCategory === 1) {
      this.setData({
        "params.docCategory": ''
      })
      return
    }
    this.setData({
      "params.docCategory": 1,
    })
  },

  // 上拉加载下一页数据
  loadNextPage() {
    // 判断当前页是否大于总页数
    if (this.data.params.current > this.data.total / this.data.params.size) {
      wx.showToast({
        title: '已经到底了',
        icon: 'none',
        duration: 2000
      })
      return
    }
    this.data.params.current++
    this.getPolicyList()
  },

  // 显示弹出层
  showPopup(e) {
    const {
      id
    } = e.currentTarget.dataset
    // 当再次点击当前状态取消弹出层
    if (this.data.current === id) {
      this.setData({
        current: 0
      })
      return
    }
    this.setData({
      current: id
    });
  },

  // 关闭弹出层
  closePopur(e) {
    this.setData({
      current: 0
    });
  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 获取上一页参数
    if (options && options.content) {
      this.setData({
        "params.docTitle": options.content
      })
    }
    if (options && options.itemId) {
      this.setData({
        "params.subjectId": options.itemId
      })
    }
    if (options && options.typeId) {
      this.setData({
        "params.docCategory": options.typeId
      })
    }
    this.getPolicyList()
    this.getPolicyType()
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
  onShow: function () {},

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