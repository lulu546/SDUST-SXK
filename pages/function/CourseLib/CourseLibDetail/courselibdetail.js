// pages/Function/CourseLib/CourseLibDetail/courselibdetail.js
var startX, endX;
var moveFlag = true;// 判断执行滑动事件

Page({

  /**
   * 页面的初始数据
   */
  data: {
    course:{},
    coursedetildata:[],
    toweek:NaN,
  },
  weekchange(e){
    //左右跳转
    var that=this;
    var toweek=that.data.toweek
    if(e.target.dataset.change=="pre"){
      if(toweek>1){toweek--;}
      else{
        wx.showToast({
          title: '已经到了尽头咧！',
          icon:'none'
        })
        return ;}
        that.setData({
          toweek,
        })
        console.log(that.data.toweek)
        wx.request({
          url: 'http://192.168.21.128:8000/qz/get_courselib/',
          method: 'POST',
          data: {
            // coursename:that.data.coursename,
            // teachername:that.data.teachername,
            // page:_page,
            toweek:that.data.toweek,
            id: that.data.course.id,
            cont:1
          },
          header: {
            'content-type': 'application/json'
          },
          success: (res) => {
    
            that.setData({
              coursedetildata : res.data,
              
            })
          }
        })

      }
      else if(e.target.dataset.change=="next"){
        if(that.data.toweek>19){
          wx.showToast({
            title: '到达世界最高峰！',
            icon:'none'
          })
          return ;

        }
        
        
        toweek=toweek+1;
        that.setData({
          toweek,
        })
        wx.request({
          url: 'http://192.168.21.128:8000/qz/get_courselib/',
          method: 'POST',
          data: {
            // coursename:that.data.coursename,
            // teachername:that.data.teachername,
            // page:_page,
            toweek:that.data.toweek,
            id: that.data.course.id,
            cont:1
          },
          header: {
            'content-type': 'application/json'
          },
          success: (res) => {
    
            that.setData({
              coursedetildata : res.data,
              toweek

            })
          }
        })
  
        
      }

  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    const app = getApp()
    var that = this;
    var week_ordinal  = app.globalData.week_time;
    var course=JSON.parse(options.course)
    
    course['id']=parseInt(course['id'])
    that.setData({
      course,
      toweek:week_ordinal,
      
    })
    console.log(parseInt(that.data.course))
    console.log(parseInt(that.data.course.id))
    console.log(parseInt(that.data.course['id']))
    wx.request({
      url: 'http://192.168.21.128:8000/qz/get_courselib/',
      method: 'POST',
      data: {
        // coursename:that.data.coursename,
        // teachername:that.data.teachername,
        // page:_page,
        toweek:7,
        id: that.data.course.id,
        cont:1
      },
      header: {
        'content-type': 'application/json'
      },
      success: (res) => {

        that.setData({
          coursedetildata : res.data
        })
      }
    })
    
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
    //触摸板块
    touchStart: function (e) {
      startX = e.touches[0].pageX; // 获取触摸时的原点
      moveFlag = true;
    },
    // 触摸移动事件
    touchMove: function (e) {
      endX = e.touches[0].pageX; // 获取触摸时的原点
      if (moveFlag) {
        if (endX - startX > 50) {
          console.log("move right");
          this.move2right();
          moveFlag = false;
        }
        if (startX - endX > 50) {
          console.log("move left");
          this.move2left();
          moveFlag = false;
        }
      }
  
    },
    // 触摸结束事件
    touchEnd: function (e) {
      moveFlag = true; // 回复滑动事件
      
    },
    move2left() {
      var that=this;
      var toweek=that.data.toweek
   
          if(that.data.toweek>19){
            wx.showToast({
              title: '到达世界最高峰！',
              icon:'none'
            })
            return ;
  
          }
          
          
          toweek=toweek+1;
          that.setData({
            toweek,
          })
          wx.request({
            url: 'http://192.168.21.128:8000/qz/get_courselib/',
            method: 'POST',
            data: {
              // coursename:that.data.coursename,
              // teachername:that.data.teachername,
              // page:_page,
              toweek:that.data.toweek,
              id: that.data.course.id,
              cont:1
            },
            header: {
              'content-type': 'application/json'
            },
            success: (res) => {
      
              that.setData({
                coursedetildata : res.data,
                toweek
  
              })
            }
          })
    
          
        
    },
    move2right() {
        var that=this;
    var toweek=that.data.toweek
      if(toweek>1){toweek--;}
      else{
        wx.showToast({
          title: '已经到了尽头咧！',
          icon:'none'
        })
        return ;}
        that.setData({
          toweek,
        })
        console.log(that.data.toweek)
        wx.request({
          url: 'http://192.168.21.128:8000/qz/get_courselib/',
          method: 'POST',
          data: {
            // coursename:that.data.coursename,
            // teachername:that.data.teachername,
            // page:_page,
            toweek:that.data.toweek,
            id: that.data.course.id,
            cont:1
          },
          header: {
            'content-type': 'application/json'
          },
          success: (res) => {
    
            that.setData({
              coursedetildata : res.data,
              
            })
          }
        })

      

        
    },
})