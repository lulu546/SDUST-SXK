// pages/reshareschedule/resharesch.js
const app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    set_all_data:null,
    student_info:null,
    postnum: '', //用户账户
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    wx.request({
      url: 'http://192.168.21.128:8000/qz/get_share_state/',
      method: 'POST',
      data: {
        account: wx.getStorageSync('useraccount'),
        password: wx.getStorageSync('userpws')
      },
      header: {
        'content-type': 'application/json'
      },
      success: (res) => {
        if(res.data["code"] >= 4000){}
        else{
          app.globalData.set_all_data.GBindState= res.data["GBindState"]
          app.globalData.set_all_data.GBindNumber= res.data["GBindNumber"]
          if(res.data["GBindNumber"]!=-1){
            that.setData({
              set_all_data:app.globalData.set_all_data,
              postnum:res.data["GBindNumber"]
            })
          }
          else{
            that.setData({
              set_all_data:app.globalData.set_all_data,
              postnum:''
            })
          }

        }
      }
    })
  //上来先读数
  var that =this;
  var set_all_data=app.globalData.set_all_data;
  var student_info=app.globalData.student_info
  that.setData({
    set_all_data,
    student_info
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
    wx.request({
      url: 'http://192.168.21.128:8000/qz/get_share_state/',
      method: 'POST',
      data: {
        account: wx.getStorageSync('useraccount'),
        password: wx.getStorageSync('userpws')
      },
      header: {
        'content-type': 'application/json'
      },
      success: (res) => {
        if(res.data["code"] >= 4000){}
        else{
          app.globalData.set_all_data.GBindState = res.data["GBindState"]
          app.globalData.set_all_data.GBindNumber = res.data["GBindNumber"]
          that.setData({
            set_all_data:app.globalData.set_all_data,
            postnum:wx.getStorageSync('postnum')
          })
        }
      }
    })
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
  PostTo() {
    var that = this;
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
    wx.request({
      url: 'http://192.168.21.128:8000/qz/post_share_info/',
      method: 'POST',
      data: {
        account: wx.getStorageSync('useraccount'),
        password: wx.getStorageSync('userpws'),
        cont:0,
        cancel:false,
        postnum:postnum
      },
      header: {
        'content-type': 'application/json'
        //后端生成cookie然后请求的时候把cookie发过去，然后我们进行加工。
      },
      success: (res) => {
        if (res.data["code"] >= 4000) {

          wx.showToast({
            title: '请求失败喵~',
            icon: "error"
          });
        }
        else if (res.data["code"] == 2000) {
          // 再次请求
          wx.request({
            url: 'http://192.168.21.128:8000/qz/get_share_state/',
            method: 'POST',
            data: {
              account: wx.getStorageSync('useraccount'),
              password: wx.getStorageSync('userpws')
            },
            header: {
              'content-type': 'application/json'
            },
            success: (res) => {
              if(res.data["code"] >= 4000){}
              else{
                app.globalData.set_all_data.GBindState = res.data["GBindState"]
                app.globalData.set_all_data.GBindNumber = res.data["GBindNumber"]
                that.setData({
                  set_all_data:app.globalData.set_all_data,
                  postnum:wx.getStorageSync('postnum')
                })
              }
            }
          })
          wx.setStorageSync('postnum', postnum);

        }
      },
      fail: (res) => {
        wx.showToast({
          title: '请求失败喵~',
          icon: 'error'
        })
      }
    })
  },
  CancelPostTo(){
    var that = this;
    var postnum=that.data.postnum;
    wx.request({
      url: 'http://192.168.21.128:8000/qz/post_share_info/',
      method: 'POST',
      data: {
        account: wx.getStorageSync('useraccount'),
        password: wx.getStorageSync('userpws'),
        cont:0,
        cancel:true,
        postnum:postnum
      },
      header: {
        'content-type': 'application/json'
        //后端生成cookie然后请求的时候把cookie发过去，然后我们进行加工。
      },
      success: (res) => {
        if (res.data["code"] >= 4000) {
          wx.showToast({
            title: '请求失败喵~',
            icon: "error"
          });
        }
        else if (res.data["code"] == 2000) {
          wx.setStorageSync('postnum', "");
          wx.request({
            url: 'http://192.168.21.128:8000/qz/get_share_state/',
            method: 'POST',
            data: {
              account: wx.getStorageSync('useraccount'),
              password: wx.getStorageSync('userpws')
            },
            header: {
              'content-type': 'application/json'
            },
            success: (res) => {
              if(res.data["code"] >= 4000){}
              else{
                app.globalData.set_all_data.GBindState= res.data["GBindState"]
                app.globalData.set_all_data.GBindNumber= res.data["GBindNumber"]
                that.setData({
                  set_all_data:app.globalData.set_all_data,
                  postnum:wx.getStorageSync('postnum')
                })
              }
            }
          })
          

        }
      },
      fail: (res) => {
        wx.showToast({
          title: '请求失败喵~',
          icon: 'error'
        })
      }
    })
  },
  ReplyPostTo(){
    var that = this;
    var postnum=that.data.postnum;
    wx.request({
      url: 'http://192.168.21.128:8000/qz/reply_share_info/',
      method: 'POST',
      data: {
        account: wx.getStorageSync('useraccount'),
        password: wx.getStorageSync('userpws'),
        cont:0,
        reply:true,
        postnum:postnum
      },
      header: {
        'content-type': 'application/json'
        //后端生成cookie然后请求的时候把cookie发过去，然后我们进行加工。
      },
      success: (res) => {
        if (res.data["code"] >= 4000) {
          wx.showToast({
            title: '请求失败喵~',
            icon: "error"
          });
        }
        else if (res.data["code"] == 2000) {
          wx.setStorageSync('postnum', postnum);
          wx.request({
            url: 'http://192.168.21.128:8000/qz/get_share_state/',
            method: 'POST',
            data: {
              account: wx.getStorageSync('useraccount'),
              password: wx.getStorageSync('userpws')
            },
            header: {
              'content-type': 'application/json'
            },
            success: (res) => {
              if(res.data["code"] >= 4000){}
              else{
                app.globalData.set_all_data.GBindState= res.data["GBindState"]
                app.globalData.set_all_data.GBindNumber= res.data["GBindNumber"]
                that.setData({
                  set_all_data:app.globalData.set_all_data,
                })
              }
            }
          })
          

        }
      },
      fail: (res) => {
        wx.showToast({
          title: '请求失败喵~',
          icon: 'error'
        })
      }
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