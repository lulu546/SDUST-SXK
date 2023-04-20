// pages/reshareschedule/resharesch.js
const app = getApp();
const shareapi=require("../../../../API/shareapi");
Page({

  /**
   * 页面的初始数据
   */
  data: {
    sharedata:null,
    student_info:null,
    postnum: '', //用户账户
    currentIndex: 0  
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
   

  //上来先读数
  var that =this;
  var sharedata=app.globalData.sharedata;
  var student_info=app.globalData.student_info
  that.setData({
    sharedata,
    student_info
  })
    shareapi.sharestate().then(res => {

      
      that.setData({
        sharedata:app.globalData.sharedata
      })
  
  }).catch(err => {
    wx.showToast({
      title: '请求失败喵~',
      icon: "error"
    });
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
  swiperChange(e) {
    this.setData({
      currentIndex: e.detail.current
    })  
  },
  PostTo(e) {
    var that = this;
    var cont= e.currentTarget.dataset.cont;
    let {
      postnum
    } = that.data;
    // 前端验证
    if (!postnum) {
      wx.showToast({
        title: '学号不能为空',
        icon: 'error'
      })
      return;
    }
    let phoneReg = /^\d{12}$/;
    if (!phoneReg.test(postnum)) {
      wx.showToast({
        title: '学号格式错误',
        icon: 'error'
      })
      return;
    }
    shareapi.postsharestate(postnum,cont,false).then(res => {
      that.setData({
        sharedata:app.globalData.sharedata,
        postnum:wx.getStorageSync('postnum')
      })
      wx.setStorageSync('postnum', postnum);
      wx.showToast({
        title: '请求成功喵~',
        icon: "success"
      });
    }).catch(err => {
      wx.showToast({
        title: '请求失败喵~',
        icon: "error"
      });
    })

  },
  CancelPostTo(){
    var that = this;
    var postnum=that.data.postnum;
    var cont=that.data.cont;
    shareapi.postsharestate(postnum,cont,true).then(res => {
      wx.setStorageSync('postnum', "");
      that.setData({
        sharedata:app.globalData.sharedata,
        postnum:wx.getStorageSync('postnum')
      })
      wx.showToast({
        title: '请求成功喵~',
        icon: "success"
      });
    }).catch(err => {
      wx.showToast({
        title: '请求失败喵~',
        icon: "error"
      });
    })

  },
  ReplyPostTo(){
    var that = this;
    var postnum=that.data.postnum;
    var cont=that.data.cont;
    shareapi.replysharestate(postnum,cont,true).then(res => {
      wx.setStorageSync('postnum', "");
      that.setData({
        sharedata:app.globalData.sharedata,
        postnum:wx.getStorageSync('postnum')
      })
      wx.showToast({
        title: '请求成功喵~',
        icon: "success"
      });
    }).catch(err => {
      wx.showToast({
        title: '请求失败喵~',
        icon: "error"
      });
    })

  },
  getaccount(e) {
    var that=this
    that.setData({
      postnum: e.detail.value
    })
  },
  Eggs(){
    wx.showToast({
      title: '( ´◔︎ ‸◔︎`)点我干嘛！',
      icon:'none'
    })

  }
})