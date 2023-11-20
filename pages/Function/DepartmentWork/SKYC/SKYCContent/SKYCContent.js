// pages/Function/DepartmentWork/SKYC/SKYCContent/SKYCContent.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    flag:false
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
  getemail(){
      var that=this
      that.setData({
        flag:!that.data.flag
      })
      wx.setClipboardData({
        data: 'lyloveslife@qq.com',
        success: function (res) {
          wx.getClipboardData({
            success: function (res) {
              wx.showToast({
                title: '花有重开日',
                icon: 'success',
                duration: 2000
              })
            }
          })
        }
      })
  }
})