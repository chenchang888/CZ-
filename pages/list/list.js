import { contentSearch } from '../../utils/util'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 显示对应列表id
    listId: null,

    // 显示个人企业选择项还是下拉弹出层政策选择项
    selectCategory: false,
    // 选择个人企业状态
    selsecState: 0,


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
  closePopur() {
    this.setData({ current: 0 });
  },

  // 选择政策主题
  chooseTheme(e) {
    console.log(e);
    const { id } = e.currentTarget.dataset;
    this.setData({ activeTheme: id })
  },
  // 选择政策等级
  chooseGrade(e) {
    console.log(e);
    const { id } = e.currentTarget.dataset;
    this.setData({ activeGrade: id })
  },
  // 选择政策年份
  chooseYear(e) {
    console.log(e);
    const { id } = e.currentTarget.dataset;
    this.setData({ activeYear: id })
  },

  // 确定
  determineBtn() {
    this.setData({ current: 0 })
  },
  //  取消
  cancelBtn() {
    this.setData({ current: 0 })
  },


  // 搜索
  handleSearch(e) {
    console.log(e.detail);
    contentSearch(e)
  },

  // 获取政策列表
  getPolicyList() {

  },

  // 个人企业切换
  // 个人
  selectPersonal() {
    this.setData({ selsecState: 1 })
  },
  // 企业
  selectEnterprise() {
    this.setData({ selsecState: 2 })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 判断是个人还是企业政策
    console.log(options);
    const id = options.id;
    if (!id) {
      this.setData({ selectCategory: true })
    }
    this.getPolicyList();
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
    console.log(getCurrentPages());
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