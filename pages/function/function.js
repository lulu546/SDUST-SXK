// pages/function/function.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    islogin:false,
    functions:[
      {
        classifyname:'工具',
        datalist:[
          {
            src:'/image/jishiben.jpg',
            name:'记事本',
            id:0
          },
          {
            src:'/image/jishiben.jpg',
            name:'记事本',
            id:1
          },
          {
            src:'/image/jishiben.jpg',
            name:'记事本',
            id:2
          },
          {
            src:'/image/jishiben.jpg',
            name:'记事本',
            id:3
          }
        ]
      },
      {
        classifyname:'学习',
        datalist:[
          {
            src:'/image/jishiben.jpg',
            name:'课表',
            id:4
          },
          {
            src:'/image/jishiben.jpg',
            name:'查教室',
            id:5
          },
          {
            src:'/image/jishiben.jpg',
            name:'查成绩',
            id:6
          },
          {
            src:'/image/jishiben.jpg',
            name:'共享课表',
            id:7
          }
        ]
      },
      {
        classifyname:'娱乐',
        datalist:[
          {
            src:'/image/jishiben.jpg',
            name:'记事本',
            id:8
          },
          {
            src:'/image/jishiben.jpg',
            name:'记事本',
            id:9
          },
          {
            src:'/image/jishiben.jpg',
            name:'记事本',
            id:10
          },
          {
            src:'/image/jishiben.jpg',
            name:'记事本',
            id:11
          }
        ]
      },
      {
        classifyname:'外卖',
        datalist:[
          {
            src:'/image/jishiben.jpg',
            name:'今日推荐',
            id:12
          },
          {
            src:'/image/jishiben.jpg',
            name:'记事本',
            id:13
          },
          {
            src:'/image/jishiben.jpg',
            name:'记事本',
            id:14
          },
          {
            src:'/image/jishiben.jpg',
            name:'记事本',
            id:15
          }
        ]
      }
    ]
  },
  getevent0(){
    wx.navigateTo({
      url: '/pages/function/notepad',
    })
  },
  getevent1(){
    console.log("hello")
  },
  getevent2(){
    console.log("hello")
  },
  getevent3(){
    wx.navigateTo({
      url: "/pages/Login/login"
    })
  },
  getevent4(){
    this.setData({
      islogin:wx.getStorageSync('islogin')
    })
    if(this.data.islogin){
      wx.navigateTo({
        url: "/pages/ScheduleShare/Schedule/ScheduleShare"
      })
    }
    else {
      wx.showToast({
        title: '请先登录',
        icon:'error'
      })
      
    }
  },
  getevent5(){
    console.log("hello")
  },
  getevent6(){
    console.log("hello")
  },
  getevent7(){
    console.log("hello")
  },
  getevent8(){
    console.log("hello")
  },
  getevent9(){
    console.log("hello")
  },
  getevent10(){
    console.log("hello")
  },
  getevent11(){
    console.log("hello")
  },
  getevent12(){
    console.log("hello")
  },
  getevent13(){
    console.log("hello")
  },
  getevent14(){
    console.log("hello")
  },
  getevent15(){
    console.log("hello")
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

  }
})