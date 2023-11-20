// pages/Function/CourseLib/CourseLibContent/courselibcontent.js
const api = require('../../../../API/funtionapi');
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
    api.courselibcontent(that.data.coursename,that.data.teachername,that.data.page).then(res => {
      that.setData({
        coursedata : res.data
      })
      console.log(res)
    }).catch(err => {
      // 获取课程表信息失败，处理错误
      wx.showToast({
        title: '请求失败',
        icon: 'error'
      })
    });
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
        

        api.courselibcontent(that.data.coursename,that.data.teachername,_page).then(res => {
          that.setData({
            page:_page,
            coursedata : res.data
          })
          console.log(res)
        }).catch(err => {
          // 获取课程表信息失败，处理错误
          wx.showToast({
            title: '请求失败',
            icon: 'error'
          })
        });
   

      }
      else if(e.target.dataset.change=="next"){

        if(that.data.coursedata.length==0){
          wx.showToast({
            title: '到达世界最高峰！',
            icon:'none'
          })
          return ;

        }
        _page=_page+1;
        api.courselibcontent(that.data.coursename,that.data.teachername,_page).then(res => {
          that.setData({
            page:_page,
            coursedata : res.data
          })
          console.log(res)
        }).catch(err => {
          // 获取课程表信息失败，处理错误
          wx.showToast({
            title: '请求失败',
            icon: 'error'
          })
        });
        
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
  find(e){
    var that=this
    api.courselibcontent(that.data.coursename,that.data.teachername,1).then(res => {
      that.setData({
        coursedata : res.data
      })
      console.log(res)
    }).catch(err => {
      // 获取课程表信息失败，处理错误
      wx.showToast({
        title: '请求失败',
        icon: 'error'
      })
    });

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