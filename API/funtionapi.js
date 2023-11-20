
const app = getApp()
// 课程库大概
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
// 课程库细节
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
// 同好群
/**
 * 查询同好群
 * @param {社团名} likename 
 */
function getLikesGroup(likename,page){
  return new Promise((resolve, reject) => {
    wx.request({
      url: app.globalData.TotalUrl+'/qz/phonebook/likes/get/',
      method: 'POST',
      data: {
        "likename":likename,
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




module.exports = {
  courselibcontent,
  courselibdetail,
  getLikesGroup

};
