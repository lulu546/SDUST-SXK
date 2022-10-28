// pages/FoodWhat/foodwhat.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 滑动翻页
    startX: 0, //开始x坐标
    startY: 0, //开始y坐标
    isTakeaway: true, //false是堂食，true是外卖记录数据的
    isWhere: "不知道", //A餐，B餐，C餐，北门，南门
    isScore: 5, //大于几分
    select: 0,//选择标识
    oneShowlight: -1,//第一轮单选标识
    lightbutton: "background: #FFA319;box-shadow: 0px 10px 20px rgba(255, 182, 73, 0.2);color: #FFFFFF;"
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

    console.log(that.data.Showlight)
    if (e.currentTarget.dataset.take == "all") {
      //随机抽取
      that.setData({
        isTakeaway: true,
        select:3,
        oneShowlight: that.data.oneShowlight == 2 ? -1 : 2
      })
    }

    that.setData({
      select:1,
    })

    console.log(e.currentTarget.dataset.take == "true")
    if (e.currentTarget.dataset.take == "true") {
      console.log(that.data.isTakeaway == true ? null : true)
      that.setData({
        isTakeaway: that.data.isTakeaway == true ? null : true,
        oneShowlight: that.data.oneShowlight == 0 ? -1 : 0

      })
    } else if (e.currentTarget.dataset.take == "flase") {
      that.setData({
        isTakeaway: that.data.isTakeaway == false ? null : false,
        oneShowlight: that.data.oneShowlight == 1 ? -1 : 1
      })

    }

  },
  onsit(e) {

    var that = this;

    that.setData({
      thrid: true,
      second: false
    })
    var sitename;
    switch (e.currentTarget.dataset.site) {
      case "A餐":
        sitename=0;

        break;
      case "B餐":
        sitename=1;
        break;
      case "C餐":
        sitename=2;
        break;
      case "北门":
        sitename=3;
        break;
      case "南门":
        sitename=4;
        break;
    }
    that.setData({
      isWhere: e.currentTarget.dataset.site,
      twoShowlight: that.data.oneShowlight == 0 ? -1 : 0

    })



  }









})