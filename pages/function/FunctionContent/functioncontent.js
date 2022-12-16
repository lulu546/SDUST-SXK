// pages/function/function.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    islogin:false,
    functions:[
      [
          {
            src:'/image/jishiben.jpg',
            name:'课表',
            id:0,
            backgroundcolor: '#FFA31A;',
            shadow:'0px 10px 20px rgba(255, 163, 25, 0.2);'
          },
          {
            src:'/image/jishiben.jpg',
            name:'食物库',
            id:1,
            backgroundcolor: '#03A4FF;',
            shadow:'0px 10px 20px rgba(3, 164, 255, 0.2);'
          }
        
        ]
      ,
      [
          {
            src:'/image/jishiben.jpg',
            name:'备忘录',
            id:2,
            backgroundcolor: '#00C67E;',
            shadow:'0px 10px 20px rgba(36, 209, 147, 0.2);'
          },
          {
            src:'/image/jishiben.jpg',
            name:'部门业务',
            id:3,
            backgroundcolor: '#FF574D;',
            shadow:'0px 10px 20px rgba(255, 101, 91, 0.2);'
          }

        
      ],
    
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
      that.setData({
        islogin:wx.getStorageSync('islogin')
      })
      console.log(that.data.islogin)
      if(that.data.islogin){
        wx.navigateTo({
          url: "/pages/Function/Schedule/ScheduleContent/schedulecontent"
        })
      }
      else {
        wx.navigateTo({
          url: "/pages/Login/LoginContent/logincontent"
        })
      }
    }
    else if(e.currentTarget.dataset.tar=="1"){
      wx.navigateTo({
        url: "/pages/Function/FoodWhat/FoodWhatContent/foodwhatcontent"
      })
    }
    else if(e.currentTarget.dataset.tar=="2"){
      wx.navigateTo({
        url: "/pages/Function/NotePad/NotePadContent/notepadcontent"
      })
    }
    else if(e.currentTarget.dataset.tar=="3"){
      wx.navigateTo({
        url: "/pages/Function/DepartmentWork/DepartmentWorkContent/departmentworkcontent"
      })
    }


  },

 


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
      console.log(this.data.functions[0][0].backgroundcolor)
      console.log(this.data.functions[0][1].backgroundcolor)
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