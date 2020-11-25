// 请求api
export const request = (params) => {
    const baseURL = 'http://192.168.1.134:8091/api'
    return new Promise((resolve, reject) => {
        wx.request({
            ...params,
            url: baseURL + params.url,
            success(res) {
                resolve(res);
            },
            fail(error) {
                reject(error);
            }
        })
    }
    )
}