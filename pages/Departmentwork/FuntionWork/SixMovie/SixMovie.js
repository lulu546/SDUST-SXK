// pages/function/function.js
  /**
   电影投票的业务逻辑
   点击进行弹窗界面，是否确认投票；
   点击否，则取消；
   点击是，执行投票任务
      投票任务具象实现；
      1.每次打开会从后端读取此用户是否投过票,然后放置到全局变量
      2.投过票的会进行相应记录，存放到全局变量存储
    
   */
Page({

  /**
   * 页面的初始数据
   */
  data: {
    islogin:false,
    functions:[
      
          {
            src:'/image/jishiben.jpg',
            name:'那些年，我们一起追过的女孩',
            id:0,
            backgroundcolor: '#5374A5;',
            shadow:'0px 10px 20px rgba(102, 125, 159, 0.2);'
          },
          {
            src:'/image/jishiben.jpg',
            name:'那些年，我们一起追过的女孩',
            id:1,
            backgroundcolor: '#5374A5;',
            shadow:'0px 10px 20px rgba(102, 125, 159, 0.2);'
          },
          
      // ,
          // {
          //   src:'/image/jishiben.jpg',
          //   name:'备忘录',
          //   id:2,
          //   backgroundcolor: '#00C67E;',
          //   shadow:'0px 10px 20px rgba(36, 209, 147, 0.2);'
          // },
          // {
          //   src:'/image/jishiben.jpg',
          //   name:'部门业务',
          //   id:3,
          //   backgroundcolor: '#FF574D;',
          //   shadow:'0px 10px 20px rgba(255, 101, 91, 0.2);'
          // }

        
      
    ]
  },
  turnpage(e){
    var that=this;
 
     if(e.currentTarget.dataset.tar=="0"){
      wx.showModal({  
        title: 'QAQ',  
        content: '确认投给本电影吗？',  
        success: function(res) {  
            if (res.confirm) {  
            console.log('用户点击确定')  

            } else if (res.cancel) {  
            
            console.log('用户点击取消')  
            }  
        }  
    })   

    }
    else if(e.currentTarget.dataset.tar=="1"){
      wx.showModal({  
        title: 'QAQ',  
        content: '确认投给本电影吗？',  
        success: function(res) {  
            if (res.confirm) {  
            console.log('用户点击确定')  

            } else if (res.cancel) {  
            
            console.log('用户点击取消')  
            }  
        }  
    })  
    }
   




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