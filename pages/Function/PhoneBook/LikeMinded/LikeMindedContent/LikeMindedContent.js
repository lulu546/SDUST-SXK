// pages/Function/CourseLib/CourseLibContent/courselibcontent.js
const app=getApp()
const funAPI = require('../../../../../API/funtionapi');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    likename:"",
    pageNum:1,
    toweek:NaN,
    likedata:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {

    var that = this;
    funAPI.getLikesGroup(that.data.likename,that.data.pageNum).then(res => {
      that.setData({
        likedata : res
      })
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
    var pageNum=that.data.pageNum
    if(e.target.dataset.change=="pre"){
      if(pageNum>1){pageNum--;}
      else{
        wx.showToast({
          title: '已经到了尽头咧！',
          icon:'none'
        })
        return ;}
  
        that.setData({
          pageNum,
        })
        console.log(that.data.pageNum)
      }
      else if(e.target.dataset.change=="next"){
        if(that.data.likedata==null||that.data.likedata.length==0){
          wx.showToast({
            title: '≖‿≖✧已经到了尽头了！',
            icon:'none'
          })
          return ; 
        }
        pageNum=pageNum+1;
        that.setData({
          pageNum,
        })
        }
        funAPI.getLikesGroup(that.data.likename,that.data.pageNum).then(res => {

          that.setData({
            likedata : res
          })

        }).catch(err => {
          // 获取课程表信息失败，处理错误
          wx.showToast({
            title: '请求失败',
            icon: 'error'
          })
        });
      

  },
  getlikename(e) {
    var that=this
    that.setData({
      likename: e.detail.value
    })
  },

  find(){
    var that=this
    console.log(that.data.likename)
    funAPI.getLikesGroup(that.data.likename,that.data.pageNum).then(res => {
      that.setData({
        likedata : res,
        pageNum:1
      })
    }).catch(err => {
      // 获取课程表信息失败，处理错误
      wx.showToast({
        title: '请求失败',
        icon: 'error'
      })
    });

  },


// index.js
copyText(e) {
  let key = e.currentTarget.dataset.key;
  wx.setClipboardData({ //设置系统剪贴板的内容
    data: key,
    success(res) {
      console.log(res, key);
      wx.getClipboardData({ // 获取系统剪贴板的内容
        success(res) {
          wx.showToast({
            title: '到达粘贴板！',
          })
        }
      })
    }
  })
}




})