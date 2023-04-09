

const TotalUrl="http://192.168.21.128:8000"
export  function requestLoginInfo(account, password) {
  return new Promise((resolve, reject) => {
    wx.request({
      url: TotalUrl+'/qz/get_login_info/',
      method: 'POST',
      data: {
        account: account,
        password: password,
      },
      header: {
        'content-type': 'application/json'
      },
      success: (res) => {
        if (res.data["code"] == 4000) {
          reject("密码错误请重新登录QAQ");
        } else {
          wx.setStorageSync('cookiesstr', res.data);
          resolve(res.data);
        }
      },
      fail: (error) => {
        reject(error);
      }
    })
  })
}
export function requestCurrentTime(account, password, cookiesstr) {
  return new Promise((resolve, reject) => {
    wx.request({
      url: TotalUrl+'/qz/get_current_time/',
      method: 'POST',
      data: {
        account: account,
        password: password,
        cookiesstr: cookiesstr
      },
      header: {
        'content-type': 'application/json'
      },
      success: (res) => {
        resolve(res.data);
      },
      fail: (error) => {
        reject(error);
      }
    })
  })
}
export function requestClassInfo(account, password, cookiesstr) {
  return new Promise((resolve, reject) => {
    wx.request({
      url:TotalUrl+ '/qz/get_class_info/',
      method: 'POST',
      data: {
        account: account,
        password: password,
        cookiesstr: cookiesstr
      },
      header: {
        'content-type': 'application/json'
      },
      success: (res) => {
        resolve(res.data);
      },
      fail: (error) => {
        reject(error);
      }
    })
  })
}
export function requestStudentInfo(account, password, cookiesstr) {
  return new Promise((resolve, reject) => {
    wx.request({
      url: TotalUrl+'/qz/get_class_info/',
      method: 'POST',
      data: {
        account: account,
        password: password,
        cookiesstr: cookiesstr
      },
      header: {
        'content-type': 'application/json'
      },
      success: (res) => {
        resolve(res.data);
      },
      fail: (error) => {
        reject(error);
      }
    })
  })
}
export function requestShareState(account, password) {
  return new Promise((resolve, reject) => {
    wx.request({
      url: TotalUrl+'/qz/get_share_state/',
      method: 'POST',
      data: {
        account: account,
        password: password
      },
      header: {
        'content-type': 'application/json'
      },
      success: (res) => {
        resolve(res.data);
      },
      fail: (error) => {
        reject(error);
      }
    })
  })
}

