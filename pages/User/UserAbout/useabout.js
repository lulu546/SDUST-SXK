// pages/User/UserAbout/useabout.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

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
  getinfo(e){
    var that=this
    if(e.target.dataset.change=="1"){
      wx.setClipboardData({
        data: 'lyloveslife@qq.com',
        success: function (res) {
          wx.getClipboardData({
            success: function (res) {
              wx.showToast({
                title: 'Tecent，启动！',
                icon: 'success',
                duration: 2000
              })
            }
          })
        }
      })
    }
    if(e.target.dataset.change=="2"){
      wx.setClipboardData({
        data: '862055705',
        success: function (res) {
          wx.getClipboardData({
            success: function (res) {
              wx.showToast({
                title: 'ଇ害羞',
                icon: 'success',
                duration: 2000
              })
            }
          })
        }
      })
    }
    if(e.target.dataset.change=="3"){
      wx.setClipboardData({
        data: 'https://github.com/lulu546',
        success: function (res) {
          wx.getClipboardData({
            success: function (res) {
              wx.showToast({
                title: '☆ ★',
                icon: 'success',
                duration: 2000
              })
            }
          })
        }
      })
    }
    if(e.target.dataset.change=="4"){
      wx.setClipboardData({
        data: 'https://space.bilibili.com/32090268?spm_id_from=333.337.0.0',
        success: function (res) {
          wx.getClipboardData({
            success: function (res) {
              wx.showToast({
                title: '-(゜-゜)つロ',
                icon: 'success',
                duration: 2000
              })
            }
          })
        }
      })
    }
    if(e.target.dataset.change=="5"){
      wx.setClipboardData({
        data: 'lyloveslife@qq.com',
        success: function (res) {
          wx.getClipboardData({
            success: function (res) {
              wx.showToast({
                title: '写有价值的文章',
                icon: 'success',
                duration: 2000
              })
            }
          })
        }
      })
    }
}
  
})