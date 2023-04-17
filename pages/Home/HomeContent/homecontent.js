const app = getApp()
const api = require('../../../API/qzapi');
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
      month: '',
      day: '',
      hour: '',
      minutes: ''
    },
    weekwhat: '',
    week_ordinal: 0,
    courseflag: false,
    now_course: {},
    courseover_onesencontent: "(//▽//)",
    coursetimei: 2,
    requestflag: 0,
    timeTable: [
      { timebegin: "08:00", timeend: "09:50" },
      { timebegin: "10:10", timeend: "12:00" },
      { timebegin: "14:00", timeend: "15:50" },
      { timebegin: "16:10", timeend: "18:00" },
      { timebegin: "19:00", timeend: "21:00" }
    ],
    schedule: {}
  
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

    
    var that = this;
    //计划表的读取
    //如果全局变量其
    //渲染星期
    var weekArray = new Array("日", "一", "二", "三", "四", "五", "六")
    var weeknumber = new Date().getDay();
    var week = weekArray[weeknumber] //判断今天周几
    var set_schedule = app.globalData.set_all_data;
    
    if (weeknumber == 0) {
      weeknumber = 7
    }
    weeknumber--;
    that.setData({
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
// --------------------------计时器函数--------------------------
    //Once_Couse即进行couse赋值，显示下节课的课程
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
      if(that.data.requestflag==2){
        // 如果课表返回的是[null]那就会执行[0]==null，如果返回的是一个多重数组其不会执行，因为其[0]！=null。
        // 然后这个放到这里面执行的原因是，需要等他从app中请求数据完毕后才能执行。
        if(that.data.table_schedule!=null){
          if(that.data.table_schedule[0]==null){
            if (that.data.courseflag==true){
            that.setData({
              courseflag: false
            });}
          }
          else{
            while (1) {
              if (coursetime_i == 5) {
                that.setData({
                  courseflag: false
                });
                break;
              }
              if (that.data.table_schedule[weeknumber][coursetime_i][0].length!=0) {
                course = that.data.table_schedule[weeknumber][coursetime_i]
                that.setData({
                  courseflag: true
                });
                break;
              } else if (coursetime_i <= 5){ coursetime_i++;
              
              }
            }
          }
        }

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
// --------------------------计时器函数--------------------------
    Once_Couse()
    //等课表读取成功后再进行ONCE_COUSE函数。 
    if(that.data.table_schedule==undefined){
      setInterval(function(){
        Once_Couse()
      }, 10);
    }
    else setInterval(function(){

      Once_Couse()

    }, 1000);

  },
  
  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {
    var that=this;
    var islogin=wx.getStorageSync('islogin');
    if(islogin != that.data.set_schedule[islogin]){
      app.globalData.set_all_data.islogin=islogin;
      that.setData({
        ['set_schedule.islogin']:islogin
      })
    }

    //TODO 计时器，检测是否请求成功；
    var read=setInterval(function(){
      if(app.globalData.requestflag==2){
        var table_schedule = app.globalData.class_info;
        var week_ordinal = app.globalData.week_time;
        var requestflag=app.globalData.requestflag;
          that.setData({
            week_ordinal,
            table_schedule,
            requestflag
          })
          clearTimeout(read);
      }
    }, 100);
    
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

    // 下拉刷新请求
    if (wx.getStorageSync('islogin') == true) {
      if(app.globalData.requestflag>0&&app.globalData.requestflag<2){
        api.only_data(wx.getStorageSync('useraccount'))
      }
    else{     
       api.init_data(wx.getStorageSync('useraccount'),wx.getStorageSync('userpws'))


    }
     
                
      
     
      
    }
    else{
      wx.navigateTo({
        url: "../../Login/LoginContent/logincontent"
        //登录
      })
    }
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
  },




})