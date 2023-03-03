// pages/Function/CourseLib/CourseLibContent/courselibcontent.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    likename:"",
    page:1,
    toweek:NaN,
    likedata:[
      {
          "model": "ConQZ.likesinfo",
          "pk": 1,
          "fields": {
              "Groupname": "山科地下八英里",
              "QQGroupNumber": "1093549829",
              "InfoContent": "山科八英里代表山科给你最精彩的说唱演出！",
              "LikesStatic": ""
          }
      },
      {
          "model": "ConQZ.likesinfo",
          "pk": 2,
          "fields": {
              "Groupname": "山科SmartRobot",
              "QQGroupNumber": "960441279",
              "InfoContent": "山科SmartRobot纳新群，欢迎大家来玩！",
              "LikesStatic": ""
          }
      },
      {
          "model": "ConQZ.likesinfo",
          "pk": 3,
          "fields": {
              "Groupname": "阿巴阿巴",
              "QQGroupNumber": "691478474",
              "InfoContent": "阿巴阿巴...测试专用！",
              "LikesStatic": ""
          }
      }
  ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {

    var that = this;

    wx.request({
      url: 'http://192.168.21.128:8000/qz/get_phonebook_info/',
      method: 'POST',
      data: {
        likename:"",
        page:1,
 
      },
      header: {
        'content-type': 'application/json'
      },
      success: (res) => {
        that.data.likedata = res.data
        that.setData({
          likedata : res.data
        })
      }
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
  weekchange(e){
    //左右跳转
    var that=this;

    var _page=that.data.page;
      if(e.target.dataset.change=="pre"){
       console.log(_page)
      if(_page>1){_page--;}
      else{
        wx.showToast({
          title: '已经到了尽头咧！',
          icon:'none'
        })
        return ;}
        
        wx.request({
          url: 'http://192.168.21.128:8000/qz/get_phonebook_info/',
          method: 'POST',
          data: {
            likename:that.data.likename,
            page:_page,
      
          },
          header: {
            'content-type': 'application/json'
          },
          success: (res) => {
            that.setData({
              likedata : res.data,
              page:_page
            })
          }
        })

      }
      else if(e.target.dataset.change=="next"){
        if(that.data.likedata[0].length==0){
          wx.showToast({
            title: '到达世界最高峰！',
            icon:'none'
          })
          return ;

        }
        
        _page=_page+1;
 
          wx.request({
            url: 'http://192.168.21.128:8000/qz/get_phonebook_info/',
            method: 'POST',
            data: {
              likename:that.data.likename,
              page:_page,
    
            },
            header: {
              'content-type': 'application/json'
            },
            success: (res) => {
      
              that.setData({
                likedata : res.data,
                page:_page
              })
            }
          })
  
        
      }

  },
  getlikename(e) {
    this.setData({
      likename: e.detail.value
    })
  },

  find(){
    var that=this
    console.log("SDSA")
    wx.request({
      url: 'http://192.168.21.128:8000/qz/get_phonebook_info/',
      method: 'POST',
      data: {
        likename:that.data.likename,
        page:1,

      },
      header: {
        'content-type': 'application/json'
      },
      success: (res) => {

        that.setData({
          likedata : res.data,

        })
      }
    })

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