
const app = getApp()
// 封装的 Promise 化的函数
function getFoodItems(page, limit) {
  return new Promise((resolve, reject) => {

    wx.request({
      url: app.globalData.TotalUrl+'/qz/food-lib/kind/',
      method: 'POST',
      data: {
        token :  wx.getStorageSync('tokentoset'),
        account: wx.getStorageSync('useraccount'),
      },
      success: (res) => {
        if (res.statusCode === 200) {
          resolve(res.data);
        } else {
          reject(new Error(`请求失败，状态码：${res.statusCode}`));
        }
      },
      fail: (error) => {
        reject(error);
      }
    });
  });
}

module.exports={
  getFoodItems
}
  
