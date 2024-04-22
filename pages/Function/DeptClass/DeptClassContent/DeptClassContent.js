// pages/Function/DeptClass/DeptClassContent/DeptClassContent.js
const shareapi=require('../../../../API/shareapi')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    //加入或新建或退出部门状态
    is_create_department:false,//是否在创建部门
    is_join_department:false,//是否在加入部门
    is_quit_department:false,//是否退出部门
    department_num:0,//创建或加入是哪个部门的行为
    //创建部门页面
    current_department_name:'',//创建部门名
    //后端url
    url:"https://www.sxksxk.work/",
    //四个部门的数据
      //名称
      department_name:{
        name1:'',
        name2:'',
        name3:'',
        name4:'',
      },
      //暗号
      department_invitation:{
        code1:'',
        code2:'',
        code3:'',
        code4:'',
      },
    //加入部门时输入的部门邀请码
    invitation_id:'',
    //当前数组
    current_datalist:[],
    //当前部门
    departmentflag:'',//第几个部门，A,B,C
  },
//00 全局函数
  //初始化函数
  init_datalist(){
    shareapi.getsharestate().then(res=>{
      console.log("then")
      this.setData({
        department_name:{
          name1:(res.DepartNameA==null?'':res.DepartNameA),
          name2:(res.DepartNameB==null?'':res.DepartNameB),
          name3:(res.DepartNameC==null?'':res.DepartNameC),
          name4:(res.DepartNameD==null?'':res.DepartNameD),
        },
        department_invitation:{
          code1:res.BindDepartA,
          code2:res.BindDepartB,
          code3:res.BindDepartC,
          code4:res.BindDepartD,
        }
      })
    })
    .catch(res=>{
      wx.showToast({
        title: '部门信息获取失败',
        icon:'error'
      })
    })
  },
  //获取当前的部门名和code
  get_current_name(flag){
    var list1=this.data.department_name
    var list2=this.data.department_invitation
    if(flag=='A')return [list1.name1,list2.code1]
    if(flag=='B')return [list1.name2,list2.code2]
    if(flag=='C')return [list1.name3,list2.code3]
    if(flag=='D')return [list1.name4,list2.code4]
  },

//01 初始页面函数
  //01_1 点击创建或加入部门，跳转到添加页面
  add_department(e){
    //是第几个部门
    var id=e.detail.cont
    //是新建部门还是加入部门
    var kind =e.detail.kind
    if(kind==1)this.setData({
      is_create_department:true,
      department_num:id,
    })
    else if(kind==2){
      this.setData({
        is_join_department:true,
        department_num:id,
      })
    }
    //进入页面原来的数据清除
    this.setData({
      current_department_name:'',
      invitation_id:'',
      departmentflag:id,
    })
  },

  //01_2 点击已经创建好的部门模块，进行课表查看
  click_to_classpage(e){
    //判断是哪个部门
    this.setData({
      departmentflag:e.detail.cont
    })
    //将对应部门的数值赋给current_datalist
    var name=e.detail.name
    this.setData({
      current_department_name:name
    })
    //判断当前数组是否为空，不为空则继续进行,获取时间相关信息
    if(name!=''){
      //切换页面
      wx.navigateTo({
        url: '../DeptClassShow/DeptClassShow?departmentflag='+this.data.departmentflag+'&name='+name,
      })

    }
  },
//02 创建部门页面函数
  //02_1 点击非窗口部分，关闭shade
  close_create_shade(e){
    var whichpart=e.detail.page
    if(this.data.is_create_department==true&&whichpart==1)this.setData({
      is_create_department:false
    })
    if(this.data.is_join_department==true&&whichpart==2)this.setData({
      is_join_department:false
    })
    if(this.data.is_quit_department==true&&whichpart==3)this.setData({
      is_quit_department:false
    })

    this.setData({
      department_num:'',
    })
  },
  //02_2 部门名和部门邀请码监听函数
  get_created_department_msg(e){
    var content=e.detail.content
    var kind=e.detail.kind
    if(kind==1)this.setData({
      current_department_name:content
    })
    else this.setData({
      invitation_id:content
    })

  },
  //02_3 点击“确认”创建新部门
  confirm_add_department(){
    var name=this.data.current_department_name
    //如果名字不为空，创建新部门
    if(name!=''){
      //创建部门
      wx.showLoading({
        title: '部门创建中~',
      })
      //创建部门，并关闭加载，显示请求结果
      shareapi.createdepartment(this.data.departmentflag,this.data.current_department_name)
      .catch(res=>{
        wx.showToast({
          title: '创建失败',
          icon:'error'
        })
      })
      .then(res=>{
        if(res.dept!=''){
          this.init_datalist()
          wx.hideLoading({
            success: (res) => {
                wx.showToast({
                  title: '部门创建成功~',
                }
              )
            },
          })
        }
        else{
          wx.hideLoading({
            success:(res)=>{
              wx.showToast({
                title: '创建失败，请重试',
                icon:'error'
              })
            }
          })
        }
      })

      //返回初始界面
      this.setData({
        is_create_department:false,
      })
      
    }
    // 如果名字为空，提示
    else {
      wx.showToast({
        title: '部门名称不可空',
        icon:'error'
      })
    }
    

  },
  //02_4 点击“退出部门”进入推出部门界面
  quit_department(e){
    this.setData({
      is_quit_department:true,
      departmentflag:e.detail.cont
    })
    var flag=this.data.departmentflag
    var list=this.get_current_name(flag)
    var _name=list[0]
    var _id=list[1]
    this.setData({
      current_department_name:_name,
      invitation_id:_id,
    })
  },

//03 加入部门的页面
  //03_1 确认加入的监听事件****
  confirm_join_department(){
    //加入部门
    var _invitation_id=this.data.invitation_id
    if(_invitation_id.length>0){
      wx.showLoading({
        title: '加入部门中~',
      })
      shareapi.joindepartment(_invitation_id,this.data.departmentflag)
      .then(res=>{
        if(res.success==true){
          wx.hideLoading({
            success:(res)=>{
              wx.showToast({
                title: '加入成功~',
              })
            }
          })
        }
        else{
          wx.hideLoading({
            success:(res)=>{
              wx.showToast({
                title: '请求失败',
                icon:'error'
              })
            }
          })
        }
        this.init_datalist()
      })
      .catch(res=>{
        wx.hideLoading({
          success:(res)=>{
            wx.showToast({
              title: '请求失败',
              icon:'error'
            })
          }
        })
      })
      //返回初始页面
      this.setData({
        is_join_department:false,
      })
    }
    // 邀请码为空
    else wx.showToast({
      title: '邀请码为空',
      icon:'error'
    })
    
  },
//04 退出部门
  //04_1 确认退出部门
  confirm_quit_department(){
    //退出部门
    shareapi.exitdepartment(this.data.departmentflag).then(res=>{
      wx.showToast({
        title: '退出成功~',
      })
    })
    shareapi.deletedepartment(this.data.invitation_id)
    this.setData({
      is_quit_department:false
    })
    //初始化页面
    this.init_datalist()
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
    //初始化
    this.init_datalist()
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {
    // this.init_datalist()
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
  
  
})