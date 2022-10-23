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
    week_ordinal:0,
    courseflag: true,
    now_course: {
    },
    courseover_onesencontent:"(//▽//)",
     coursetimei: 2,
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
    set_schedule:{}




  },


  /**
   * 生命周期函数--监听页面加载
   */
  onReady()  {



  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
 onLoad(options) {

  const app = getApp()

         var that=this;
        //渲染周几
        var weekArray = new Array("日", "一", "二", "三", "四", "五", "六")
        var weeknumber = new Date().getDay();
        var week = weekArray[weeknumber] //判断今天周几

        var table_schedule = app.globalData.class_info;
        
        var set_schedule=app.globalData.set_all_data;
        
        var week_ordinal = app.globalData.week_time;
        if (weeknumber == 0){
          weeknumber = 7
        }
        weeknumber--;
        this.setData({
          weekwhat: week,
          week_ordinal:week_ordinal,
          nowtimes: {
            month: new Date().getMonth() + 1 < 10 ? '0' + (new Date().getMonth() + 1) : new Date().getMonth() + 1,
            day: new Date().getDate() < 10 ? '0' + new Date().getDate() : new Date().getDate(),
            hour: new Date().getHours() < 10 ? '0' + new Date().getHours() : new Date().getHours(),
            minutes: new Date().getMinutes() < 10 ? '0' + new Date().getMinutes() : new Date().getMinutes(),
          },
          set_schedule
    
        })
        
        

        var coursetime_i = 0;//显示的时间点
        var nowhour = parseInt(that.data.nowtimes.hour);
        var nowminutes = parseInt(that.data.nowtimes.minutes);//数字后时间
        var course = {};//显示的课程
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
          
          while (1) {
              if(coursetime_i==5){
                that.setData({
                  courseflag:false
                });
                break;
              }
              if (table_schedule[weeknumber][coursetime_i][0].length>0) {
                course = table_schedule[weeknumber][coursetime_i]
                break;
              } else if (coursetime_i <= 5) coursetime_i++
            }
  
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
    
        // 启动计时器
        setInterval(function () {

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
      url: "../../pages/ScheduleShare/Schedule/ScheduleShare"
    })

  },
  turn_bind(e){
    wx.navigateTo({
       url: "../../pages/login/login"
      //登录
    })
  }

  // 时间函数



})