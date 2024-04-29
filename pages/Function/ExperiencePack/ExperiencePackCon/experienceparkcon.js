// pages/function/function.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    islogin:false,
    functions:[
      
          {
            src:'/image/jishiben.jpg',
            name:'小科资料库',
            id:0,
            detail:'这是属于我科的传承！(✧∇✧)',
            backgroundcolor: '#5374A5;',
            shadow:'0px 10px 20px rgba(102, 125, 159, 0.2);'
          },
          {
            src:'/image/jishiben.jpg',
            name:'小科生活指南',
            id:1,
            detail:'这也似属于我科的传承！0.o',
            backgroundcolor: '#00C67E;',
            shadow:'0px 10px 20px rgba(36, 209, 147, 0.2);'
          }
      // ,
          // {
          //   src:'/image/jishiben.jpg',
          //   name:'备忘录',
          //   id:2,
          //   backgroundcolor: '#00C67E;',
          //   shadow:'0px 10px 20px rgba(36, 209, 147, 0.2);'
          // },
          // {
          //   src:'/image/jishiben.jpg',
          //   name:'部门业务',
          //   id:3,
          //   backgroundcolor: '#FF574D;',
          //   shadow:'0px 10px 20px rgba(255, 101, 91, 0.2);'
          // }

        
      
    ]
  },
  turnpage(e){
    var that=this;
    if(e.currentTarget.dataset.tar=="none"){
      wx.showToast({
        title: '前面的道路以后再来探索吧！',
        icon:'none'
      })

    }
    else if(e.currentTarget.dataset.tar=="0"){
      wx.showToast({
        title: '五月十五之前一定做出来！',
        icon:'none'
      })

      // wx.navigateTo({
      //   url: "/pages/Function/ExperiencePack/LearningMaterials/learningmaterials"
      // })

    }
    else if(e.currentTarget.dataset.tar=="1"){
      wx.showToast({
        title: '正在制作中！',
        icon:'none'
      })
    }
   




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