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
  */
Page({

  /**
   * 页面的初始数据
   */
  data: {
    useraccount:'',//用户账户
    userpws:'',//用户密码
    isshow:false,//是否显示密码
    _src:'/static/image/hidepws.png',//隐藏的图片，初始均为不可见
    islogin:true,//是否登录
    istemp:false,//账号验证是否正确
  },
    //将账号和密码进行传参到后端，返回值为ispermit,判断是否允许
  getdatalist(){
    let that=this;
    wx.request({
      url: 'http://127.0.0.1:5000/get_login_info',
      method:'POST',
      data:{
        account:this.data.useraccount,
        password:this.data.userpws
      },
      header:{
        'content-type':'application/json'      
        //后端生成cookie然后请求的时候把cookie发过去，然后我们进行加工。
      },
      success: (res) => {
        // 将用户的cookie存入至本地
        wx.setStorageSync('cookiesstr', res.data);
        console.log(res.data);
        that.setData({
          istemp:true
        })
      }
      
    })
    
  },
    
  //进行登录的设置
  loginTo(){
    var that=this;
    let {useraccount, userpws} = this.data;
        // 前端验证
        if(!useraccount){
          wx.showToast({
            title: '学号不能为空',
            icon: 'none'
          })
          return;
        }
        let phoneReg = /^\d{12}$/;
        if(!phoneReg.test(useraccount)){
          wx.showToast({
            title: '学号格式错误',
            icon: 'none'
          })
          return;
        }
        if(!userpws){
          wx.showToast({
            title: '密码不能为空',
            icon: 'none'
          })
          return;
        }
      
        var status;
        that.getdatalist(); //后端判定
        setTimeout(()=>
        {
          status=this.data.istemp;
          //登录成功
          if(status){
            wx.showToast({
              title: '登录成功',
              icon: "success"
            });
            this.setData({
              islogin:true
            }) 
            wx.setStorageSync('useraccount', this.data.useraccount);
            wx.setStorageSync('userpws', this.data.userpws);
            wx.setStorageSync('islogin', this.data.islogin);
            wx.switchTab({
              url: '../home/home',
            });
        
          }
          //密码或账号错误
          else{
            wx.showToast({
              title: '账号或密码错误',
              icon: "error"
            });
            this.setData({
              userpws:'',
              useraccount:''
            });
          }
         
          
          
        }, 100)
      
  },
  
  // 改变密码状态
  changeshow(){
    if(this.data.isshow){
      this.setData({
        _src:'/static/image/hidepws.png',
        isshow:false
      })
    }
    else{
      this.setData({
        _src:'/static/image/showpws.png',
        isshow:true
      })
    }
  },
  //获取账号名
  getaccount(e){
    this.setData({
      useraccount:e.detail.value
    })
  },
  //获取密码
  getpassword(e){
    this.setData({
      userpws:e.detail.value
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
        var _this=this;
        _this.setData({
          useraccount:wx.getStorageSync('useraccount'),
          userpws:wx.getStorageSync('userpws'),
          islogin:wx.getStorageSync('islogin')
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