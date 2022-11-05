// pages/home/home.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    //获取的学期状态，用于测试
    datalist:{
      zc:'',
      xnxqh:'',
    },
    flag:false,//是否隐藏新建事件页面
    starttime:'',//开始时间
    endtime:'',//结束时间
    isrepeat:false,//是否事件名重复
    // ishavedata:0,//是否之前有
    // isstart:0,//是否渲染
    isshow:0,//是否显示添加事件的界面
    isdelete:false,//长按后是否显示删除元素界面，true时显示删除界面
    event:'',//添加的事件名
    time:'',//日期，用于计算差多少天
    other:'',//备注
    num:0,//事件列表的元素
    //颜色列表
    colorlist:[
      {color:'#4E11D1'},
      {color:'#FFD60A'},
      {color:'#32D748'},
      {color:'#64D2FF'},
      {color:'#FF2D55'},
      {color:'#5E5CE6'},
    ],
    //暂存一个事件对象
    _class:{
      _event:'',
      _data:'',
      color:''
    },
    //事件列表
    classlist:[
    ]
  },
  // //确认删除该事件
  // confirm_delete(){
    // this.setData({
    //   isdelete:false,
    //   event:'',//使event为空，防止新建时读取对应的event
    // })
  // },
  // //取消删除该事件
  // nodelete(){
  //   this.setData({
  //     isdelete:false,
  //     event:'',//使event为空，防止新建时读取对应的event
  //   })
  // },
  //修改事件
  changeitem(){
    this.setData({
      isdelete:false,
      event:'',//使event为空，防止新建时读取对应的event
      //显示新增事件页面进行修改
    })
  },
  //删除事件
  deleteitem(){
    this.setData({
      isdelete:false,
      event:'',//使event为空，防止新建时读取对应的event
    })
  },
  //取消事件
  refusedelete(){
    this.setData({
      isdelete:false,
      event:'',//使event为空，防止新建时读取对应的event
    })
  },
    //获取事件名
    getevent(e){
      this.setData({
        event:e.detail.value,
        isrepeat:false//初始都为不重复
      })
      for(var i in this.data.classlist){
        if(e.detail.value==this.data.classlist[i]._event){
          this.setData({
            isrepeat:true
          })
        }
        // console.log(this.data.classlist[i])
      }
    },
    //获取时间
    gettime(e){
      this.setData({
        time:e.detail.value
      })
    },
    //获取备注
    getother(e){
      this.setData({
        other:e.detail.value
      })
    },
    //获取长按开始时间，用于进行删除操作的判定
    getstarttime(e){
      this.setData({
        starttime:e.timeStamp
      })
      // console.log(this.data.starttime)
    },
    //获取长按结束时间
    getendtime(e){
      this.setData({
        endtime:e.timeStamp
      })
      console.log(this.data.endtime)
      var touchtime=this.data.endtime-this.data.starttime
      console.log(touchtime)
      if(touchtime>300){
        this.setData({
          isdelete:true,
          event:e.target.dataset.event
        })
      }
      
    },
    // 点击新建事件按钮
    addlist(){
      this.setData({
        flag:false,
        isshow:1
      })
    },
  // 新建页面的确定按钮
  makesure(){
    if(this.data.event=='')wx.showToast({
      title: '事件名不可为空',
      icon:'error'
    })
    else if(this.data.time=='')wx.showToast({
      title: '请设置时间',
      icon:'error'
    })
    else if(this.data.isrepeat){
      wx.showToast({
        title: '事件名重复',
        icon:'error'
      })
    }
    else {
      this.setData({
        flag:true,
        //添加所写内容到列表中
        _class:{
          _event:this.data.event,
          _data:this.data.time,
          color:this.data.colorlist[this.data.num%6].color
        },
        num:this.data.num+1,
        // 清空所写的东西
        event:'',
        time:'',
        other:'',
        // isstart:1
      });
      // 将内容添加到datalist中
      this.setData({
        classlist:[...this.data.classlist,this.data._class],
      })
      this.setData({
        classlist:this.data.classlist.sort(function(a,b){
          return a._data-b._data
        })
      })
      wx.setStorageSync('classlist', this.data.classlist),
      wx.setStorageSync('num', this.data.num)
    }

    // console.log(this.data.classlist)
  },
  //新建页面的取消按钮
  notsure(){
    // wx.setStorageSync('classlist', []),
    //   wx.setStorageSync('num', 0)
    this.setData({
      flag:true,
      //清空所写的东西
      event:'',
      time:'',
      other:''
    })
  },
  //获取学期信息
  getdatalist(){
    wx.request({
      url: 'http://127.0.0.1:5000/get_current_time',
      method:'GET',
      header:{
        'content-type':'application/json'
      },
      success:(res)=>{
        this.setData({
          datalist:{
            zc:res.data["zc"],
            xnxqh:res.data["xnxqh"]
          }
        })
        // console.log(res.data)
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    // this.getdatalist()
    this.setData({
      flag:true,
    })
    this.setData({
      classlist:[...this.data.classlist,...wx.getStorageSync('classlist')],
      num:wx.getStorageSync('num')
    })

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {
    this.setData({
      flag:true
    })
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