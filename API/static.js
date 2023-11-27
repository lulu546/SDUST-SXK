
const app = getApp()
// 封装的 Promise 化的函数
function getScheduleResource(page, limit) {
  return new Promise((resolve, reject) => {
    wx.request({
      url: app.globalData.TotalUrl+'/qz/static/',
      method: 'POST',
      data: {
		kind:1
      },
      success: (res) => {
        if (res.statusCode === 200) {
		  resolve(res.data);
		  app.globalData.scheduleResource=res.data
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
	getScheduleResource
}
  
