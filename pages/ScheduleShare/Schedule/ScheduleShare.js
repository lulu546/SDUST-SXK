// pages/prime/Page.js

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
   
   console.log((this.data.table1[1]&&this.data.table1[1][0])||(this.data.table2[1]&&this.data.table2[1][0]))
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() { 
    // 请求一周日期 begin
  var utils = require('../../../utils/util');
  var count_weekdaywhat=utils.count_weekday();
  console.log(count_weekdaywhat)
  this.setData({
    weekday:count_weekdaywhat
  })
  // 请求一周日期 end
  //请求配置&&课表&&周数
  var share = require('../../../data/date_share');
  var set_schedule=share.set_schedule();
  var table_schedule=share.table_schedule();
  var week_ordinal=share.weekord_schedule()
  this.setData({
    set_schedule,
    table1:table_schedule,
    week_ordinal
  })
  console.log(this.data.nowtimes.day==this.data.weekday[3].thisday)
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
  turn_crouselist(e){
    

    
    wx.navigateTo({
      url: "../../pages/Schedule/schedule"
    })
  



  },
  turn_crouselist2(e){
  
    var arr=this.data.homeOutObj.height.split("p")
    var a=arr[0]*1
  
    a=a+5
     this.setData({
    
        homeOutObj: {
    
        
          height:"400px"
     }
     
    })
  },
  switchShare(e){
    var that=this
    var newshareflag=!that.data.shareflag
    var bindshareflag=that.data.set_schedule.isbindshareflag
    var value=!that.data.checked_value
    that.setData({
      checked_value:value
    })
    if(bindshareflag!=true&&value==true){
      
      console.log(e.detail.value)
      this.setData({
        checked_value:false
      })
      wx.navigateTo({
 
        url: '../bind_shareschedule/bind_shareschedule',
      
       })
      
     
    }
    else if(bindshareflag==true){
      this.setData({
      shareflag:newshareflag
    })}
   
  },
  weekchange(e){
    //左右跳转
      if(e.target.dataset.change=="pre"){
       var new_table1,new_table2
        this.setData({
          table1:new_table1,
          table2:new_table2
        })

      }
      else if(e.target.dataset.change=="next"){
        var new_table1,new_table2
        this.setData({
          table1:new_table1,
          table2:new_table2
        })
      }
  },
  buttonadd(){
    wx.navigateTo({
      url: '../new_schedule/new_shedule',
    
     })

  },
  
  
 

})