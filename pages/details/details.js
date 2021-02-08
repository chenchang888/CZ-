import { authorLogin } from "../../utils/util"
const { request } = require("../../request/request")
const fileUrl = 'http://www.chuzhou.gov.cn/'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 文章详情
    detailsContent: {},
    // 用户名
    user: '',
    // 详情内容
    docContent: '',
    // 基础文章id
    baseDetailsId: '',
    // 精选文章id
    detailsId: '',
    // 是否有附件
    fileFlag: false,
    // 是否有评论内容
    commentFlag: true,
    // 点赞状态
    praise: 0,
    // 点赞数
    parseNum: 0,
    // 收藏状态
    collection: 0,
    // 是否显示立即申请按钮
    showBtn: false,
    // 评论区详情
    commentDetails:[],
    // 评论内容
    inputContent: '',
    // 输入框自动撑高
    lineHeight: true
  },

  // 获取政策详情
  async getDetails() {
    const res = await request({
      url: "/subject/ArticleDetail",
      data: {
        datPolicyId: this.data.detailsId,
        datArticleId: this.data.baseDetailsId
      }
    });
    let docContent = res.data.data.docContent
    // 处理富文本图片表格溢出问题，添加img前缀
    docContent = docContent.replace(/\s(src=")/g, "$1http://www.chuzhou.gov.cn")
    docContent = docContent.replace(/\<img/gi, '<img class="richImg"')
    docContent = docContent.replace(/<table[^>]*>/gi, '<table style="width:100%;height:auto;display:block" ')
    this.setData({
      parseNum: res.data.data.praiseCount,
      praise: res.data.data.praise,
      collection: res.data.data.collect,
      commentDetails: res.data.data.policyEvalVOList,
      detailsContent: res.data.data,
      docContent
    })
    // 判断文章属于基础还是精选
    if (res.data.data.typeId) {
      this.setData({
        detailsId: res.data.data.id,
        showBtn: true
      })
    } else {
      this.setData({
        baseDetailsId: res.data.data.id
      })
    }
    // 判断是否有附件
    if (res.data.data.originalFile) {
      this.setData({ fileFlag: true })
    } else {
      this.setData({ fileFlag: false })
    }
    // 判断是否有用户评论
    if (res.data.data.policyEvalVOList) {
      this.setData({ commentFlag: false })
      return
    }
    this.setData({ commentFlag: true })
  },

  // 政策附件
  handleFiles() {
    wx.downloadFile({
      // 示例 url，并非真实存在
      url: 'http://example.com/somefile.pdf',
      success: function (res) {
        const filePath = res.tempFilePath
        wx.openDocument({
          filePath: filePath,
          success: function (res) {
            console.log('打开文档成功')
          }
        })
      }
    })
  },

  // 点赞
  async likesHandle() {
    // 判断用户是否登录
    const { errMsg } = await authorLogin()
    if (errMsg === "checkSession:ok") {
      const res = await request({
        url: "/subject/praise",
        method: 'post',
        data: {
          datPolicyId: this.data.detailsId,
          datArticleId: this.data.baseDetailsId
        }
      })
      // 点赞封装成函数
      const praseFlag = () => {
        if (this.data.praise) {
          wx.showToast({
            title: '已取消',
            icon: "none",
            mask: true,
            duration: 2000
          })
          this.setData({
            praise: 0,
            parseNum: this.data.parseNum - 1
          })
        } else {
          wx.showToast({
            title: '点赞成功',
            icon: "none",
            mask: true,
            duration: 2000
          })
          this.setData({
            praise: 1,
            parseNum: this.data.parseNum + 1
          })
        }
      }
      praseFlag()
    }
  },

  // 收藏
  async collectHandle() {
    // 判断用户是否登录
    const { errMsg } = await authorLogin()
    if (errMsg === "checkSession:ok") {
      // 请求
      const res = await request({
        url: "/subject/Collection",
        method: "post",
        data: {
          datPolicyId: this.data.detailsId,
          datArticleId: this.data.baseDetailsId
        }
      })
      if (res.data.msg === "取消收藏成功") {
        this.setData({ collection: 0 })
        wx.showToast({
          title: '已取消收藏',
          icon: 'none',
          duration: 2000,
          mask: true
        })
      } else {
        this.setData({ collection: 1 })
        wx.showToast({
          title: '已收藏',
          icon: 'success',
          duration: 2000,
          mask: true
        })
      }
    }
  },

  // 失去焦点获取输入框评论内容
  getInputContent(e) {
    this.setData({
      inputContent: e.detail.value
    })
  },

  // 评论输入框撑高
  lineChange(e) {
    const lineNum = e.detail.lineCount
    if (lineNum <= 3) {
      this.setData({
        lineHeight: true
      })
    } else {
      this.setData({
        lineHeight: false
      })
    }
  },
  // 评论提交
  async commenHandle() {
    // 判断用户是否登录
    const { errMsg } = await authorLogin()
    if (errMsg === "checkSession:ok") {
      if (this.data.inputContent.trim() === '') {
        wx.showToast({
          title: '内容不能为空',
          icon: 'none',
          duration: 2000
        })
        return
      }
      const res = await request({
        url: "/subject/saveComment",
        method: "POST",
        data: {
          datPolicyId: this.data.detailsId,
          datArticleId: this.data.baseDetailsId,
          user: this.data.user,
          content: this.data.inputContent,
        }
      })
      wx.showToast({
        title: '提交成功',
        icon: 'success',
        duration: 1000
      })
      this.setData({ inputContent: '' })
    }
  },
  // 获取用户信息
  async getUserMes() {
    const that = this
    const { errMsg } = await authorLogin()
    if (errMsg === "checkSession:ok") {
      wx.getUserInfo({
        success: function (res) {
          const user = res.userInfo.nickName
          that.setData({ user })
        }
      })
    }
  },
  // 立即申请
  handleApply() {
    wx.navigateTo({
      url: '/pages/webUrl/webUrl'
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if (options.typeId === "1") {
      this.setData({ detailsId: options.id })
    } else {
      this.setData({ baseDetailsId: options.id })
    }
    this.getUserMes()
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
    this.getDetails();
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