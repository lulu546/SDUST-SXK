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
  //  此数据需要后端调取，其数据格式是从周一开始一直到周天的月份与时间，以下为示例数据
   weekday:[{
    thismonth:"09",
    thisday:"26"
   },
   {
    thismonth:"09",
    thisday:"27"
   },
   {
    thismonth:"09",
    thisday:"28"
   },
   {
    thismonth:"09",
    thisday:"29"
   },
   {
    thismonth:"09",
    thisday:"30"
   },
   {
    thismonth:"10",
    thisday:"01"
   },
   {
    thismonth:"10",
    thisday:"02"
   }
    
   ],
  /* ————————————————————————————*/ 
  table:[
    [
      
    [
      [
        "67"
      ],
      [
        "J1-103"
      ],
      [
        "linear-gradient(to right, #ff8177 0%, #ff867a 0%, #ff8c7f 21%, #f99185 52%, #cf556c 78%, #b12a5b 100%);"
      ]
    ],
    [
      [
        "67"
      ],
      [
        "J1-103"
      ],
      [
        "linear-gradient(to right, #ff8177 0%, #ff867a 0%, #ff8c7f 21%, #f99185 52%, #cf556c 78%, #b12a5b 100%);"
      ]
    ],
    [
      [
        "67"
      ],
      [
        "J1-103"
      ],
      [
        "linear-gradient(to right, #ff8177 0%, #ff867a 0%, #ff8c7f 21%, #f99185 52%, #cf556c 78%, #b12a5b 100%);"
      ]
    ],
    [
           ]
    ],
    [
      [
        [
          "婆婆复分配"
        ],
        [
          "J1-103"
        ],
        [
          "linear-gradient(to right, #ff8177 0%, #ff867a 0%, #ff8c7f 21%, #f99185 52%, #cf556c 78%, #b12a5b 100%);"
        ]
      ],
      [
        [
          "数据结构"
        ],
        [
          "J1-103"
        ],
        [
          "red"      ]
      ],
      [
        [
          "数据结构"
        ],
        [
          "J1-103"
        ],
        [
          "linear-gradient(to right, #ffecd2 0%, #fcb69f 100%);"      ]
      ],
      [
        [
          "数据结构1234444444444444444444444444444444444444444444444444444444w"
        ],
        [
          "J1-103"
        ],
        [
          "red"      ]
      ],
      [
        [
          "数据结构"
        ],
        [
          "J1-103"
        ],
        [
          "red"      ]
      ]
    ],
    [
      [
        [
          "婆婆复分配"
        ],
        [
          "J1-103"
        ],
        [
          "linear-gradient(to right, #ff8177 0%, #ff867a 0%, #ff8c7f 21%, #f99185 52%, #cf556c 78%, #b12a5b 100%);"
        ]
      ],
      [
        [
          "数据结构"
        ],
        [
          "J1-103"
        ],
        [
          "red"      ]
      ],
      [
        [
          "数据结构"
        ],
        [
          "J1-103"
        ],
        [
          "linear-gradient(to right, #ffecd2 0%, #fcb69f 100%);"      ]
      ],
      [
        [
          "数据结构"
        ],
        [
          "J1-103"
        ],
        [
          "red"      ]
      ],
      [
        [
          "数据结构"
        ],
        [
          "J1-103"
        ],
        [
          "red"      ]
      ]
    ],
    [
      [
        [
          "婆婆复分配"
        ],
        [
          "J1-103"
        ],
        [
          "linear-gradient(to right, #ff8177 0%, #ff867a 0%, #ff8c7f 21%, #f99185 52%, #cf556c 78%, #b12a5b 100%);"
        ]
      ],
      [
        [
          "数据结构"
        ],
        [
          "J1-103"
        ],
        [
          "red"      ]
      ],
      [
        [
          "数据结构"
        ],
        [
          "J1-103"
        ],
        [
          "linear-gradient(to right, #ffecd2 0%, #fcb69f 100%);"      ]
      ],
      [
        [
          "数据结构"
        ],
        [
          "J1-103"
        ],
        [
          "red"      ]
      ],
      [
        [
          "数据结构"
        ],
        [
          "J1-103"
        ],
        [
          "red"      ]
      ]
    ],

    
    [
       
      [
        [
          "婆婆复分配"
        ],
        [
          "J1-103"
        ],
        [
          "linear-gradient(to right, #ff8177 0%, #ff867a 0%, #ff8c7f 21%, #f99185 52%, #cf556c 78%, #b12a5b 100%);"
        ]
      ],
      [
        [
          "数据结构"
        ],
        [
          "J1-103"
        ],
        [
          "red"      ]
      ],
      [
        [
          "数据结构"
        ],
        [
          "J1-103"
        ],
        [
          "linear-gradient(to right, #ffecd2 0%, #fcb69f 100%);"      ]
      ],
      [
        [
          "数据结构"
        ],
        [
          "J1-103"
        ],
        [
          "red"      ]
      ],
      [
        [
          "数据结构"
        ],
        [
          "J1-103"
        ],
        [
          "red"      ]
      ]
  
    ],
    [
     
      [
        [
          "76配"
        ],
        [
          "J1-103"
        ],
        [
          "linear-gradient(to right, #ff8177 0%, #ff867a 0%, #ff8c7f 21%, #f99185 52%, #cf556c 78%, #b12a5b 100%);"
        ]
      ],
      [
        [
          "数据结构"
        ],
        [
          "J1-103"
        ],
        [
          "red"      ]
      ],
      [
        [
          "数据结构"
        ],
        [
          "J1-103"
        ],
        [
          "linear-gradient(to right, #ffecd2 0%, #fcb69f 100%);"      ]
      ],
      [
        [
          "数据结构"
        ],
        [
          "J1-103"
        ],
        [
          "red"      ]
      ],
      [
        [
          "数据结构"
        ],
        [
          "J1-103"
        ],
        [
          "red"      ]
      ]
  
    ],
    [
       
      [
        [
          "数据结构"
        ],
        [
          "J1-103"
        ],
        [
          "red"      ]
      ],
      [
        [
          "数据结构"
        ],
        [
          "J1-103"
        ],
        [
          "red"      ]
      ],
      [
        [
          "数据结构"
        ],
        [
          "J1-103"
        ],
        [
          "rgba(0,0,0,0.5);"      ]
      ],
      [
        [
  
        ],
        [
    
        ],
        [
    
        ]
      ],
      [
        [
  
        ],
        [
    
        ],
        [
    
        ]
      ]
    ],
    [
       
      [
        [
          [
            "数据结构"
          ],
          [
            "J1-103"
          ],
          [
            "rgba(0,0,0,0.5);"      ]
        ],
        [
    
        ],
        [
    
        ]
      ],
      [
        [
  
        ],
        [
    
        ],
        [
    
        ]
      ],
      [
        [
  
        ],
        [
    
        ],
        [
    
        ]
      ],
      [
        [
  
        ],
        [
    
        ],
        [
    
        ]
      ],
      [
        [
  
        ],
        [
    
        ],
        [
    
        ]
      ]
    ],
    [
        
    [
      [

      ],
      [
  
      ],
      [
  
      ]
    ],
    [
      [

      ],
      [
  
      ],
      [
  
      ]
    ],
    [
      [

      ],
      [
  
      ],
      [
  
      ]
    ],
    [
      [

      ],
      [
  
      ],
      [
  
      ]
    ],
    [
      [

      ],
      [
  
      ],
      [
  
      ]
    ]
    ],
    [
       
      [
        [
  
        ],
        [
    
        ],
        [
    
        ]
      ],
      [
        [
  
        ],
        [
    
        ],
        [
    
        ]
      ],
      [
        [
  
        ],
        [
    
        ],
        [
    
        ]
      ],
      [
        [
  
        ],
        [
    
        ],
        [
    
        ]
      ],
      [
        [
  
        ],
        [
    
        ],
        [
    
        ]
      ]
    ]

  ]
    
 
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
    
    console.log("shab");
    
    wx.navigateTo({
     
    })
  



  },
  turn_crouselist2(e){
    console.log("shab");
    var arr=this.data.homeOutObj.height.split("p")
    var a=arr[0]*1
    console.log(this.data.homeOutObj.height)
    console.log(a)
    a=a+5
     this.setData({
    
        homeOutObj: {
    
        
          height:"400px"
     }
     
    })
  }
})