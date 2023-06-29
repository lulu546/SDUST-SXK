
const app = getApp()
function courselibcontent(coursename, teachername,page) {
  return new Promise((resolve, reject) => {
    wx.request({
      url: app.globalData.TotalUrl+'/qz/course-lib/',
      method: 'POST',
      data: {
        "coursename":coursename,
        "teachername":teachername,
        "page":page
      },
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        if (res.statusCode == 200) {
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
function courselibdetail(toweek, id) {
  return new Promise((resolve, reject) => {
    wx.request({
      url: app.globalData.TotalUrl+'/qz/course-lib/detail/',
      method: 'POST',
      data: {
        "toweek":toweek,
        "id":id
      },
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        if (res.statusCode == 200) {
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
  courselibcontent,
  courselibdetail

};
