Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: {
      avatarUrl: "../../images/default.png",
      country: "",
      province: "",
      city: "",
      gender: 0,
      language: "zh_CN",
      nickName: "未登录/注册"
    },
    encrypted_data:"",
    iv:"",
    tip: "点击头像可登录/注册",
    avatar: "../../images/default.png",
    showLogin: false,
    isLogin: false,
    js_code: ""
  },

  close() {
    this.setData({
      showLogin: false
    });
  },
  show() {
    if (!this.data.isLogin) {
      this.setData({
        showLogin: true
      });
    }
  },
  login() {
    let that = this;
    // 获取微信用户信息
    wx.getUserProfile({
      desc: '完善会员信息',
      lang: 'zh_CN',
      success(res) {
        console.log(res);
        // 存储用户信息
        wx.setStorage({
          key: 'userInfo',
          data: JSON.stringify(res.userInfo),
          success(rs) {
            that.setData({
              userInfo: res.userInfo,
              tip: "欢迎使用本程序",
              isLogin: true,
              encrypted_data:res.encryptedData,
              iv:res.iv
            });
            that.close();
            // 登录获取code
            wx.login({
              timeout: 2000,
              success: (result) => {
                let js_code = result.code;
                that.sendCode(js_code);
                that.setData({ js_code });
              }
            });
          }
        });
      }
    });
  },
  getPhoneNumber(e){
    console.log(e);
  },
  sendCode(js_code) {
    let encrypted_data = this.data.encrypted_data;
    let iv = this.data.iv;
    // 获取session_key
    wx.request({
      url: 'http://127.0.0.1:8000/login?js_code=' + js_code,
      method: "GET",
      success(res) {
        // 获取本地存储session_key
        if (res.data.msg == 'success') {
          wx.request({
            url: 'http://127.0.0.1:8000/get_encrypted_data',
            method:"POST",
            data:{iv,encrypted_data},
            header:{
              "Content-Type":"application/x-www-form-urlencoded;charset=utf-8;"
            },
            success(res){
              console.log(res);
            }
          });
        }
      }
    });
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    let that = this;
    wx.checkSession({
      success: (r2) => {
        if (r2.errMsg == "checkSession:ok") {
          wx.getStorage({
            key: "userInfo",
            success(r3) {
              that.setData({
                userInfo: JSON.parse(r3.data),
                isLogin: true
              });
            }
          });
        }
      },
    });
  }
})
