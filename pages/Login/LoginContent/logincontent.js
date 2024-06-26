// pages/login/login.js
/*
关于建立请求的两种方式：
1.后端撰写相关cookie，然后前端向后端登录请求后获取cookie，然后cookie用于登录。
  -技术力不够
  -现在无法测试
2.前端存储账号密码，然后发送请求的时候使用账号密码去进行请求。✔
  -可以实现
  -不是主流方案?但是我不是数据库，我是爬虫。
  -有点麻烦，每次后端都要与强智建立链接，效率低
3.先别管，反正就一个后端，后期有后端开发再搞。
  -傻宝
4.后端登录后把session发到前端，然后前端请求数据带一个sesson，然后我做的就是一个转接，去把请求发到强智上。
  -正确的，中肯的
  -要写一个在session失效的时候要进行续约。
  -？session有问题，session在python是建立契约的方式，一个python程序只能带一个session。
     session不是cookie，但session中好像携带看看能不能实现。
5.session一下把所有数据都拿来，不如2。

血的教训
请求失败是前端请求失败！就算我返回404他也是属于请求成功的。
  */


Page({

  /**
   * 页面的初始数据
   */
  data: {
    useraccount: '', //用户账户
    userpws: '', //用户密码
    isshow: false, //是否显示密码
    _src: '/static/image/hidepws.png/', //隐藏的图片，初始均为不可见
    islogin: true, //是否登录
    isAgreement: false,
    isShowAgreement: false


  },


  //将账号和密码进行传参到后端，返回值为ispermit,判断是否允许

  checkAgreement() {
    var that = this;
    var isShowAgreement_ = that.data.isShowAgreement
    that.setData({
      isShowAgreement: !isShowAgreement_
    })
  },
  changeAgreement() {
    var that = this;
    var isAgreement_ = that.data.isAgreement;
    that.setData({
      isAgreement: !isAgreement_
    });
    console.log(isAgreement_, that.data.isAgreement)
    wx.setStorageSync('isAgreement', that.data.isAgreement)
  },


  //进行登录的设置
  loginTo() {
    const app = getApp();
    app.globalData.todatabasesflag = 0;
    app.globalData.requestflag = 0;
    var that = this;
    let {
      useraccount,
      userpws,
      isAgreement
    } = that.data;

    // 前端验证
    if (!isAgreement) {
      wx.showToast({
        title: '请同意用户协议',
        icon: 'error'
      });
      return;
    }

    if (!useraccount) {
      wx.showToast({
        title: '学号不能为空',
        icon: 'error'
      });
      return;
    }

    let phoneReg = /^\d{12}$/;
    if (!phoneReg.test(useraccount)) {
      wx.showToast({
        title: '学号格式错误',
        icon: 'error'
      });
      return;
    }

    if (!userpws) {
      wx.showToast({
        title: '密码不能为空',
        icon: 'error'
      });
      return;
    }

    // 后端鉴权
    wx.request({
      url: 'https://jwgl.sdust.edu.cn/app.do',
      method: 'GET',
      data: {
        "method": "authUser",
        "xh": useraccount,
        "pwd": userpws
      },
      header: {
        "Referer": "http://www.baidu.com",
        "Accept-encoding": "gzip, deflate, br",
        "Accept-language": "zh-CN,zh-TW;q=0.8,zh;q=0.6,en;q=0.4,ja;q=0.2",
        "Cache-control": "max-age=0"
      },
      success: (res) => {
        if (res.data["flag"] == "0") {
          wx.setStorageSync('islogin', false);
          wx.showToast({
            title: '密码错误',
            icon: "error"
          });
        } else if (res.data["flag"] == "1") {
          wx.setStorageSync('token', res.data["token"]);
          wx.setStorageSync('islogin', true);
          wx.showToast({
            title: '登录成功',
            icon: "success"
          });
          that.setData({
            islogin: true
          });
          wx.setStorageSync('useraccount', that.data.useraccount);
          wx.setStorageSync('userpws', that.data.userpws);

          const api = require('../../../API/qzapi');
          api.only_data(wx.getStorageSync('useraccount'));
          wx.reLaunch({
            url: '../../Home/HomeContent/homecontent',
          });
        } else {
          wx.setStorageSync('islogin', false);
          wx.showToast({
            title: '未知错误',
            icon: "error"
          });
        }
      },
      fail: (res) => {
        wx.showToast({
          title: '网络请求失败',
          icon: 'error'
        });
      }
    });
  },

  // 改变密码状态
  changeshow() {
    var that = this;
    if (that.data.isshow) {
      that.setData({
        _src: '/static/image/hidepws.png',
        isshow: false
      })
    } else {
      that.setData({
        _src: '/static/image/showpws.png',
        isshow: true
      })
    }
  },
  //获取账号名
  getaccount(e) {

    var that = this
    that.setData({
      useraccount: e.detail.value
    })
  },
  //获取密码
  getpassword(e) {
    var that = this
    that.setData({
      userpws: e.detail.value
    })
  },
  // //忘记密码跳转
  // forget(){
  //   wx.navigateTo({
  //     url: '/pages/login/tiaozhuan',
  //   })
  // },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    //页面加载时，从微信缓存读取账号密码
    var that = this;

    that.setData({
      useraccount: wx.getStorageSync('useraccount'),
      userpws: wx.getStorageSync('userpws'),
      islogin: wx.getStorageSync('islogin')
    })
    try {
      var isAgreement = wx.getStorageSync('isAgreement');
      if (isAgreement !== null) {
        // 这里设置 isAgreement 到 data 使得页面正确显示状态
        that.setData({
          isAgreement: isAgreement
        });
      }
    } catch (e) {
      console.log('Failed to retrieve data from storage: ', e);
    }


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