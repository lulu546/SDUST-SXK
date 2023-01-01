Page({
  /**
   * BUG
   * 1.显示字体格式大小不规范
   */
  /**
   * 页面的初始数据
   */
  data: {
    nowtimes: {
      month: new Date().getMonth() + 1 < 10 ? '0' + (new Date().getMonth() + 1) : new Date().getMonth() + 1,
      day: new Date().getDate() < 10 ? '0' + new Date().getDate() : new Date().getDate(),
      hour: new Date().getHours() < 10 ? '0' + new Date().getHours() : new Date().getHours(),
      minutes: new Date().getMinutes() < 10 ? '0' + new Date().getMinutes() : new Date().getMinutes(),
    },
    weekwhat: "几",
    week_ordinal: 0,
    courseflag: true,//这个只区分上完课了没有，如果时间上上玩了课，这个就是flase，没有课是默认上万
    now_course: {},
    courseover_onesencontent: "(//▽//)",
    coursetimei: 2,
    requestflag:null,
    coursetime: [{
        timebegin: "08:00",
        timeend: "09:50"
      },
      {
        timebegin: "10:10",
        timeend: "12:00"
      },
      {
        timebegin: "14:00",
        timeend: "15:50"
      },
      {
        timebegin: "16:10",
        timeend: "18:00"
      },
      {
        timebegin: "19:00",
        timeend: "21:00"
      },
      {}

    ],
    set_schedule: {}
  },


  /**
   * 生命周期函数--监听页面加载
   */
  onReady() {
    
    

  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onLoad(options) {

    const app = getApp()
    var that = this;
    //计划表的读取
    //如果全局变量其
    if(app.globalData.xiaoguotest == true){
      var week_ordinal   = app.globalData.week_time;
      var requestflag    = app.globalData.requestflag;
      var table_schedule = app.globalData.class_info;
      that.setData({
        week_ordinal,
        requestflag,
        table_schedule,
        requestflag:true
      })
    
    }
    else{
    //数据的基本读取，如果app中没有读取的话会激活这里。已经登录但是请求失败的情况
    if (wx.getStorageSync('islogin') == true && app.globalData.class_info == null) {
      app.globalData.set_all_data = {
        isshareshow: wx.getStorageSync('isshareshow'), //是否显示分享
        islogin: wx.getStorageSync('islogin') //是否绑定课表
      }
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
          // 将用户的cookie存入至本地
          if (res.data["code"] == 2002) {
            wx.setStorageSync('islogin', false);
            
          } else {  
            wx.setStorageSync('cookiesstr', res.data);
          }
          if (wx.getStorageSync('islogin') == true) {
            //请求课程
            wx.request({
              url: 'http://192.168.21.128:8000/qz/get_class_info/',
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
                app.globalData.class_info = res.data
                var table_schedule = app.globalData.class_info;
                that.setData({
                  table_schedule
                })
              },
    
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
                app.globalData.student_info = res.data
                
                
              }
    
            })
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
                app.globalData.current_time = res.data
                app.globalData.week_time = res.data["zc"]
                wx.setStorageSync('zc',app.globalData.week_time);
                var week_ordinal = app.globalData.week_time;
                var requestflag=app.globalData.requestflag;

                that.setData({
                  week_ordinal,
                  requestflag
                })
                
              }
         
    
            })
    
          }

        },
        fail: (res) =>{
            that.setData({
              requestflag:false
              })
        }
      })
    }
    else{
      var table_schedule = app.globalData.class_info;
      var week_ordinal = app.globalData.week_time;
      var requestflag=app.globalData.requestflag;
      that.setData({
        week_ordinal,
        table_schedule,
        requestflag
      })
    }
    }


    //渲染周几
    var weekArray = new Array("日", "一", "二", "三", "四", "五", "六")
    var weeknumber = new Date().getDay();
    var week = weekArray[weeknumber] //判断今天周几
    var set_schedule = app.globalData.set_all_data;
    
    
    if (weeknumber == 0) {
      weeknumber = 7
    }
    weeknumber--;
    this.setData({
      weekwhat: week,
      
      nowtimes: {
        month: new Date().getMonth() + 1 < 10 ? '0' + (new Date().getMonth() + 1) : new Date().getMonth() + 1,
        day: new Date().getDate() < 10 ? '0' + new Date().getDate() : new Date().getDate(),
        hour: new Date().getHours() < 10 ? '0' + new Date().getHours() : new Date().getHours(),
        minutes: new Date().getMinutes() < 10 ? '0' + new Date().getMinutes() : new Date().getMinutes(),
      },
      set_schedule

    })

    

    var coursetime_i = 0; //显示的时间点
    var nowhour = parseInt(that.data.nowtimes.hour);
    var nowminutes = parseInt(that.data.nowtimes.minutes); //数字后时间
    var course = {}; //显示的课程
    //进行couse赋值，显示课程的函数
    let Once_Couse = () => {
      if ((nowhour < 9 || (nowhour == 9 && nowminutes < 50))) {
        coursetime_i = 0;

      } else if (((nowhour == 9 && nowminutes >= 50) || (nowhour > 9 && nowhour < 12))) {
        coursetime_i = 1;
      } else if (((nowhour == 15 && nowminutes < 50) || (nowhour > 12 && nowhour < 15))) {
        coursetime_i = 2;

      } else if (((nowhour == 15 && nowminutes >= 50) || (nowhour > 15 && nowhour < 18))) {
        coursetime_i = 3;

      } else if (((nowhour == 21 && nowminutes < 50) || (nowhour >= 18 && nowhour < 21))) {
        coursetime_i = 4;


      }
      if (nowhour > 21) {
        coursetime_i = 5;
        //结束今天课
      }
      if(that.data.table_schedule!=undefined){
      while (1) {
        if (coursetime_i == 5) {
          that.setData({
            courseflag: false
          });
          break;
        }
        if (that.data.table_schedule[weeknumber][coursetime_i][0].length > 0) {
          course = that.data.table_schedule[weeknumber][coursetime_i]
          break;
        } else if (coursetime_i <= 5) coursetime_i++
      }}

      that.setData({
        nowtimes: {
          month: new Date().getMonth() + 1 < 10 ? '0' + (new Date().getMonth() + 1) : new Date().getMonth() + 1,
          day: new Date().getDate() < 10 ? '0' + new Date().getDate() : new Date().getDate(),
          hour: new Date().getHours() < 10 ? '0' + new Date().getHours() : new Date().getHours(),
          minutes: new Date().getMinutes() < 10 ? '0' + new Date().getMinutes() : new Date().getMinutes(),
        },
        coursetimei: coursetime_i,
        now_course: course,


      });

    }
    Once_Couse()
    if(that.data.table_schedule==undefined){//等课表读出来后再进行ONCE_COUSE函数。
      setInterval(function(){

        Once_Couse()
  
      }, 10);
    }
    // 启动计时器
    else setInterval(function(){

      Once_Couse()

    }, 1000);

  },
  
  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  },
  /**
   * 点击函数
   */
  turn_crouselist(e) {


    wx.navigateTo({
      url: "../../Function/Schedule/ScheduleContent/schedulecontent"
    })

  },
  turn_bind(e) {
    wx.navigateTo({
      url: "../../Login/LoginContent/logincontent"
      //登录
    })
  }

  // 时间函数



})