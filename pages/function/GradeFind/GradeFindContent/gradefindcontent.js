// pages/Function/GradeFind/GradeFindContent/gradefindcontent.js
const app = getApp();
const api = require('../../../../API/qzapi');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    datalist1:[],//用于接收成绩的相关信息
    datalist2:[],//用于接收成绩的相关信息
    timelist:[],//存放学期的集合，提供选择
    basetime:'',//当进入该页面中，获取当年的学期，从而进行其他学期的定义，根据basetime写附近几个学期进timelist中，因为我们要选择更换学期，从而查询不同学期的成绩，因此不能把nowdate作为基准，否则学期列表不固定，本质和nowdata一样
    nowdate:'',//用于获得当前的学期
    nowyear:'',//当前所在年份，用于判断当前学期
    nowmonth:'',//当前月份
    nowday:'',//当前天份
    islogin:'',//是否处于登录状态
    num:'',//第几学期
    firstyear:'',//学期的前一个部分
    lastyear:'',//学期的后一部分
    totalnum:0,//每一学期的课程数
    totalcredit:0,//每一学期的总学分
    totalGPA:0,//每学期的总绩点
    weighting_GPA:0,//每学期的加权绩点
    GPA:0,
    set_schedule:{},
    checked_value:false,//控制共享课表按钮是否打开
    shareflag:true,//这个是用于页面判断的默认项
    postnum:-1
  },
  //计算加权绩点，放入getdate和bindPickerChange中,前者用于初始，后者用于更改学期后的计算
  Calculate_grades(flag){
    var that=this
    var i;
    var a=0;//记录课程数
    var b=0;//记录总学分
    var c=0;//非公选绩点*学分的和
    var d=0;//绩点*学分的和
    var f=0;//记录非公选课程数
    //加权绩点计算
    console.log(flag)
    if(flag!=1){
      for(i=0;that.data.datalist1[i];i++){
        if(that.data.datalist1[i].xqmc==that.data.nowdate){
          // 课程数计算
          a++;
  
          //加权绩点的计算
          //暂时只考虑了优良中三种情况，不及格的之后进行更新
          if(that.data.datalist1[i].kclbmc!='公选'){
            f++;
            //总学分的计算
            b+=that.data.datalist1[i].xf;
            if(that.data.datalist1[i].zcj=='优')c+=4.5*that.data.datalist1[i].xf;
            else if(that.data.datalist1[i].zcj=='良')c+=3.5*that.data.datalist1[i].xf;
            else if(that.data.datalist1[i].zcj=='中')c+=2.5*that.data.datalist1[i].xf;
            else if(that.data.datalist1[i].zcj=='及格')d+=1.5*that.data.datalist1[i].xf;
            else if(that.data.datalist1[i].zcj=='不及格')d+=0*that.data.datalist1[i].xf;
            else{
              if(that.data.datalist1[i].zcj>=60)c+=((that.data.datalist1[i].zcj/10)-5).toFixed(2)*that.data.datalist1[i].xf;
            }
            //平均绩点的计算
            if(that.data.datalist1[i].zcj=='优')d+=4.5;
            else if(that.data.datalist1[i].zcj=='良')d+=3.5;
            else if(that.data.datalist1[i].zcj=='中')d+=2.5;
            else if(that.data.datalist1[i].zcj=='及格')d+=1.5;
            else if(that.data.datalist1[i].zcj=='不及格')d+=0;
            else{
              if(that.data.datalist1[i].zcj>=60)d+=((that.data.datalist1[i].zcj/10)-5).toFixed(2)*1;
              }

            }
          }
        }
      }
    
    else{
      
      for(i=0;that.data.datalist2[i];i++){
        if(that.data.datalist2[i].xqmc==that.data.nowdate){
          // 课程数计算
          a++;
          //加权绩点的计算
          //暂时只考虑了优良中三种情况，不及格的之后进行更新
          if(that.data.datalist2[i].kclbmc!='公选'){
            f++;
            //总学分的计算
            b+=that.data.datalist2[i].xf;
            
            if(that.data.datalist2[i].zcj=='优')c+=4.5*that.data.datalist2[i].xf;
            else if(that.data.datalist2[i].zcj=='良')c+=3.5*that.data.datalist2[i].xf;
            else if(that.data.datalist2[i].zcj=='中')c+=2.5*that.data.datalist2[i].xf;
            else{
              c+=((that.data.datalist2[i].zcj/10)-5).toFixed(2)*that.data.datalist2[i].xf;
            }
            //平均绩点的计算
            if(that.data.datalist2[i].zcj=='优')d+=4.5;
            else if(that.data.datalist2[i].zcj=='良')d+=3.5;
            else if(that.data.datalist2[i].zcj=='中')d+=2.5;
            else{
              d+=((that.data.datalist2[i].zcj/10)-5).toFixed(2)*1;
            }
          }
        }
      }
    }

    that.setData({
      totalnum:a.toFixed(2),
      totalcredit:b.toFixed(2),
      weighting_GPA:(c/b).toFixed(2),
      GPA:(d/f).toFixed(2)
    })
  },
  //获取当前的学期
  getdate(){
    // console.log(new Date().toISOString().substring(0, 10));
    var mytime=new Date();
    var that=this
    that.setData({
      nowyear:mytime.getFullYear(),
      nowmonth:mytime.getMonth(),
      nowday:mytime.getDate(),
    })
    //进行学期时间的处理,将日期转化为学期
    //本年9到12月为本年到下一年的第一个学期
    if(that.data.nowmonth>=9)that.setData({
      // nowdate:that.data.nowyear+"-"+(that.data.nowyear+1)+"-1",
      nowdate:"2021-2022-2",
      num:1,
      firstyear:that.data.nowyear,
      lastyear:that.data.nowyear+1
    })
    //本年0月到1月末是上一年到本年的第一个学期
    else if(that.data.nowmonth<2)that.setData({
      nowdate:(that.data.nowyear-1)+"-"+(that.data.nowyear)+"-1",
      num:1,
      firstyear:that.data.nowyear-1,
      lastyear:that.data.nowyear
    })
    //本年2到8月末是上一年到本年的第二学期
    else {
      that.setData({
        nowdate:(that.data.nowyear-1)+"-"+(that.data.nowyear)+"-2",
        num:2,
        firstyear:that.data.nowyear-1,
        lastyear:that.data.nowyear
      })
    }
    //定义学期列表
    if(that.data.num==1){
      that.setData({
        timelist:[
          (that.data.firstyear)+"-"+(that.data.lastyear)+"-1",
          (that.data.firstyear-1)+"-"+(that.data.lastyear-1)+"-2",
          (that.data.firstyear-1)+"-"+(that.data.lastyear-1)+"-1",
          (that.data.firstyear-2)+"-"+(that.data.lastyear-2)+"-2",
          (that.data.firstyear-2)+"-"+(that.data.lastyear-2)+"-1",
          (that.data.firstyear-3)+"-"+(that.data.lastyear-3)+"-2",
          (that.data.firstyear-3)+"-"+(that.data.lastyear-3)+"-1",
          (that.data.firstyear-4)+"-"+(that.data.lastyear-4)+"-2",
          (that.data.firstyear-4)+"-"+(that.data.lastyear-4)+"-1",
          (that.data.firstyear-5)+"-"+(that.data.lastyear-5)+"-2",
          (that.data.firstyear-5)+"-"+(that.data.lastyear-5)+"-1"
        ]
      })
    }
    else{
      that.setData({
        timelist:[
          (that.data.firstyear)+"-"+(that.data.lastyear)+"-2",
          (that.data.firstyear)+"-"+(that.data.lastyear)+"-1",
          (that.data.firstyear-1)+"-"+(that.data.lastyear-1)+"-2",
          (that.data.firstyear-1)+"-"+(that.data.lastyear-1)+"-1",
          (that.data.firstyear-2)+"-"+(that.data.lastyear-2)+"-2",
          (that.data.firstyear-2)+"-"+(that.data.lastyear-2)+"-1",
          (that.data.firstyear-3)+"-"+(that.data.lastyear-3)+"-2",
          (that.data.firstyear-3)+"-"+(that.data.lastyear-3)+"-1",
          (that.data.firstyear-4)+"-"+(that.data.lastyear-4)+"-2",
          (that.data.firstyear-4)+"-"+(that.data.lastyear-4)+"-1",
          (that.data.firstyear-5)+"-"+(that.data.lastyear-4)+"-2",
          (that.data.firstyear-5)+"-"+(that.data.lastyear-4)+"-1"
        ]
      })
    }
    if(that.data.checked_value==true)that.Calculate_grades(1);
    else  that.Calculate_grades()
    console.log(that.data.timelist)
  },
  //获取选择的学期
  bindPickerChange: function(e) {
    var that=this
    that.setData({
      nowdate: that.data.timelist[e.detail.value]
    })
    if(that.data.checked_value==true)that.Calculate_grades(1);
    else  that.Calculate_grades()
  },
  //用于获取成绩信息，放于Onready函数中，加载前读取，直接显示
  getgrades(){
    let that=this;
    api.getGradeInfo(wx.getStorageSync('useraccount'),).then(res => {
      that.setData({
        datalist1:res
      })
      console.log(res)
      that.getdate();
    // 计算成绩
    that.Calculate_grades()

    }).catch(err => {
      // 获取课程表信息失败，处理错误
      wx.showToast({
        title: '请求失败',
        icon: 'error'
      })
    });


  },
  
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    var that=this
    setTimeout(() => {
      that.setData({
        islogin:wx.getStorageSync('islogin'),
      })
    }, 10);
    
    // 读取设置
    var set_schedule=app.globalData.set_all_data;
    that.setData({
      set_schedule,
    })
    that.getgrades();
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
// 切换共享设置
  turnshareset(){
    wx.navigateTo({
 
      url: '../BindGrade/bindgrade',
    
     })
  },
  // 切换共享
  switchShare(e){
    var that=this
    //就是说这个这是一个switch每按一次就会执行一次内容，所以！shareflag就相当于我每按一次
    // 就得把这个开关的开始和结束重置。所以我们只需要在shareflag=true的时候进行请求数据就欧克
    var newshareflag=!that.data.shareflag
    //这个newshareflag是指的我是否打开共享课表
    var bindshareflag=that.data.set_schedule.GBindState
    var postnum=that.data.set_schedule.GBindNumber
    //这个bindshareflag是指的我共享课表是否被绑定
    var value=!that.data.checked_value
    that.setData({
      checked_value:value,
      postnum
    })
    //未绑定的情况
    if(bindshareflag!=3&&value==true){
      
      console.log(e.detail.value)
      that.setData({
        checked_value:false
      })
      wx.navigateTo({
 
        url: '../BindSchedule/bindschedule',
      
       })
    }
    // 如果已经绑定的话，就会对shareflag进行赋值换句话说就会有资格展示共享课表信息与否；
    if(bindshareflag==3){
      console.log(newshareflag)
      if(!newshareflag){
        var new_datalist2
        //--------并行线
                //请求共享课表数据；串行
        // 等会改成并行的
        // 请求他课表数据
        wx.request({
          url: app.globalData.TotalUrl+'/qz/share-info/get/',
          method: 'POST',
          data: {
            account: wx.getStorageSync('useraccount'),
            password: wx.getStorageSync('userpws'),
            cont: 1
          },
          header: {
            'content-type': 'application/json'
          },
          success: (res) => {
            
            // 将课表传输到schedule_table
            if (res.data["code"] >= 4000) {
              console.log("请求错误")
            }
            else{
              new_datalist2=res.data
              that.setData({
                datalist2:new_datalist2,
              })
              if(that.data.checked_value==true)that.Calculate_grades(1);
            }
          }
        })
      
        //--------并行线
      }
      that.setData({
      shareflag:newshareflag
    })

  
  }
   
  },
  // 彩蛋
  Eggs(){
    wx.showToast({
      title: '祝你门门满分！',
      icon:'none'
    })

  }


})