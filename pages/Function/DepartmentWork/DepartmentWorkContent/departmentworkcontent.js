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
            name:'小科互助会',
            id:0,
            detail:'助理想以翅膀，予技术以资源。',
            backgroundcolor: '#5374A5;',
            shadow:'0px 10px 20px rgba(102, 125, 159, 0.2);'
          },
          {
            src:'/image/jishiben.jpg',
            name:'小科放映室',
            id:1,
            detail:'不如，看场电影吧。',
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
      wx.navigateTo({
        url: "/pages/Function/DepartmentWork/SKYC/SKYCContent/SKYCContent"
      })

    }
    else if(e.currentTarget.dataset.tar=="1"){
      wx.showToast({
        title: '小科正在洽谈哦，敬请期待！(ᕑᗢᓫ∗)˒',
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