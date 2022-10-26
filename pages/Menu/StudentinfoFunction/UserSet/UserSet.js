// pages/Menu/StudentinfoFunction/UserSet.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    checkedflag:false, //是否显示分享
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    var that=this
    
    
    this.setData({
      checkedflag:wx.getStorageSync('isshareshow')

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
  isshareshow(e){
    var that=this;
    const app = getApp()
    wx.setStorageSync('isshareshow', e.detail.value);
    app.globalData.set_all_data.isshareshow=e.detail.value;
    

  }
})