// token是强智的token，一般放在头文件里；tokentoset是后端的token，一般放在请求参数里

const shareapi = require('../API/shareapi');
const apiUrl = "https://jwgl.sdust.edu.cn/app.do";
// 基础强智API
const app = getApp()
function login(account, password) {
  return new Promise((resolve, reject) => {
    wx.request({
      url: apiUrl,
      method: "GET",
      data: {
        method: "authUser",
        xh: account,
        pwd: password
      },
      header: {
        "Referer": "http://www.baidu.com",
        "Accept-encoding": "gzip, deflate, br",
        "Accept-language": "zh-CN,zh-TW;q=0.8,zh;q=0.6,en;q=0.4,ja;q=0.2",
        "Cache-control": "max-age=0"
      },
      success: function (res) {
        if (res.statusCode == 200 && res.data.flag == "1") {
          resolve(res.data.token);
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

function getHandle(params) {
  return new Promise((resolve, reject) => {
    wx.request({
      url: apiUrl,
      method: "GET",
      data: params,
      header: {
        "Referer": "http://www.baidu.com",
        "Accept-encoding": "gzip, deflate, br",
        "Accept-language": "zh-CN,zh-TW;q=0.8,zh;q=0.6,en;q=0.4,ja;q=0.2",
        "Cache-control": "max-age=0",
        token: wx.getStorageSync('token')
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

function getStudentInfo(account) {
  const params = {
    method: "getUserInfo",
    xh: account
  };
  return getHandle(params);
}

function getCurrentTime() {
  const params = {
    method: "getCurrentTime",
    currDate: new Date().toISOString().slice(0, 10)
  };
  return getHandle(params);
}

function getClassInfo(account, xnxqh, zc = 1) {

  const params = {
    method: "getKbcxAzc",
    xnxqid: xnxqh,
    zc: zc,
    xh: account
  };
  return getHandle(params);

}

function getClassroomInfo(idleTime) {
  const params = {
    method: "getKxJscx",
    time: new Date().toISOString().slice(0, 10),
    idleTime: idleTime
  };
  return getHandle(params);
}

function getGradeInfo(account, sy = "") {
  const params = {
    method: "getCjcx",
    xh: account,
    xnxqid: sy
  };
  return getHandle(params);
}

function getExamInfo(account) {
  const params = {
    method: "getKscx",
    xh: account
  };
  return getHandle(params);
}

// 从强智系统登录
function init_data(account, pwd) {
  
  if (wx.getStorageSync('islogin') == true) {
    app.globalData.todatabasesflag=0;
    app.globalData.requestflag=0;
    var account=wx.getStorageSync('useraccount')
    var pwd=wx.getStorageSync('userpws');

    //客户端登录
      wx.request({
        url: 'https://jwgl.sdust.edu.cn/app.do',
        method: 'GET',
        data: {
          "method": "authUser",
          "xh": account,
          "pwd": pwd
        },
        header: {
    
          "Referer": "http://www.baidu.com",
          "Accept-encoding": "gzip, deflate, br",
          "Accept-language": "zh-CN,zh-TW;q=0.8,zh;q=0.6,en;q=0.4,ja;q=0.2",
          "Cache-control": "max-age=0",
          token: wx.getStorageSync('token')
        },
        success: (res) => {
          if (res.data["flag"] != "1") {
            wx.showToast({
              title: '登录失败',
              icon: "error"
            });
            wx.setStorageSync('islogin', false);
          } else {
    
            wx.setStorageSync('token', res.data["token"]);
            only_data(account)
    
          }
        },
        fail: (res) => {
          app.globalData.requestflag = 0
          app.globalData.todatabasesflag = 0
        }
      })
      



  }
  else{
    wx.navigateTo({
      url: "../pages/Login/LoginContent/logincontent"
      //登录
    })
  }
  
 

}
// 从强智系统获取时间信息，学生信息，课表信息并在后端登录并发送学生信息至后端
function only_data(account) {

      //请求时间信息然后请求课表信息
      wx.request({
        url: 'https://jwgl.sdust.edu.cn/app.do',
        method: 'get',
        data: {
          method: "getCurrentTime",
          currDate: new Date().toISOString().slice(0, 10)
        },
        header: {

          "Referer": "http://www.baidu.com",
          "Accept-encoding": "gzip, deflate, br",
          "Accept-language": "zh-CN,zh-TW;q=0.8,zh;q=0.6,en;q=0.4,ja;q=0.2",
          "Cache-control": "max-age=0",
          token: wx.getStorageSync('token')
        },
        success: (res) => {
          app.globalData.current_time = res.data

          if (app.globalData.current_time["zc"] == null) {
            app.globalData.week_time = 20
          }
          else {
            app.globalData.week_time = res.data["zc"]
          }
        
    
          // 请求课表数据
          wx.request({
            url: 'https://jwgl.sdust.edu.cn/app.do',
            method: 'GET',
            data: {
              method: "getKbcxAzc",
              xnxqid: res.data["xnxqh"],
              zc: res.data["zc"],
              xh: account
            },
            header: {
              "Referer": "http://www.baidu.com",
              "Accept-encoding": "gzip, deflate, br",
              "Accept-language": "zh-CN,zh-TW;q=0.8,zh;q=0.6,en;q=0.4,ja;q=0.2",
              "Cache-control": "max-age=0",
              token: wx.getStorageSync('token')
            },
            success: (res) => {

              // 将课表传输到schedule_table
                app.globalData.requestflag++;
                var resjson=res.data;
                const tableformat = require('../utils/table');
                app.globalData.class_info = tableformat.processTableOrd(resjson);
                app.globalData.table_ord=resjson;
          
   
            }
          })
        }
      })
      //请求学生信息
      wx.request({
        url: "https://jwgl.sdust.edu.cn/app.do",
        method: 'GET',
        data: {
          method: "getUserInfo",
          xh: account
        },

        header: {
          "Referer": "http://www.baidu.com",
          "Accept-encoding": "gzip, deflate, br",
          "Accept-language": "zh-CN,zh-TW;q=0.8,zh;q=0.6,en;q=0.4,ja;q=0.2",
          "Cache-control": "max-age=0",
          token: wx.getStorageSync('token')
        },
        success: (res) => {
          if (res.data["token"] == "-1") {
            wx.setStorageSync('islogin', false);
          }
          app.globalData.student_info = res.data
          app.globalData.requestflag++;
          var content=res.data
          wx.login({
            success: function(res) {
              if (res.code) {  //wx.login获取code。
                console.log(res.code);
                //发起网络请求
                wx.request({
                  url: app.globalData.TotalUrl+'/qz/login-info/',
                  method:'POST',
                  //向后端发送的数据
                  data: {
                    code: res.code,    //将code发送到后台服务器。
                    snumber: content["xh"],  //替换为实际的账号值
                    name: content["xm"],        //替换为实际的姓名值
                    classname: content["bj"], //替换为实际的班级名值
                    majorname: content["zymc"], //替换为实际的专业名值
                    collegename: content["yxmc"], //替换为实际的学院名值
                    enteryear: content["rxnf"], //替换为实际的入学年份值
                    gradenumber: content["usertype"], //替换为实际的年级号值
                  },
                  header: { 
                    "Referer": "http://www.baidu.com",
                    "Accept-encoding": "gzip, deflate, br",
                    "Accept-language": "zh-CN,zh-TW;q=0.8,zh;q=0.6,en;q=0.4,ja;q=0.2",
                    "Cache-control": "max-age=0",
                }, success: (res) => {
                  
                  
                  if(res.data['status']=="success"){
                    app.globalData.todatabasesflag++;
                    wx.setStorageSync('tokentoset', res.data["token"]);
                  }
               
                
                }
                })
              } else {
                console.log('获取用户登录态失败！' + res.errMsg)
              }
            }
            
          });
        }
        
      })

  }
// 发送课程信息至后端
function postclass(week_ordinal=app.globalData.week_time,table_ord=app.globalData.table_ord) {
  if(!table_ord){
    wx.showToast({
      title: '强智未返回课表',
      icon: "error"
    });
  }
  wx.request({
    url: app.globalData.TotalUrl+'/qz/class-info/',
    method:'POST',
    //向后端发送的数据
    data: {
      table_ord : table_ord,
      token :  wx.getStorageSync('tokentoset'),
      snumber: wx.getStorageSync('useraccount'),
      week:week_ordinal
    },
    header: { 
      "Referer": "http://www.baidu.com",
      "Accept-encoding": "gzip, deflate, br",
      "Accept-language": "zh-CN,zh-TW;q=0.8,zh;q=0.6,en;q=0.4,ja;q=0.2",
      "Cache-control": "max-age=0",
  }, success: (res) => {
    if(res.data['status']=="success")app.globalData.todatabasesflag++;
    
  
  }
  })
}

// 读取第n周课程信息并存储至后端
function getpostclass(week_ordinal) {
// 从强智系统读取第week_ordinal周课程信息
  wx.request({
    url: 'https://jwgl.sdust.edu.cn/app.do',
    method: 'GET',
    data: {
      method: "getKbcxAzc",
      xnxqid: app.globalData.current_time["xnxqh"],
      zc: week_ordinal,
      xh: wx.getStorageSync('useraccount')
    },
    header: {
      "Referer": "http://www.baidu.com",
      "Accept-encoding": "gzip, deflate, br",
      "Accept-language": "zh-CN,zh-TW;q=0.8,zh;q=0.6,en;q=0.4,ja;q=0.2",
      "Cache-control": "max-age=0",
      token: wx.getStorageSync('token')
    },
    success: (res) => {
      if (res.statusCode == 200){
      // 发送课程信息至后端
      wx.request({
        url: app.globalData.TotalUrl+'/qz/class-info/',
        method:'POST',
        //向后端发送的数据
        data: {
          table_ord : res.data,
          token :  wx.getStorageSync('tokentoset'),
          snumber: wx.getStorageSync('useraccount'),
          week:week_ordinal
        },
        header: { 
          "Referer": "http://www.baidu.com",
          "Accept-encoding": "gzip, deflate, br",
          "Accept-language": "zh-CN,zh-TW;q=0.8,zh;q=0.6,en;q=0.4,ja;q=0.2",
          "Cache-control": "max-age=0",
      }, success: (res) => {
       
        
      
      }
      })

      }

    }
  })
}

// 从强智系统读取考试信息
function getexam() {

  return new Promise((resolve, reject) => {
    getExamInfo(wx.getStorageSync('useraccount')).then(res => {
      // 返回读取的考试数据
     resolve(res);
    }
    )
  });

}



module.exports = {
  login,
  getStudentInfo,
  getCurrentTime,
  getClassInfo,
  getClassroomInfo,
  getGradeInfo,
  getExamInfo,
  init_data,
  only_data,
  postclass,
  getpostclass,
  getexam
};
