// pages/User/UserAbout/useabout.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    show_GigaBox:false
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
    setTimeout(()=>{
      this.setData({
        show_GigaBox:false
       })
    },1000)
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
    if(that.data.show_GigaBox){
      return;
    }
    if(e.target.dataset.change=="1"){
      wx.setClipboardData({
        data: '584646697',
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
    else if(e.target.dataset.change=="2"){
      wx.setClipboardData({
        data: 'lyloveslife@qq.com',
        success: function (res) {
          wx.getClipboardData({
            success: function (res) {
              wx.showToast({
                title: 'ଇ害羞羞~',
                icon: 'success',
                duration: 2000
              })
            }
          })
        }
      })
    }
    else if(e.target.dataset.change=="3"){
      wx.setClipboardData({
        data: 'https://github.com/lulu546/SDUST-SXK',
        success: function (res) {
          wx.getClipboardData({
            success: function (res) {
              wx.showToast({
                title: '代码有点拉QAQ，等我有空就重构😗',
                icon: 'none',
                duration: 2000
              })
            }
          })
        }
      })
    }
    else if(e.target.dataset.change=="4"){
      const url = encodeURIComponent('https://mp.weixin.qq.com/s?__biz=Mzk0OTYzMTgwNw==&mid=2247483700&idx=1&sn=436aaabf60fcd377ab776d4294eac34c&chksm=c3542f64f423a672ad8a6db839499762b07c7236a574db6e43ec267edf7cf00a678fc5fefbe5#rd');
      wx.navigateTo({
        url: `/pages/WechatPage/wechatpage?src=${url}`
      }).then(()=>{
        wx.showToast({
          title: '(•‾⌣‾•) 很高兴与你相遇',
          icon: 'none',
          duration: 2000
        })
      })
    }
    else if(e.target.dataset.change=="5"){
      const url = encodeURIComponent('https://mp.weixin.qq.com/s?__biz=Mzk0OTYzMTgwNw==&mid=2247483740&idx=1&sn=4ba46bbc248b7a742023f231123a1012&chksm=c3542f0cf423a61a306211150eb4214c119f507a166ddad57400fb07db126caacbdac9227985&token=126416898&lang=zh_CN#rd');

      wx.navigateTo({
        url: `/pages/WechatPage/wechatpage?src=${url}`
      }).then(()=>{
        wx.showToast({
          title: '╮/(＞▽<)人(>▽＜)╭',
          icon: 'none',
          duration: 2000
        })
      })
    }
},
gigabox(e) {
  var that=this;
  var GigaBox=!that.data.show_GigaBox;
  console.log(that.data.show_GigaBox)
  that.setData({
  show_GigaBox:GigaBox
 })
 


}
  
})