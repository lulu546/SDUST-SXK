// pages/function/function.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    islogin:false,
    functions:[
      [
        
          {
            src:'/image/jishiben.jpg',
            name:'记事本',
            id:0,
            backgroundcolor: '#FFA31A;',
            shadow:'0px 10px 20px rgba(255, 163, 25, 0.2);'
          },
          {
            src:'/image/jishiben.jpg',
            name:'记事本',
            id:1,
        
            backgroundcolor: '#03A4FF;',
            shadow:'0px 10px 20px rgba(3, 164, 255, 0.2);'
          }
        
        ]
      ,
      [
        
          {
            src:'/image/jishiben.jpg',
            name:'课表',
            id:4,
            backgroundcolor: '#00C67E;',
            shadow:'0px 10px 20px rgba(36, 209, 147, 0.2);'
          },
          {
            src:'/image/jishiben.jpg',
            name:'查教室',
            id:5,
            backgroundcolor: '#FF574D;',
            shadow:'0px 10px 20px rgba(255, 101, 91, 0.2);'
          }

        
      ]
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

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
      console.log(this.data.functions[0][0].backgroundcolor)
      console.log(this.data.functions[0][1].backgroundcolor)
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