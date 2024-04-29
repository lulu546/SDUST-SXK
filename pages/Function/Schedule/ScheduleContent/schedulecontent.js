// pages/prime/Page.js
/*
问题：
✔请求+渲染时间感知性太强
  1.将数据缓存在本地。
  已解决：有bug所以导致其时间缓慢
？共享课表
  1.目前采取的串行请求方式等会改成并行+定时器检测；
  2.共享课表渲染问题，会有两个人都没课的渲染和一个人没课的渲染不一样；
  3.add与刷新在共享课表的不同
  4.一打开共享课表就会自动请求当前课程
  ?按键的动画效果
✖新加课表功能
✖绑定共享课表功能
✔共享课表功能
  */
const app = getApp();
const api = require('../../../../API/qzapi');
const shareapi = require('../../../../API/shareapi');
var utils = require('../../../../utils/util');
const tableformat = require('../../../../utils/table');
var startX, endX;
var moveFlag = true;// 判断执行滑动事件

Page({

  /**
   * 页面的初始数据
   */
  data: {
    nowtimes: {
      month: new Date().getMonth() < 10 ? '0' + (new Date().getMonth() + 1) : new Date().getMonth() + 1,
      day: new Date().getDate() < 10 ? '0' + new Date().getDate() : new Date().getDate(),
      hour: new Date().getHours() < 10 ? '0' + new Date().getHours() : new Date().getHours(),
      minutes: new Date().getMinutes() < 10 ? '0' + new Date().getMinutes() : new Date().getMinutes()
    },
    week_ordinal: 1,//当前第几周
    shareflag: true,//这个是用于页面判断的默认项
    weekday: [],//一周的日期
    checked_value: false,//控制共享课表按钮是否打开
    /* ————————————————————————————*/
    //  此数据需要后端调取，其数据格式是[0]
    table1: [],
    table2: [],
    /* ————————————————————————————*/
    //  此数据需要后端调取，其数据格式反应是否已经绑定了共享课表
    set_schedule: {},
    chanceshare:null,
    chancenumber:null,
    scheduleResource:[]

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
    var that = this
    // 请求一周日期 begin
    var count_weekdaywhat = utils.count_weekday(0);
    that.setData({
      weekday: count_weekdaywhat
    })
    // 请求一周日期 end
    //请求配置&&课表&&周数
    var set_schedule = app.globalData.set_all_data;
    var share_schedule = app.globalData.set_all_data;
    var table_schedule = app.globalData.class_info;
    var week_ordinal = app.globalData.week_time;
    var scheduleresource=app.globalData.scheduleResource
    that.setData({
      set_schedule,
      table1: table_schedule,
      week_ordinal,
      chanceshare:wx.getStorageSync("chanceshare"),
      scheduleResource:scheduleresource
    })
    


  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {
  // 请求共享状态绑定API，并保存至APP的sharedata中
  const that = this;
  shareapi.getsharestate().then(res => {
    app.globalData.sharedata = res;
  }).catch(err => {
    // 获取课程表信息失败，处理错误
    wx.showToast({
      title: '请求失败',
      icon: 'error'
      })
    });

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
  //打开共享课表模式
  switchShare(e) {
    const that = this;
    const {  checked_value, shareflag, week_ordinal } = that.data;
    // app.globalData.sharedata.
    switch (that.data.chanceshare) {
      case "A":
        var bindshareflag = app.globalData.sharedata['CBindAState'];
        break;
      case "B":  
        var bindshareflag = app.globalData.sharedata['CBindBState'];
        break;  
      case "C":   
        var bindshareflag = app.globalData.sharedata['CBindCState'];
        break;  
      case "D":   
        var bindshareflag = app.globalData.sharedata['CBindDState'];
        break;  
      case "E":
        var bindshareflag = app.globalData.sharedata['CBindEState'];
        break;
      default:
        break;
    }

   
    const newshareflag = !shareflag;
    const value = !checked_value;
  
    that.setData({
      checked_value: value,
      shareflag: newshareflag
    });
    // 未绑定共享课表，跳转到绑定页面
    if (bindshareflag !== 3 && value === true) {
      that.setData({
        checked_value: false,
        shareflag: false
      });
      wx.navigateTo({
        url: '../BindSchedule/bindschedule',
      });
    }
    // 已绑定共享课表，请求数据
    if (bindshareflag == 3 && !newshareflag) {
      console.log(bindshareflag);
      switch (that.data.chanceshare) {
        case "A":
          that.setData({
            chancenumber : wx.getStorageSync('postnumA'),
          })
          break;
        case "B":  
          that.setData({  
            chancenumber : wx.getStorageSync('postnumB'),
          })  
          break;  
        case "C":   
           that.setData({  
            chancenumber : wx.getStorageSync('postnumC'),
          })  
          break;  
        case "D":   
          that.setData({  
            chancenumber : wx.getStorageSync('postnumD'),
          })  
          break;  
        case "E":
          that.setData({  
            chancenumber : wx.getStorageSync('postnumE'),
          }) 
          break;
        default:
          break;
      }
      console.log(bindshareflag);
        // 请求共享课表数据
        shareapi.getshareinfo(that.data.chanceshare,week_ordinal,that.data.chancenumber).then(res => {
          that.setData({
            table2:res,
            shareflag: newshareflag
          })
          console.log(res)
        }).catch(err => {
          console.log(err.data.message);
          // 获取课程表信息失败，处理错误
          wx.showToast({
            title: err.data.message,
            icon: 'error',
            duration: 2000,
            mask: true

          })
          that.setData({
            shareflag: !newshareflag,
            checked_value: !value,
          })
        })
    } else {
      that.setData({
        shareflag: newshareflag
      });
    }

  },
  
  // 左右更换课表
  weekchange(e,pn=0) {
    var that = this;
    var week_ordinal = that.data.week_ordinal;
    var utils = require('../../../../utils/util');
    if(pn!=0){
      // 左右跳转
      if (pn==1) {
        if (week_ordinal > 1) {
          week_ordinal--;
        } else {
          wx.showToast({
            title: '前面的道路以后再来探索吧！',
            icon: 'none'
          })
          return;
        }
      } else if (pn==2) {
        if (week_ordinal <= 19) {
          week_ordinal = week_ordinal + 1;
        } else {
          wx.showToast({
            title: '前面的道路以后再来探索吧！',
            icon: 'none'
          })
          return;
        }
      }

    }
    else{
        // 左右跳转
        if (e.target.dataset.change == "pre") {
          if (week_ordinal > 1) {
            week_ordinal--;
          } else {
            wx.showToast({
              title: '前面的道路以后再来探索吧！',
              icon: 'none'
            })
            return;
          }
        } else if (e.target.dataset.change == "next") {
          if (week_ordinal <= 19) {
            week_ordinal = week_ordinal + 1;
          } else {
            wx.showToast({
              title: '前面的道路以后再来探索吧！',
              icon: 'none'
            })
            return;
          }
        }
        console.log(week_ordinal);
    }
    // 更新周次
    var count_weekdaywhat = utils.count_weekday(week_ordinal - app.globalData.week_time);
    that.setData({
      weekday: count_weekdaywhat,
      week_ordinal: week_ordinal
    });
  
    // 请求课表数据
    var new_table1;
    var getClassInfoPromise = api.getClassInfo(wx.getStorageSync('useraccount'), app.globalData.current_time['xnxqh'], week_ordinal);

      // 请求双方课表数据
    if (that.data.checked_value == true) {
      // 请求我课表数据
      getClassInfoPromise.then(res => {
        if (res.length === 1) {
          new_table1=[];
        }
        else{
          new_table1 = tableformat.processTableOrd(res);
        }
        that.setData({
          table1: new_table1
        });
        app.globalData.todatabasesflag--;
        api.postclass(week_ordinal,res)
      }).catch((error) => {
        wx.showToast({
          title: '请求失败',
          icon: 'error'
        });
      });
 
    } else {
    // 单独请求我课表数据
    getClassInfoPromise.then(res => {
      if (res.length === 1) {
        new_table1=[];
      }
      else{
        new_table1 = tableformat.processTableOrd(res);
      }
      that.setData({
        table1: new_table1
      });
      app.globalData.todatabasesflag--;
      api.postclass(week_ordinal,res)
    }).catch((error) => {
      wx.showToast({
        title: '请求失败',
        icon: 'error'
      });
    });
    }
  },
  
  // 添加课程
  buttonadd() {
    wx.showToast({
      title: '正在开发课表绑定备忘录功能中ฅ˙Ⱉ˙ฅ',
      icon: 'none'
    })
    // wx.navigateTo({
    //   url: '../new_schedule/new_shedule',
    // })

  },
  // 刷新
  rechange() {

    var new_table1, new_table2
    var that = this
    var week_ordinal = that.data.week_ordinal
    var getClassInfoPromise = api.getClassInfo(wx.getStorageSync('useraccount'), app.globalData.current_time['xnxqh'], week_ordinal);

    if (that.data.checked_value == true) {
      //请求共享课表数据；串行
      // 等会改成并行的
      // 请求他课表数据
      var requestflag = 0;
      wx.request({
        url: app.globalData.TotalUrl + '/share-info/get/',
        method: 'POST',
        data: {
          account: wx.getStorageSync('useraccount'),
          password: wx.getStorageSync('userpws'),
          cont: 0,
          content: week_ordinal
        },
        header: {
          'content-type': 'application/json'
        },
        success: (res) => {

          // 将课表传输到schedule_table
          if (res.data["code"] >= 4000) {
            console.log("请求错误")
          }
          else {
            new_table2 = res.data
            requestflag++;
          }
        }
      })
      // 请求我课表数据
      wx.request({
        url: 'http://192.168.21.128:8000/qz/get_class_info/',
        method: 'POST',
        data: {
          account: wx.getStorageSync('useraccount'),
          token: getStorageSync('token'),
          cont: week_ordinal
        },
        header: {
          'content-type': 'application/json'
        },
        success: (res) => {
          // 将课表传输到schedule_table
          if (res.data["code"] >= 4000) {
            console.log("请求错误")
          }
          else {
            new_table1 = res.data
            requestflag++;
          }


        },
        fail: (res) => {
          //清楚登录状态
          wx.showToast({
            title: '请求失败',
            icon: 'error'
          })
        }

      })
      let RequestFlag = () => {
        if (requestflag == 2) {
          that.setData({
            table1: new_table1,
            table2: new_table2,
            week_ordinal: week_ordinal
          })
          clearTimeout(request);
        }

      }

      var request = setInterval(function () {

        RequestFlag()

      }, 100);


    }
    else {
      // 单独请求我课表数据
      getClassInfoPromise.then(res => {
        if (res.length === 1) {
          new_table1=[];
        }
        else{
          new_table1 = tableformat.processTableOrd(res);
        }
        that.setData({
          table1: new_table1
        });
        app.globalData.todatabasesflag--;
        api.postclass(week_ordinal,res)
      }).catch((error) => {
        wx.showToast({
          title: '请求失败',
          icon: 'error'
        });
      });

    }

  },
  //触摸板块
  touchStart: function (e) {
    startX = e.touches[0].pageX; // 获取触摸时的原点
    moveFlag = true;
  },
  // 触摸移动事件
  touchMove: function (e) {
    endX = e.touches[0].pageX; // 获取触摸时的原点
    if (moveFlag) {
      if (endX - startX > 50) {
        console.log("move right");
        this.weekchange(0,1);
        moveFlag = false;
      }
      if (startX - endX > 50) {
        console.log("move left");
        this.weekchange(0,2);
        moveFlag = false;
      }
    }

  },
  // 触摸结束事件
  touchEnd: function (e) {
    moveFlag = true; // 回复滑动事件

  },


  turnshareset() {
    wx.navigateTo({

      url: '../BindSchedule/bindschedule',

    })
  }






})