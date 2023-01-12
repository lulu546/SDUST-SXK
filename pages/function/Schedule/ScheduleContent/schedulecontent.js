// pages/prime/Page.js
/*
问题：
✔请求+渲染时间感知性太强
  1.将数据缓存在本地。
  已解决：有bug所以导致其时间缓慢
？共享课表
  1.目前采取的串行请求方式等会改成并行+定时器检测；
  2.共享课表渲染问题，会有两个人都没课的渲染和一个人没课的渲染不一样；
  3.add与刷新在共享课表的不同
  4.一打开共享课表就会自动请求当前课程
  ?按键的动画效果
✖新加课表功能
✖绑定共享课表功能
✔共享课表功能
  */
 Page({

  /**
   * 页面的初始数据
   */
  data: {
    nowtimes:{
      month:new Date().getMonth()< 10 ? '0' +(new Date().getMonth()+1) :new Date().getMonth()+1,
      day:new Date().getDate()< 10 ? '0' +new Date().getDate() :new Date().getDate(),
      hour:new Date().getHours()< 10 ? '0' +new Date().getHours() :new Date().getHours(),
      minutes:new Date().getMinutes()< 10 ? '0' +new Date().getMinutes() :new Date().getMinutes()
   },
   week_ordinal:0,//当前第几周
   shareflag:true,//这个是用于页面判断的默认项
   weekday:[],//一周的日期
   checked_value:false,//控制共享课表按钮是否打开
  /* ————————————————————————————*/ 
  //  此数据需要后端调取，其数据格式是[0]
  table1:[],
  table2:[
    [
      [
        "数据库系统3如3人2二维热无",
        "J7-111室",
        "何明祥",
        "#686789",
        []
        ],
    [
    "数据结构",
    "Js1-419室",
    "贾瑞生",
    "#849B91",
    []
    ],
    [
    [],
    [],
    [],
    [],
    []
    ],
    [
    [],
    [],
    [],
    [],
    []
    ],
    [
    [],
    [],
    [],
    [],
    []
    ]
    ],
    [
    [
    [],
    [],
    [],
    [],
    []
    ],
    [
    "大学物理（B）（2-2）",
    "J1-318室",
    "李照鑫",
    "#B4746B",
    []
    ],
    [
    [],
    [],
    [],
    [],
    []
    ],
    [
    [],
    [],
    [],
    [],
    []
    ],
    [
    "数据结构实验",
    "J13-332室",
    "贾瑞生",
    "#99857E",
    []
    ]
    ],
    [
    [
    [],
    [],
    [],
    [],
    []
    ],
    [
    "数据库系统",
    "J7-111室",
    "何明祥",
    "#686789",
    []
    ],
    [
    [],
    [],
    [],
    [],
    []
    ],
    [
    [],
    [],
    [],
    [],
    []
    ],
    [
    "数据结构",
    "J7-111室",
    "贾瑞生",
    "#849B91",
    []
    ]
    ],
    [
    [
    [],
    [],
    [],
    [],
    []
    ],
    [
    "大学物理（B）（2-2）",
    "J1-320室",
    "李照鑫",
    "#B4746B",
    []
    ],
    [
    [],
    [],
    [],
    [],
    []
    ],
    [
    [],
    [],
    [],
    [],
    []
    ],
    [
      "数据库系统",
      "J7-111室",
      "何明祥",
      "#686789",
      []
      ],
    ],
    [
    [
    "数据库系统",
    "J7-113室",
    "何明祥",
    "#686789",
    []
    ],
    [
    [],
    [],
    [],
    [],
    []
    ],
    [
    [],
    [],
    [],
    [],
    []
    ],
    [
    [],
    [],
    [],
    [],
    []
    ],
    [
    [],
    [],
    [],
    [],
    []
    ]
    ],
    [
      [
        "数据库系统",
        "J7-111室",
        "何明祥",
        "#686789",
        []
        ],
    [
    [],
    [],
    [],
    [],
    []
    ],
    [
      "数据库系统",
      "J7-111室",
      "何明祥",
      "#686789",
      []
      ],
    [
    [],
    [],
    [],
    [],
    []
    ],
    [
    [],
    [],
    [],
    [],
    []
    ]
    ],
    [
      [
        "数据库系统",
        "J7-111室",
        "何明祥",
        "#686789",
        []
        ],
    [
      "数据库系统",
      "J7-111室",
      "何明祥",
      "#686789",
      []
      ],
    [
    [],
    [],
    [],
    [],
    []
    ],
    [
      "数据库系统",
      "J7-111室",
      "何明祥",
      "#686789",
      []
      ],
    [
    [],
    [],
    [],
    [],
    []
    ]
    ]
    ] ,
/* ————————————————————————————*/ 
  //  此数据需要后端调取，其数据格式反应是否已经绑定了共享课表
  set_schedule:{}

  },
  

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
   
    },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() { 
    const app = getApp();
    // 请求一周日期 begin
  var utils = require('../../../../utils/util');
  
  var count_weekdaywhat=utils.count_weekday(0);
  

  this.setData({
    weekday:count_weekdaywhat
  })
  // 请求一周日期 end
  //请求配置&&课表&&周数

  
  var set_schedule=app.globalData.set_all_data;
  var table_schedule=app.globalData.class_info;
  var week_ordinal = app.globalData.week_time;
  this.setData({
    set_schedule,
    table1:table_schedule,
    week_ordinal
  })

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
  //打开共享课表模式
  switchShare(e){
    var that=this
    //就是说这个这是一个switch每按一次就会执行一次内容，所以！shareflag就相当于我每按一次
    // 就得把这个开关的开始和结束重置。所以我们只需要在shareflag=true的时候进行请求数据就欧克

    var newshareflag=!that.data.shareflag
    //这个newshareflag是指的我是否打开共享课表
    var bindshareflag=that.data.set_schedule.CBindState
    //这个bindshareflag是指的我共享课表是否被绑定
    var value=!that.data.checked_value
    that.setData({
      checked_value:value
    })
    //未绑定的情况
    if(bindshareflag!=3&&value==true){
      
      console.log(e.detail.value)
      this.setData({
        checked_value:false
      })
      wx.navigateTo({
 
        url: '../BindSchedule/bindschedule',
      
       })
      
     
    }
    // 如果已经绑定的话，就会对shareflag进行赋值换句话说就会有资格展示共享课表信息与否；
    if(bindshareflag==3){
      console.log(newshareflag)
      if(!newshareflag){
        var new_table1,new_table2
        //--------并行线
        wx.request({
          url: 'http://192.168.21.128:8000/qz/get_share_info/',
          method: 'POST',
          data: {
            account: wx.getStorageSync('useraccount'),
            password: wx.getStorageSync('userpws'),
            cont: 0,
            content:that.data.week_ordinal
          },
          header: {
            'content-type': 'application/json'
          },
          success: (res) => {
            
            // 将课表传输到schedule_table
            if (res.data["code"] >= 4000) {
              console.log("请求错误")
            }
            else{
              new_table2=res.data
            // 请求我课表数据
        wx.request({
          url: 'http://192.168.21.128:8000/qz/get_class_info/',
          method:'POST',
          data:{
            account:wx.getStorageSync('useraccount'),
            cookiesstr:wx.getStorageSync('cookiesstr'),
            cont:that.data.week_ordinal
          },
          header:{
            'content-type':'application/json'      
          },
          success: (res) => {
            // 将课表传输到schedule_table
            if (res.data["code"] >= 4000) {
              console.log("请求错误")
            }
            else{
              new_table1=res.data
              that.setData({
                table1:new_table1,
                table2:new_table2
              })
            }


          },
          fail: (res) => {
            //清楚登录状态
            wx.showToast({
              title: '请求失败',
              icon: 'error'
            })
          }
  
        })
            }
          }
        })
        //--------并行线
      }
      that.setData({
      shareflag:newshareflag
    })}
   
  },
  weekchange(e){
    //左右跳转
    var that=this;
    var week_ordinal=that.data.week_ordinal;
    console.log(week_ordinal)
    const app = getApp()
    var utils = require('../../../../utils/util');
      if(e.target.dataset.change=="pre"){
       
      if(week_ordinal>0)week_ordinal=week_ordinal-1;
       var new_table1,new_table2
       var count_weekdaywhat=utils.count_weekday(week_ordinal-app.globalData.week_time);
       
       this.setData({
         weekday:count_weekdaywhat
       })
      if(that.data.checked_value==true){
        //请求共享课表数据；串行
        // 等会改成并行的
        wx.request({
          url: 'http://192.168.21.128:8000/qz/get_share_info/',
          method: 'POST',
          data: {
            account: wx.getStorageSync('useraccount'),
            password: wx.getStorageSync('userpws'),
            cont: 0,
            content:that.data.week_ordinal
          },
          header: {
            'content-type': 'application/json'
          },
          success: (res) => {
            
            // 将课表传输到schedule_table
            if (res.data["code"] >= 4000) {
              console.log("请求错误")
            }
            else{
              new_table2=res.data
            // 请求我课表数据
        wx.request({
          url: 'http://192.168.21.128:8000/qz/get_class_info/',
          method:'POST',
          data:{
            account:wx.getStorageSync('useraccount'),
            cookiesstr:wx.getStorageSync('cookiesstr'),
            cont:week_ordinal
          },
          header:{
            'content-type':'application/json'      
          },
          success: (res) => {
            // 将课表传输到schedule_table
            if (res.data["code"] >= 4000) {
              console.log("请求错误")
            }
            else{
              new_table1=res.data
              that.setData({
                table1:new_table1,
                table2:new_table2,
                week_ordinal:week_ordinal
              })
            }


          },
          fail: (res) => {
            //清楚登录状态
            wx.showToast({
              title: '请求失败',
              icon: 'error'
            })
          }
  
        })
            }
          }
        })
        
        
      }
      else{
        wx.request({
          url: 'http://192.168.21.128:8000/qz/get_class_info/',
          method:'POST',
          data:{
            account:wx.getStorageSync('useraccount'),
            cookiesstr:wx.getStorageSync('cookiesstr'),
            cont:week_ordinal
          },
          header:{
            'content-type':'application/json'      
          },
          success: (res) => {
            console.log(week_ordinal)
            console.log(res.data)
            this.setData({
              table1:res.data,
              week_ordinal:week_ordinal
             
            })
            console.log(res.data)
            console.log(this.data.table1)
          },
          fail: (res) => {
            //清楚登录状态
            wx.showToast({
              title: '请求失败',
              icon: 'error'
            })
          }
  
        })
        

      }  

      }
      else if(e.target.dataset.change=="next"){
        week_ordinal=week_ordinal+1;
        var new_table1,new_table2
        var count_weekdaywhat=utils.count_weekday(week_ordinal-app.globalData.week_time);
       
       this.setData({
         weekday:count_weekdaywhat
       })
 
        if(that.data.checked_value==true){
          //请求共享课表数据
          wx.request({
            url: 'http://192.168.21.128:8000/qz/get_share_info/',
            method: 'POST',
            data: {
              account: wx.getStorageSync('useraccount'),
              password: wx.getStorageSync('userpws'),
              cont: 0,
              content:that.data.week_ordinal
            },
            header: {
              'content-type': 'application/json'
            },
            success: (res) => {
              
              // 将课表传输到schedule_table
              if (res.data["code"] >= 4000) {
                console.log("请求错误")
              }
              else{
                new_table2=res.data
              // 请求我课表数据
          wx.request({
            url: 'http://192.168.21.128:8000/qz/get_class_info/',
            method:'POST',
            data:{
              account:wx.getStorageSync('useraccount'),
              cookiesstr:wx.getStorageSync('cookiesstr'),
              cont:week_ordinal
            },
            header:{
              'content-type':'application/json'      
            },
            success: (res) => {
              // 将课表传输到schedule_table
              if (res.data["code"] >= 4000) {
                console.log("请求错误")
              }
              else{
                new_table1=res.data
                that.setData({
                  table1:new_table1,
                  table2:new_table2,
                  week_ordinal:week_ordinal
                })
              }
  
  
            },
            fail: (res) => {
              //清楚登录状态
              wx.showToast({
                title: '请求失败',
                icon: 'error'
              })
            }
    
          })
              }
            }
          })
        }
        else{
          wx.request({
            url: 'http://192.168.21.128:8000/qz/get_class_info/',
            method:'POST',
            data:{
              account:wx.getStorageSync('useraccount'),
              password:wx.getStorageSync('userpws'),
              cookiesstr:wx.getStorageSync('cookiesstr'),
              cont:week_ordinal
            },
            header:{
              'content-type':'application/json'      
            },
            success: (res) => {
              if(typeof res.data == 'object'){
                this.setData({
                  table1:res.data,
                  
                })
              }
              else{
                this.setData({
                  table1:[]
                })
              }
              this.setData({
               
                week_ordinal
              })
              
            },
            fail: (res) => {
              //清楚登录状态
              wx.showToast({
                title: '请求失败',
                icon: 'error'
              })
            }
    
          })
  
        }  
      }

  },
  buttonadd(){
    wx.navigateTo({
      url: '../new_schedule/new_shedule',
    
     })

  },
  rechange(){

    wx.request({
      url: 'http://192.168.21.128:8000/qz/get_class_info/',
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
        const app = getApp();
        app.globalData.class_info=res.data
      },
      fail: (res) => {
        wx.showToast({
          title: '请求失败',
          icon: 'none'
        })
      }

    })

  }
  
  
 

})