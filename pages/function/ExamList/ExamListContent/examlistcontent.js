// pages/Function/ExamList/ExamListContent/examlistcontent.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    examlist: null,
    toweek:null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    // 读取考试信息,调用shareapi的函数s
    var that = this;
    var qzapi= require('../../../../API/qzapi.js');
    var app= getApp();
    qzapi.getexam().then(res => {
      // 读取页面本地缓存的数据
      that.setData({
        examlist:res,
        toweek:app.globalData.week_time
      })
      console.log(that.data.examlist)
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

  }
})