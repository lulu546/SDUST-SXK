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
    

  },
  XiaoGuologinTo(){
    var that =this;
    const app = getApp()
    app.globalData.xiaoguotest = true//小郭测试
    app.globalData.class_info= [
      [
      [
      [],
      [],
      [],
      [],
      []
      ],
      [
      "数字逻辑",
      "J7-104室",
      "李智恒",
      "#849B91",
      []
      ],
      [
      [],
      [],
      [],
      [],
      []
      ],
      [
      [],
      [],
      [],
      [],
      []
      ],
      [
      [],
      [],
      [],
      [],
      []
      ]
      ],
      [
      [
      [],
      [],
      [],
      [],
      []
      ],
      [
      "物联网技术概论",
      "J7-213室",
      "杨玉婷",
      "#B4746B",
      []
      ],
      [
      [],
      [],
      [],
      [],
      []
      ],
      [
      [],
      [],
      [],
      [],
      []
      ],
      [
      [],
      [],
      [],
      [],
      []
      ]
      ],
      [
      [
      [],
      [],
      [],
      [],
      []
      ],
      [
      [],
      [],
      [],
      [],
      []
      ],
      [
      [],
      [],
      [],
      [],
      []
      ],
      [
      "数字逻辑实验",
      "J13-232室",
      "申晨",
      "#99857E",
      []
      ],
      [
      [],
      [],
      [],
      [],
      []
      ]
      ],
      [
      [
      [],
      [],
      [],
      [],
      []
      ],
      [
      [],
      [],
      [],
      [],
      []
      ],
      [
      [],
      [],
      [],
      [],
      []
      ],
      [
      "劳动教育",
      "J1-226室",
      "杨治宽",
      "#91A0A5",
      []
      ],
      [
      "劳动教育",
      "JZ",
      "杨治宽",
      "#91A0A5",
      []
      ]
      ],
      [
      [
      [],
      [],
      [],
      [],
      []
      ],
      [
      "物联网技术概论",
      "J7-213室",
      "杨玉婷",
      "#B4746B",
      []
      ],
      [
      [],
      [],
      [],
      [],
      []
      ],
      [
      [],
      [],
      [],
      [],
      []
      ],
      [
      [],
      [],
      [],
      [],
      []
      ]
      ],
      [
      [
      [],
      [],
      [],
      [],
      []
      ],
      [
      [],
      [],
      [],
      [],
      []
      ],
      [
      [],
      [],
      [],
      [],
      []
      ],
      [
      [],
      [],
      [],
      [],
      []
      ],
      [
      [],
      [],
      [],
      [],
      []
      ]
      ],
      [
      [
      [],
      [],
      [],
      [],
      []
      ],
      [
      [],
      [],
      [],
      [],
      []
      ],
      [
      [],
      [],
      [],
      [],
      []
      ],
      [
      [],
      [],
      [],
      [],
      []
      ],
      [
      [],
      [],
      [],
      [],
      []
      ]
      ]
      ]
    app.globalData.student_info= {
      "bj": "物联网工程2021-1",
      "dh": null,
      "dqszj": "2021",
      "email": null,
      "fxzy": "无",
      "ksh": "20370116100989",
      "nj": "2021",
      "qq": null,
      "rxnf": "2020",
      "usertype": "2",
      "xb": "男",
      "xh": "202001041412",
      "xm": "鹿诚龙",
      "xz": 4,
      "yxmc": "计算机科学与工程学院",
      "zymc": "物联网工程"
  }
    app.globalData.current_time= {e_time: "2022-12-18", s_time: "2022-12-12", xnxqh: "2022-2023-1", zc: 16}
    app.globalData.week_time= 16
    console.log(app.globalData.xiaoguotest)
    that.setData({
      islogin: true
    })
    console.log(wx.getStorageSync('islogin'))
    wx.reLaunch({//重定向
      url: '../../Home/HomeContent/homecontent',
    })
    wx.setStorageSync('islogin', true);


  },

  //将账号和密码进行传参到后端，返回值为ispermit,判断是否允许
  getdatalist() {
    var that = this;
  },

  //进行登录的设置
  loginTo() {
    var that = this;
    let {
      useraccount,
      userpws
    } = this.data;

    // 前端验证
    if (!useraccount) {
      wx.showToast({
        title: '学号不能为空',
        icon: 'error'
      })
      return;
    }
    let phoneReg = /^\d{12}$/;
    if (!phoneReg.test(useraccount)) {
      wx.showToast({
        title: '学号格式错误',
        icon: 'error'
      })
      return;
    }
    if (!userpws) {
      wx.showToast({
        title: '密码不能为空',
        icon: 'error'
      })
      return;
    }
    //后端鉴权
    //后端鉴权有个核心问题，你没办法保证你的你在规定时间里获得request里的信息。
    //request的函数是回调函数
    wx.request({
      url: 'http://192.168.21.128:8000/qz/get_login_info/',
      method: 'POST',
      data: {
        account: that.data.useraccount,
        password: that.data.userpws
      },
      header: {
        'content-type': 'application/json'
        //后端生成cookie然后请求的时候把cookie发过去，然后我们进行加工。
      },
      success: (res) => {
        if (res.data["code"] == 4000) {
          wx.setStorageSync('islogin', false);
          console.log("内部参数不全")
        }
        if (res.data["code"] == 4001) {
          wx.setStorageSync('islogin', false);
          wx.showToast({
            title: '无法从强智读取信息（可能密码错误）',
            icon: "error"
          });
        }
        else if (!res.data["JSESSIONID"]) {
          wx.setStorageSync('islogin', false);

        }
        // 将用户的cookie存入至本地
        else {
          wx.setStorageSync('cookiesstr', res.data);
          wx.setStorageSync('islogin', true);
        }
        var status = wx.getStorageSync('islogin');
        console.log("请求了~")
        //登录成功
        if (status) {
          wx.showToast({
            title: '登录成功',
            icon: "success"
          });
          that.setData({
            islogin: true
          })
          wx.setStorageSync('useraccount', that.data.useraccount);
          wx.setStorageSync('userpws', that.data.userpws);
          console.log(wx.getStorageSync('islogin'))
          wx.reLaunch({//重定向
            url: '../../Home/HomeContent/homecontent',
          })
        }
        
      },
      fail: (res) => {
        wx.showToast({
          title: '网络请求失败',
          icon: 'error'
        })
      }
    })
  },

  // 改变密码状态
  changeshow() {
    var that=this;
    console.log("41241")
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
    this.setData({
      useraccount: e.detail.value
    })
  },
  //获取密码
  getpassword(e) {
    this.setData({
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
    var _this = this;
    _this.setData({
      useraccount: wx.getStorageSync('useraccount'),
      userpws: wx.getStorageSync('userpws'),
      islogin: wx.getStorageSync('islogin')
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

  }
})