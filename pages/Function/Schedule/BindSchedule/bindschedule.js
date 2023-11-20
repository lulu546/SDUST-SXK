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
    postnumA: '', 
    postnumB: '', 
    postnumC: '', 
    postnumD: '', 
    postnumE: '', 
    currentIndex: 0,
    pressStatus : false,//按钮颜色
    chanceshare:""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
   
    var that =this;

    shareapi.getsharestate().then(res => {
      that.setData({
        sharedata:app.globalData.sharedata
      })

      var sharedata=app.globalData.sharedata;
      var student_info=app.globalData.student_info

      that.setData({
        student_info,
        chanceshare:wx.getStorageSync('chanceshare'),
        postnumA: sharedata["CBindANumber"]!=-1?sharedata["CBindANumber"]:"", 
        postnumB: sharedata["CBindBNumber"]!=-1?sharedata["CBindBNumber"]:"", 
        postnumC: sharedata["CBindCNumber"]!=-1?sharedata["CBindCNumber"]:"", 
        postnumD: sharedata["CBindDNumber"]!=-1?sharedata["CBindDNumber"]:"", 
        postnumE: sharedata["CBindENumber"]!=-1?sharedata["CBindENumber"]:""
      })
      // 将数据存储到本地缓存
      wx.setStorageSync('postnumA', that.data.postnumA);
      wx.setStorageSync('postnumB', that.data.postnumB);
      wx.setStorageSync('postnumC', that.data.postnumC);
      wx.setStorageSync('postnumD', that.data.postnumD);
      wx.setStorageSync('postnumE', that.data.postnumE);

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
      postnumA,
      postnumB,
      postnumC,
      postnumD,
      postnumE,
    } = that.data;
    switch (cont) {
      case "A":
        that.setData({
          postnum : postnumA
        })
        break;
      case "B":  
        that.setData({  
          postnum : postnumB,  
        })  
        break;  
      case "C":   
         that.setData({  
          postnum : postnumC,  
        })  
        break;  
      case "D":   
        that.setData({  
          postnum : postnumD,  
        })  
        break;  
      case "E":
        that.setData({  
          postnum : postnumE,  
        }) 
        break;
      default:
        break;
    }
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

    if (postnum==wx.getStorageSync('useraccount')) {
      wx.showToast({
        title: '不准调皮！',
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
    that.setData({
      postnum:postnum
    })
    shareapi.postsharestate(postnum,cont,false).then(res => {
      // 读取页面本地缓存的数据
      switch (cont) {
        case "A":
          that.setData({
            sharedata: app.globalData.sharedata, 
            postnumA: wx.getStorageSync('postnumA'),
    
          })
          break;
        case "B":
          that.setData({
            sharedata: app.globalData.sharedata,
            postnumB: wx.getStorageSync('postnumB'),

          })
          break;
        case "C":
          that.setData({
            sharedata: app.globalData.sharedata,
            postnumC: wx.getStorageSync('postnumC'),  
          })
          break;
        case "D":
          that.setData({
            sharedata: app.globalData.sharedata,  
            postnumD: wx.getStorageSync('postnumD'),
          }) 
          break;
        case "E":
          that.setData({
            sharedata: app.globalData.sharedata,  
            postnumE: wx.getStorageSync('postnumE'),
          }) 
          break;
        default: 
          break;  
      }
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
  CancelPostTo(e){
    var that = this;
    let {
      postnumA,
      postnumB,
      postnumC,
      postnumD,
      postnumE,
    } = that.data;
    var cont= e.currentTarget.dataset.cont;
    //将postman至为输入的数
    switch (cont) {
      case "A":
        that.setData({
          postnum : postnumA
        })
        break;
        case "B":  
        that.setData({  
          postnum : postnumB,  
        })  
        break;  
      case "C":   
         that.setData({  
          postnum : postnumC,  
        })  
        break;  
      case "D":   
        that.setData({  
          postnum : postnumD,  
        })  
        break;  
      case "E":
        that.setData({  
          postnum : postnumE,  
        }) 
        break;
      default:
        break;
    }
    let {
      postnum
    } = that.data;
    
    shareapi.postsharestate(postnum,cont,true).then(res => {
      // 读取页面本地缓存的数据
      switch (cont) {
        case "A":
          that.setData({
            sharedata: app.globalData.sharedata, 
            postnumA: wx.getStorageSync('postnumA'),
    
          })
          break;
        case "B":
          that.setData({
            sharedata: app.globalData.sharedata,
            postnumB: wx.getStorageSync('postnumB'),

          })
          break;
        case "C":
          that.setData({
            sharedata: app.globalData.sharedata,
            postnumC: wx.getStorageSync('postnumC'),  
          })
          break;
        case "D":
          that.setData({
            sharedata: app.globalData.sharedata,  
            postnumD: wx.getStorageSync('postnumD'),
          }) 
          break;
        case "E":
          that.setData({
            sharedata: app.globalData.sharedata,  
            postnumE: wx.getStorageSync('postnumE'),
          }) 
          break;
        default: 
          break;  
      }
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
    var postnumstring='postnum'+cont
    wx.setStorageSync(postnumstring, "");
    if(wx.getStorageSync("chanceshare")==cont)wx.setStorageSync("chanceshare", "");
  },
  ReplyPostTo(e){
    var that = this;

    var cont= e.currentTarget.dataset.cont;
    let {
      postnumA,
      postnumB,
      postnumC,
      postnumD,
      postnumE,
    } = that.data;
    switch (cont) {
      case "A":
        that.setData({
          postnum : postnumA
        })
        break;
        case "B":  
        that.setData({  
          postnum : postnumB,  
        })  
        break;  
      case "C":   
         that.setData({  
          postnum : postnumC,  
        })  
        break;  
      case "D":   
        that.setData({  
          postnum : postnumD,  
        })  
        break;  
      case "E":
        that.setData({  
          postnum : postnumE,  
        }) 
        break;
      default:
        break;
    }
    let {
      postnum
    } = that.data;
    shareapi.replysharestate(postnum,cont,true).then(res => {
       // 读取页面本地缓存的数据
       switch (cont) {
        case "A":
          that.setData({
            sharedata: app.globalData.sharedata, 
            postnumA: wx.getStorageSync('postnumA'),
    
          })
          break;
        case "B":
          that.setData({
            sharedata: app.globalData.sharedata,
            postnumB: wx.getStorageSync('postnumB'),

          })
          break;
        case "C":
          that.setData({
            sharedata: app.globalData.sharedata,
            postnumC: wx.getStorageSync('postnumC'),  
          })
          break;
        case "D":
          that.setData({
            sharedata: app.globalData.sharedata,  
            postnumD: wx.getStorageSync('postnumD'),
          }) 
          break;
        case "E":
          that.setData({
            sharedata: app.globalData.sharedata,  
            postnumE: wx.getStorageSync('postnumE'),
          }) 
          break;
        default: 
          break;  
      }
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
    var cont= e.currentTarget.dataset.cont;
    switch (cont) {
      case "A":
        that.setData({
          postnumA: e.detail.value
        })
        break;
      case "B":
        that.setData({
          postnumB: e.detail.value
        })
        break;
      case "C":
        that.setData({
          postnumC: e.detail.value
        })
        break;
      case "D":
        that.setData({
          postnumD: e.detail.value
        })
        break;
      case "E":
        that.setData({
          postnumE: e.detail.value
        })
        break;
      default:
        break;
    }

  },
  chanceonly(e){
    var that=this
    var cont= e.currentTarget.dataset.cont;
    switch (cont) {
      case "A":
        that.setData({
          chanceshare : "A"
        })
        wx.setStorageSync("chanceshare", "A");
        break;
        case "B":  
        that.setData({  
          chanceshare : "B"  
        })  
        wx.setStorageSync("chanceshare", "B");
        break;  
      case "C":   
         that.setData({  
          chanceshare : "C"
        })  
        
        wx.setStorageSync("chanceshare", "C");
        break;  
      case "D":   
        that.setData({  
          chanceshare : "D"
        })  
        
        wx.setStorageSync("chanceshare", "D");
        break;  
      case "E":
        that.setData({  
          chanceshare : "E"
        })       
        wx.setStorageSync("chanceshare", "E");
        break;
      default:
        break;
    }
    wx.showToast({
      title: '( ´◔︎ ‸◔︎`)点我干嘛！',
      icon:'none'
    })

  }
})