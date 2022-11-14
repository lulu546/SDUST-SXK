// pages/home/home.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

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