// 请求api
export const request = (params) => {
    const baseURL = 'http://192.168.1.134:8091/api/wx'
    return new Promise((resolve, reject) => {
        wx.request({
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