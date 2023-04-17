// pages/Function/CourseLib/CourseLibContent/courselibcontent.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    coursename:"",
    teachername:"",
    page:1,
    toweek:NaN,
    coursedata:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {

    var that = this;

    wx.request({
      url: app.globalData.TotalUrl+'/qz/course-lib/',
      method: 'POST',
      data: {
        coursename:"",
        teachername:"",
        page:1,
        // toweek:7,
        // id:39,
        cont:0
      },
      header: {
        'content-type': 'application/json'
      },
      success: (res) => {
        that.data.coursedata = res.data
        that.setData({
          coursedata : res.data
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
  weekchange(e){
    //左右跳转
    var that=this;

    var _page=that.data.page;
      if(e.target.dataset.change=="pre"){
       console.log(_page)
      if(_page>1){_page--;}
      else{
        wx.showToast({
          title: '已经到了尽头咧！',
          icon:'none'
        })
        return ;}
        
        wx.request({
          url: app.globalData.TotalUrl+'/qz/course-lib/',
          method: 'POST',
          data: {
            coursename:that.data.coursename,
            teachername:that.data.teachername,
            page:_page,
            // toweek:7,
            // id:39,
            cont:0
          },
          header: {
            'content-type': 'application/json'
          },
          success: (res) => {
            that.setData({
              coursedata : res.data,
              page:_page
            })
          }
        })

      }
      else if(e.target.dataset.change=="next"){
        if(that.data.coursedata[0].length==0){
          wx.showToast({
            title: '到达世界最高峰！',
            icon:'none'
          })
          return ;

        }
        
        _page=_page+1;
 
          wx.request({
            url: app.globalData.TotalUrl+'/qz/course-lib/',
            method: 'POST',
            data: {
              coursename:that.data.coursename,
              teachername:that.data.teachername,
              page:_page,
              // toweek:7,
              // id:39,
              cont:0
            },
            header: {
              'content-type': 'application/json'
            },
            success: (res) => {
      
              that.setData({
                coursedata : res.data,
                page:_page
              })
            }
          })
  
        
      }

  },
  getcoursename(e) {
    this.setData({
      coursename: e.detail.value
    })
  },
  getteachername(e) {
    this.setData({
      teachername: e.detail.value
    })
  },
  find(){
    var that=this
    console.log("SDSA")
    wx.request({
      url: app.globalData.TotalUrl+'/qz/course-lib/',
      method: 'POST',
      data: {
        coursename:that.data.coursename,
        teachername:that.data.teachername,
        page:1,
        // toweek:7,
        // id:39,
        cont:0
      },
      header: {
        'content-type': 'application/json'
      },
      success: (res) => {

        that.setData({
          coursedata : res.data,

        })
      }
    })

  },
  turndetil(e){
    var that=this;
    var index=e.currentTarget.dataset.index;
    var course=that.data.coursedata[index]
    console.log(course)
    let courseStr = JSON.stringify(course)
    wx.navigateTo({
      url: '/pages/Function/CourseLib/CourseLibDetail/courselibdetail?course='+courseStr,
    })


  }
})