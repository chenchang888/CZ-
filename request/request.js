// 请求api
export const request = (params) => {
    // const baseURL = 'http://192.168.1.134:8091/api'
    // const baseURL ="http://111.231.118.153:9034/api"
    // const baseURL = "http://111.231.83.49:9030/api"
    const baseURL = "https://chuzxcx.ahegov.com/api"
    // const baseURL = "https://chuz.ahzwfw.gov.cn/api"
    const token = wx.getStorageSync('token') || ''
    return new Promise((resolve, reject) => {
        wx.showLoading({
            title: '加载中',
        })
        wx.request({
            ...params,
            url: baseURL + params.url,
            header: {
                "openid": token
            },
            success(res) {
                if (res.data.code === 200) {
                    resolve(res);
                    wx.hideLoading()
                    return
                }
                wx.showToast({
                    title: '请求错误',
                    icon: 'none',
                    duration: 2000
                })
            },
            fail(error) {
                reject(error);
                wx.showToast({
                    title: '请求出错',
                    icon: 'none',
                    duration: 2000
                })
            }
        })
    }
    )
}