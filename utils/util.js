import { request } from "../request/request"
// 检验是否登录
const showModal = () => {
    wx.showModal({
        title: '提示',
        content: '您还未授权用户信息，是否登录授权',
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
// 检验登录
const authorLogin = (getAuthShow) => {
    wx.checkSession({
        success() {
            //session_key 未过期，并且在本生命周期一直有效
            getAuthShow.getAuthShow();
        },
        fail() {
            // session_key 已经失效，需要重新执行登录流程
            wx.showModal({
                title: "提示",
                content: "您还未登陆，是否登录",
                success(res) {
                    if (res.confirm) {
                        console.log('点击了确定');
                        // 调用登录api
                        loginApi(getAuthShow);
                    } else if (res.cancel) {
                        console.log('点击了取消');
                        wx.navigateBack({
                            delta: 1
                        });
                    }
                },
            }) //重新登录
        }
    })
}

// 登录api
const loginApi = (e) => {
    const { nickName, gender, language, country, city, province, avatarUrl } = e.detail.userInfo
    // const userInfo = e.detail.userInfo
    // 登录
    wx.login({
        async success(res) {
            console.log(res);
            if (res.code) {
                //发起网络请求
                const val = await request({
                    url: "/personal/wxLogin",
                    method: 'post',
                    data: {
                        code: res.code,
                        avatarUrl,
                        nickName
                    }
                })
                if (val.data.code === 200) {
                    const openId = val.data.msg
                    wx.setStorageSync("openId", openId)
                    wx.showToast({
                        title: '登录成功！',
                        icon: 'success',
                        duration: 2000
                    })
                }
            } else {
                console.log('登录失败！' + val.errMsg)
                wx.showToast({
                    title: '登录失败！',
                    icon: 'none',
                    duration: 2000
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
export { showModal, contentSearch, authorLogin, loginApi }
const formatTime = date => {
    const year = date.getFullYear()
    const month = date.getMonth() + 1
    const day = date.getDate()
    const hour = date.getHours()
    const minute = date.getMinutes()
    const second = date.getSeconds()

    return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatNumber = n => {
    n = n.toString()
    return n[1] ? n : '0' + n
}

// module.exports = {
//   formatTime: formatTime
// }
