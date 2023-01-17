// app.js

App({
  onLaunch() {
    var that = this;
    // //自定义导航栏
    // //自定义导航栏 获取设备顶部窗口的高度（不同设备窗口高度不一样，根据这个来设置自定义导航栏的高度）
    // wx.getSystemInfo({
    //   success: (res) => {
    //     // 基础库 2.1.0 开始支持wx.getMenuButtonBoundingClientRect()，低版本需要适配
    //     let custom = wx.getMenuButtonBoundingClientRect()
    //     // console.log('状态栏高度',res.statusBarHeight)
    //     // console.log('右上角胶囊按钮的高度', custom.height)
    //     // console.log('右上角胶囊按钮的上边界坐标', custom.top)
    //     // console.log('右上角胶囊按钮的下边界坐标', custom.bottom)
    //     that.globalData.statusBarHeight = res.statusBarHeight
    //     that.globalData.navBarHeight = custom.height + (custom.top - res.statusBarHeight) * 2
    //   }
    // })

    // 展示本地存储能力
    // const logs = wx.getStorageSync('logs') || []
    // logs.unshift(Date.now())
    // wx.setStorageSync('logs', logs)

    // // 登录
    // wx.login({
    //   success: res => {
    //     // 发送 res.code 到后台换取 openId, sessionKey, unionId
    //   }
    // })
    
    //上来请求数据
    if (wx.getStorageSync('islogin') == true) {
      //get_login_info
      wx.request({
        url: 'http://192.168.21.128:8000/qz/get_login_info/',
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
          if (res.data["code"] == 4000) {
            wx.showToast({
              title: '密码错误请重新登录QAQ',
              icon: "error"
            });
            wx.setStorageSync('islogin', false);

          } else {
          wx.setStorageSync('cookiesstr', res.data);
          //请求时间信息
          wx.request({
            url: 'http://192.168.21.128:8000/qz/get_current_time/',
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
              that.globalData.current_time = res.data
              that.globalData.requestflag++;
              if (that.globalData.current_time["zc"] == null) {
                that.globalData.week_time = 1
                wx.setStorageSync('zc', that.globalData.week_time);
                
              }
              else{
                that.globalData.week_time = res.data["zc"]
                wx.setStorageSync('zc', that.globalData.week_time);
              }

            }
          })
          //请求课表数据
          wx.request({
            url: 'http://192.168.21.128:8000/qz/get_class_info/',
            method: 'POST',
            data: {
              account: wx.getStorageSync('useraccount'),
              password: wx.getStorageSync('userpws'),
              cookiesstr: wx.getStorageSync('cookiesstr'),
            },
            header: {
              'content-type': 'application/json'
            },
            success: (res) => {
              
              // 将课表传输到schedule_table
              if (res.data["code"] >= 4000) {
              }
              else{
                that.globalData.requestflag++;
                that.globalData.class_info = res.data
              }
            }
          })
          //请求学生信息
          wx.request({
            url: 'http://192.168.21.128:8000/qz/get_student_info/',
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
              that.globalData.requestflag++;
            }
          })
          //请求共享信息
          wx.request({
            url: 'http://192.168.21.128:8000/qz/get_share_state/',
            method: 'POST',
            data: {
              account: wx.getStorageSync('useraccount'),
              password: wx.getStorageSync('userpws')
            },
            header: {
              'content-type': 'application/json'
            },
            success: (res) => {
              if(res.data["code"] >= 4000){}
              else{
               
                that.globalData.set_all_data.CBindState= res.data["CBindState"]
                that.globalData.set_all_data.CBindNumber= res.data["CBindNumber"]
                that.globalData.set_all_data.GBindState = res.data["GBindState"]
                that.globalData.set_all_data.GBindNumber = res.data["GBindNumber"]

              }


            }
          })
        }
        },
        fail: (res) => {
          that.globalData.requestflag = 0
        }
      })
    }
  },
  onShow() {
    function isset(key) {
      //鉴别是否存在缓存
    let val = wx.getStorageSync(key)
    return val !== '' && val !== null & val !== undefined
   }
   if(isset('isshareshowclass')){wx.setStorageSync('isshareshowclass',true);}

  },


  globalData: {
    statusBarHeight: 0,//导航栏
    navBarHeight: 0,//导航栏
    userInfo: null,
    class_info: null, //课程信息
    student_info: null, //学生信息
    current_time: null, //时间信息
    week_time: 1, //第几周
    set_all_data: {
      isshareshowclass: wx.getStorageSync('isshareshowclass'), //是否显示分享
      isshareshowgrade:wx.getStorageSync('isshareshowgrade'),
      islogin: wx.getStorageSync('islogin'), //是否登录
      CBindState: 0,
      CBindNumber: -1,
      GBindState: 0,
      GBindNumber: -1
    }, 
    requestflag: 0,//判断请求状态
    xiaoguotest:false//小郭测试
  }

})