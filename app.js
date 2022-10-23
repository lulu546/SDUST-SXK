// app.js

App({
  onLaunch() {
    
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
    
   
 
    

  },
  onShow(){
    var that=this;
    //上来请求数据
    if(wx.getStorageSync('islogin')==true){
    
      wx.request({
        url: 'http://127.0.0.1:5000/get_login_info',
        method:'POST',
        data:{
          account:wx.getStorageSync('useraccount'),
          password:wx.getStorageSync('userpws'),
        },
  
        header:{
          'content-type':'application/json'      
          //后端生成cookie然后请求的时候把cookie发过去，然后我们进行加工。
        },
        success: (res) => {
          // 将用户的cookie存入至本地
          console.log(res.data)
          wx.setStorageSync('cookiesstr', res.data); 
        },
        fail: (res) => {
          //清楚登录状态
          console.log(res.data)
          wx.setStorageSync('islogin',false); 
        }

      })
      //请求课表数据
      if(wx.getStorageSync('islogin')==true){
      wx.request({
        url: 'http://127.0.0.1:5000/get_class_info',
        method:'POST',
        data:{
          account:wx.getStorageSync('useraccount'),
          password:wx.getStorageSync('userpws'),
          cookiesstr:wx.getStorageSync('cookiesstr')
        },
  
        header:{
          'content-type':'application/json'      
          //后端生成cookie然后请求的时候把cookie发过去，然后我们进行加工。
        },
        success: (res) => {
          // 将课表传输到schedule_table
          that.globalData.class_info=res.data
        },
        fail: (res) => {
          //清楚登录状态
          console.log(res.data)
          wx.setStorageSync('islogin',false); 

        }

      })
      //请求学生信息
      wx.request({
        url: 'http://127.0.0.1:5000/get_student_info',
        method:'POST',
        data:{
          account:wx.getStorageSync('useraccount'),
          password:wx.getStorageSync('userpws'),
          cookiesstr:wx.getStorageSync('cookiesstr')
        },
  
        header:{
          'content-type':'application/json'      
        },
        success: (res) => {
          that.globalData.student_info=res.data
        },
        fail: (res) => {
          //清楚登录状态
          console.log(res.data)
          wx.setStorageSync('islogin',false); 
        }

      })
      //请求时间信息
      wx.request({
        url: 'http://127.0.0.1:5000/get_current_time',
        method:'POST',
        data:{
          account:wx.getStorageSync('useraccount'),
          password:wx.getStorageSync('userpws'),
          cookiesstr:wx.getStorageSync('cookiesstr')
        },
        header:{
          'content-type':'application/json'      
        },
        success: (res) => {
          that.globalData.current_time=res.data
          that.globalData.week_time=res.data["zc"]

        },
        fail: (res) => {
          //清楚登录状态
          console.log(res.data)
          wx.setStorageSync('islogin',false); 
        }

      })

    }
  
  }

  },
  globalData: {
    userInfo: null,
    class_info:null,//课程信息
    student_info:null,//学生信息
    current_time:null,//时间信息
    week_time:'N',    //第几周
    set_all_data:{
      isbindshareflag:true,                        //是否绑定分享
      isshareshow:true,                            //是否显示分享
      islogin:wx.getStorageSync('islogin')         //是否绑定课表
    }
  }
  
})
