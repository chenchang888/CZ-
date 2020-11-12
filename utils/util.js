// 检验是否登录
const showModal = () => {
    wx.showModal({
        title: '提示',
        content: '您还未登陆，请前往登录',
        success(res) {
            if (res.confirm) {
                wx.switchTab({
                    url: "../center/center"
                })
            } else if (res.cancel) {
                console.log('用户点击取消')
                wx.navigateBack({
                    delta: 1
                })
            }
        }
    })
}
// 搜索为空提示
const contentSearch = (event) => {
    const value = event.detail
    if (value.trim() === '') {
        wx.showToast({
            title: '搜索内容不能为空',
            icon: 'none',
            time: 2000
        })
        return
    }
}
export { showModal, contentSearch }
// const formatTime = date => {
//   const year = date.getFullYear()
//   const month = date.getMonth() + 1
//   const day = date.getDate()
//   const hour = date.getHours()
//   const minute = date.getMinutes()
//   const second = date.getSeconds()

//   return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
// }

// const formatNumber = n => {
//   n = n.toString()
//   return n[1] ? n : '0' + n
// }

// module.exports = {
//   formatTime: formatTime
// }
