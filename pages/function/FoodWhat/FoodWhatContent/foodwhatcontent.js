// pages/FoodWhat/foodwhat.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
   isselect:false,
    twoShowlight: -1, //第二轮单选标识,0-A餐，1-B餐，2-C餐，3-北门，4-南门
    oneShowlight: -1, //第一轮单选标识，0-外卖，1-堂食，2-全部随机
    select: 0, //选择标识，表示第几轮
    lightbutton: "background: #FFA319;box-shadow: 0px 10px 20px rgba(255, 182, 73, 0.2);color: #FFFFFF;",
    selectdata:{
      
      isblack:false,
      isshow:"",//（ABC）食物名字，（北门南门外卖）商户名字
      islongshow:"",//（ABC）窗口位置,（北门南门外卖）商户位置
      //需要后端给个数据库去搞

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

  },
  isTake(e) {
    var that = this;
    if (e.currentTarget.dataset.take == "2") {
      //随机抽取
      that.setData({
        select: 0,
        oneShowlight: that.data.oneShowlight == 2 ? -1 : 2
      })
    } else if (e.currentTarget.dataset.take == "0") {
      that.setData({
        oneShowlight: that.data.oneShowlight == 0 ? -1 : 0

      })
    } else if (e.currentTarget.dataset.take == "1") {
      that.setData({
        oneShowlight: that.data.oneShowlight == 1 ? -1 : 1
      })

    }
    if (that.data.oneShowlight != -1) {
      setTimeout(function () {
          if (that.data.oneShowlight == 0) {
            that.setData({
              select: 0
            })
          } else if (that.data.oneShowlight == 1) {
            that.setData({
              select: 1,
            })

          }
        }

        , 300)
    }




  },
  onsit(e) {

    var that = this;


    var sitename;
    switch (e.currentTarget.dataset.site) {
      case "0":
        sitename = 0;

        break;
      case "1":
        sitename = 1;
        break;
      case "2":
        sitename = 2;
        break;
      case "3":
        sitename = 3;
        break;
      case "4":
        sitename = 4;
        break;
    }
    that.setData({
      twoShowlight: that.data.twoShowlight == sitename ? -1 : sitename

    })
    if (that.data.twoShowlight != -1) {
      setTimeout(function () {
        that.setData({
          select: 1,
        })
      }, 300)
    }


  },
  page(e) {
    var that = this;
    if (e.currentTarget.dataset.data == "next") {
      that.setData({
        select: that.data.select + 1 <= 1 ? that.data.select + 1 : that.data.select,
      })
    } else if (e.currentTarget.dataset.data == "pre") {
      that.setData({
        select: that.data.select - 1 >= 0 ? that.data.select - 1 : that.data.select,
      })
    }


  },
  turnhelp(){
    wx.navigateTo({
      url: '../FoodWhat/foodwhathelp/foodwhathelp'   

    })
  },
  subeat(e){

    var that=this
    
    that.setData({
      isselect:true,
    })

  }


})