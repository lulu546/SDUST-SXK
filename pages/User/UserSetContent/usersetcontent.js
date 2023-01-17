// pages/Menu/StudentinfoFunction/UserSet.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    checkedflag1:false, //是否显示分享
    checkedflag2:false, //是否显示分享
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    var that=this
    
    this.setData({
      checkedflag1:wx.getStorageSync('isshareshowclass'),
      checkedflag2:wx.getStorageSync('isshareshowgrade')
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
  isshareshow1(e){

    wx.setStorageSync('isshareshowclass', e.detail.value);
    app.globalData.set_all_data.isshareshowclass=e.detail.value;
  },
  isshareshow2(e){

    wx.setStorageSync('isshareshowgrade', e.detail.value);
    app.globalData.set_all_data.isshareshowgrade=e.detail.value;
  }
})