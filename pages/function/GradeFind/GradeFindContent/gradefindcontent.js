// pages/Function/GradeFind/GradeFindContent/gradefindcontent.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    datalist:[],//用于接收成绩的相关信息
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
    GPA:0
  },
  //计算加权绩点，放入getdate和bindPickerChange中,前者用于初始，后者用于更改学期后的计算
  Calculate_grades(){
    var i;
    var a=0;//记录课程数
    var b=0;//记录总学分
    var c=0;//绩点*学分的和
    for(i=0;this.data.datalist[i];i++){
      if(this.data.datalist[i].xqmc==this.data.nowdate){
        // 课程数计算
        a++;
        //总学分的计算
        if(this.data.datalist[i].kclbmc=='必修')b+=this.data.datalist[i].xf;
        //绩点的计算
        //暂时只考虑了优良中三种情况，不及格的之后进行更新
        if(this.data.datalist[i].kclbmc=='必修'){
          if(this.data.datalist[i].zcj=='优')c+=4.5*this.data.datalist[i].xf;
          else if(this.data.datalist[i].zcj=='良')c+=3.5*this.data.datalist[i].xf;
          else if(this.data.datalist[i].zcj=='中')c+=2.5*this.data.datalist[i].xf;
          else{
            c+=((this.data.datalist[i].zcj/10)-5).toFixed(2)*this.data.datalist[i].xf;
          }
        }
        
      }
    }
    this.setData({
      totalnum:a.toFixed(2),
      totalcredit:b.toFixed(2),
      weighting_GPA:(c/b).toFixed(2)
    })
  },
  //获取当前的学期
  getdate(){
    // console.log(new Date().toISOString().substring(0, 10));
    var mytime=new Date();
    this.setData({
      nowyear:mytime.getFullYear(),
      nowmonth:mytime.getMonth(),
      nowday:mytime.getDate(),
    })
    //进行学期时间的处理,将日期转化为学期
    //本年9到12月为本年到下一年的第一个学期
    if(this.data.nowmonth>=9)this.setData({
      // nowdate:this.data.nowyear+"-"+(this.data.nowyear+1)+"-1",
      nowdate:"2021-2022-2",
      num:1,
      firstyear:this.data.nowyear,
      lastyear:this.data.nowyear+1
    })
    //本年0月到1月末是上一年到本年的第一个学期
    else if(this.data.nowmonth<2)this.setData({
      nowdate:(this.data.nowyear-1)+"-"+(this.data.nowyear)+"-1",
      num:1,
      firstyear:this.data.nowyear-1,
      lastyear:this.data.nowyear
    })
    //本年2到8月末是上一年到本年的第二学期
    else {
      this.setData({
        nowdate:(this.data.nowyear-1)+"-"+(this.data.nowyear)+"-2",
        num:2,
        firstyear:this.data.nowyear-1,
        lastyear:this.data.nowyear
      })
    }
    //定义学期列表
    if(this.data.num==1){
      this.setData({
        timelist:[
          (this.data.firstyear)+"-"+(this.data.lastyear)+"-1",
          (this.data.firstyear-1)+"-"+(this.data.lastyear-1)+"-2",
          (this.data.firstyear-1)+"-"+(this.data.lastyear-1)+"-1",
          (this.data.firstyear-2)+"-"+(this.data.lastyear-2)+"-2",
          (this.data.firstyear-2)+"-"+(this.data.lastyear-2)+"-1",
          (this.data.firstyear-3)+"-"+(this.data.lastyear-3)+"-2",
          (this.data.firstyear-3)+"-"+(this.data.lastyear-3)+"-1",
          (this.data.firstyear-4)+"-"+(this.data.lastyear-4)+"-2",
          (this.data.firstyear-4)+"-"+(this.data.lastyear-4)+"-1",
        ]
      })
    }
    else{
      this.setData({
        timelist:[
          (this.data.firstyear)+"-"+(this.data.lastyear)+"-2",
          (this.data.firstyear)+"-"+(this.data.lastyear)+"-1",
          (this.data.firstyear-1)+"-"+(this.data.lastyear-1)+"-2",
          (this.data.firstyear-1)+"-"+(this.data.lastyear-1)+"-1",
          (this.data.firstyear-2)+"-"+(this.data.lastyear-2)+"-2",
          (this.data.firstyear-2)+"-"+(this.data.lastyear-2)+"-1",
          (this.data.firstyear-3)+"-"+(this.data.lastyear-3)+"-2",
          (this.data.firstyear-3)+"-"+(this.data.lastyear-3)+"-1",
          (this.data.firstyear-4)+"-"+(this.data.lastyear-4)+"-2",
          (this.data.firstyear-4)+"-"+(this.data.lastyear-4)+"-1",
        ]
      })
    }
    this.Calculate_grades()
    console.log(this.data.timelist)
  },
  //获取选择的学期
  bindPickerChange: function(e) {
    this.setData({
      nowdate: this.data.timelist[e.detail.value]
    })
    this.Calculate_grades()
  },
  //用于获取成绩信息，放于Onready函数中，加载前读取，直接显示
  getgrades(){
    let that=this;
    wx.request({
      url: 'http://192.168.21.128:8000/qz/get_grade_info/',
      method:'POST',
      data:{
        account: wx.getStorageSync('useraccount'),
        password: wx.getStorageSync('userpws'),
        cookiesstr:wx.getStorageSync('cookiesstr'),
      },
      header:{
        'content-type':'application/json'      
      },
      success: (res) => {
        that.setData({
          datalist:res.data
        })
        console.log(res.data)
        that.getdate();
        // wx.setStorageSync('datalist', res.data)
        // // this.data.datalist=res.data
        // console.log(this.data.datalist)
      },
      fail: (res) => {
        //清楚登录状态
        wx.showToast({
          title: '请求失败',
          icon: 'error'
        })
      },
    })
    that.Calculate_grades()
  },
  
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    setTimeout(() => {
      this.setData({
        islogin:wx.getStorageSync('islogin'),
        // datalist:wx.getStorageSync('datalist')
      })
    }, 10);
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {
    this.getgrades();

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

  turnshareset(){
    wx.navigateTo({
 
      url: '../BindGrade/bindgrade',
    
     })
  },
  switchShare(e){
    var that=this
    //就是说这个这是一个switch每按一次就会执行一次内容，所以！shareflag就相当于我每按一次
    // 就得把这个开关的开始和结束重置。所以我们只需要在shareflag=true的时候进行请求数据就欧克
    var newshareflag=!that.data.shareflag
    //这个newshareflag是指的我是否打开共享课表
    var bindshareflag=that.data.set_schedule.CBindState
    //这个bindshareflag是指的我共享课表是否被绑定
    var value=!that.data.checked_value
    that.setData({
      checked_value:value
    })
    //未绑定的情况
    if(bindshareflag!=3&&value==true){
      
      console.log(e.detail.value)
      this.setData({
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
        var new_table1,new_table2
        var requestflag=0
        //--------并行线
                //请求共享课表数据；串行
        // 等会改成并行的
        // 请求他课表数据
        wx.request({
          url: 'http://192.168.21.128:8000/qz/get_share_info/',
          method: 'POST',
          data: {
            account: wx.getStorageSync('useraccount'),
            password: wx.getStorageSync('userpws'),
            cont: 0,
            content:that.data.week_ordinal
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
              new_table2=res.data
              requestflag++;
            }
          }
        })
        // 请求我课表数据
        wx.request({
          url: 'http://192.168.21.128:8000/qz/get_class_info/',
          method:'POST',
          data:{
            account:wx.getStorageSync('useraccount'),
            cookiesstr:wx.getStorageSync('cookiesstr'),
            cont:that.data.week_ordinal
          },
          header:{
            'content-type':'application/json'      
          },
          success: (res) => {
            // 将课表传输到schedule_table
            if (res.data["code"] >= 4000) {
              console.log("请求错误")
            }
            else{
              new_table1=res.data
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
          if(requestflag==2){
            that.setData({
              table1:new_table1,
              table2:new_table2,
            })
            clearTimeout(request);
          }
          
       }
 
        var request =setInterval(function(){

          RequestFlag()
    
        }, 100);

      
        //--------并行线
      }
      that.setData({
      shareflag:newshareflag
    })}
   
  },
})