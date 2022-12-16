// app.js

App({
  onLaunch() {
    var that = this;
    //自定义导航栏
    //自定义导航栏 获取设备顶部窗口的高度（不同设备窗口高度不一样，根据这个来设置自定义导航栏的高度）
    wx.getSystemInfo({
      success: (res) => {
        // 基础库 2.1.0 开始支持wx.getMenuButtonBoundingClientRect()，低版本需要适配
        let custom = wx.getMenuButtonBoundingClientRect()
        // console.log('状态栏高度',res.statusBarHeight)
        // console.log('右上角胶囊按钮的高度', custom.height)
        // console.log('右上角胶囊按钮的上边界坐标', custom.top)
        // console.log('右上角胶囊按钮的下边界坐标', custom.bottom)
        that.globalData.statusBarHeight = res.statusBarHeight
        that.globalData.navBarHeight = custom.height + (custom.top - res.statusBarHeight) * 2
      }
    })

    // 展示本地存储能力
    const logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
      }
    })

    
    //上来请求数据
    if (wx.getStorageSync('islogin') == true) {
      //get_login_info
      wx.request({
        url: 'http://127.0.0.1:5000/get_login_info',
        method: 'POST',
        data: {
          account: wx.getStorageSync('useraccount'),
          password: wx.getStorageSync('userpws'),
        },
        header: {
          'content-type': 'application/json'
          //后端生成cookie然后请求的时候把cookie发过去，然后我们进行加工。
        },
        success: (res) => {
          if (res.data["code"] == 2002) {
            wx.setStorageSync('islogin', false);

          } else {

            wx.setStorageSync('cookiesstr', res.data);

          }
          //请求课表数据
          wx.request({
            url: 'http://127.0.0.1:5000/get_class_info',
            method: 'POST',
            data: {
              account: wx.getStorageSync('useraccount'),
              password: wx.getStorageSync('userpws'),
              cookiesstr: wx.getStorageSync('cookiesstr')
            },

            header: {
              'content-type': 'application/json'
              //后端生成cookie然后请求的时候把cookie发过去，然后我们进行加工。
            },
            success: (res) => {
              // 将课表传输到schedule_table
              if (res.data["token"] == "-1") {
                wx.setStorageSync('islogin', false);
              }
              that.globalData.class_info = res.data
            }
          })
          //请求学生信息
          wx.request({
            url: 'http://127.0.0.1:5000/get_student_info',
            method: 'POST',
            data: {
              account: wx.getStorageSync('useraccount'),
              password: wx.getStorageSync('userpws'),
              cookiesstr: wx.getStorageSync('cookiesstr')
            },

            header: {
              'content-type': 'application/json'
            },
            success: (res) => {
              if (res.data["token"] == "-1") {
                wx.setStorageSync('islogin', false);
              }
              that.globalData.student_info = res.data
            }
          })
          //请求时间信息
          wx.request({
            url: 'http://127.0.0.1:5000/get_current_time',
            method: 'POST',
            data: {
              account: wx.getStorageSync('useraccount'),
              password: wx.getStorageSync('userpws'),
              cookiesstr: wx.getStorageSync('cookiesstr')
            },
            header: {
              'content-type': 'application/json'
            },
            success: (res) => {
              if (res.data["token"] == "-1") {
                wx.setStorageSync('islogin', false);
              }
              that.globalData.current_time = res.data
              that.globalData.week_time = res.data["zc"]
              wx.setStorageSync('zc', that.globalData.week_time);

            }


          })

        },
        fail: (res) => {
          that.globalData.requestflag = false


        }
      })




    }




  },
  onShow() {
    function isset(key) {//鉴别是否存在缓存
    let val = wx.getStorageSync(key)
    return val !== '' && val !== null & val !== undefined
   }
   if(isset('isshareshow')){wx.setStorageSync('isshareshow',true);}
  },
  globalData: {
    statusBarHeight: 0,//导航栏
    navBarHeight: 0,//导航栏
    userInfo: null,
    class_info: null, //课程信息
    student_info: null, //学生信息
    current_time: null, //时间信息
    week_time: 0, //第几周
    set_all_data: {
      isbindshareflag: true, //是否绑定分享
      isshareshow: wx.getStorageSync('isshareshow'), //是否显示分享
      islogin: wx.getStorageSync('islogin') //是否绑定课表
    }, 
    requestflag: true //判断请求状态
  }

})