
const app = getApp()
function postsharestate(postnum, cont,cancel) {
  return new Promise((resolve, reject) => {
    wx.request({
      url: app.globalData.TotalUrl+'/qz/share-state/post/',
      method: 'POST',
      data: {
        "account": wx.getStorageSync('useraccount'),
        "cont":cont,
        "cancel":cancel,
        "postnum": postnum,
        "token" :  wx.getStorageSync('tokentoset')
      },
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        if (res.statusCode == 200) {
          wx.request({
            url: app.globalData.TotalUrl+'/qz/share-state/',
            method: 'POST',
            data: {
              "account": wx.getStorageSync('useraccount'),
              "token" :  wx.getStorageSync('tokentoset')
            },
            header: {
              'content-type': 'application/json'
            },
            success: (res) => {
              if (res.statusCode == 200) {
                app.globalData.sharedata=res.data
              } 
              resolve(res)
            }
          });
        } else {
          reject(res);
        }
      },
      fail: function (res) {
        reject(res);
      }
    });
  });
}
function replysharestate(postnum, cont,reply) {
  return new Promise((resolve, reject) => {
    wx.request({
      url: app.globalData.TotalUrl+'/qz/share-state/post/',
      method: 'POST',
      data: {
        "account": wx.getStorageSync('useraccount'),
        "cont":cont,
        "reply":reply,
        "postnum": postnum,
        "token" :  wx.getStorageSync('tokentoset')
      },
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        if (res.statusCode == 200) {
          wx.request({
            url: app.globalData.TotalUrl+'/qz/share-state/',
            method: 'POST',
            data: {
              "account": wx.getStorageSync('useraccount'),
              "token" :  wx.getStorageSync('tokentoset')
            },
            header: {
              'content-type': 'application/json'
            },
            success: (res) => {
              if (res.statusCode == 200) {
                app.globalData.sharedata=res.data
              } 
              resolve(res)
            }
          });
        } else {
          reject(res);
        }

      },
      fail: function (res) {
        reject(res);
      }
    });
  });
}
function sharestate() {
  return new Promise((resolve, reject) => {
    wx.request({
      url: app.globalData.TotalUrl+'/qz/share-state/',
      method: 'POST',
      data: {
        "account": wx.getStorageSync('useraccount'),
        "token" :  wx.getStorageSync('tokentoset')
      },
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        if (res.statusCode == 200) {
          app.globalData.sharedata=res.data
          resolve(res.data);
        } else {
          reject(res);
        }
      },
      fail: function (res) {
        reject(res);
      }
    });
  });
}



module.exports = {
  postsharestate,
  sharestate,
  replysharestate
};
