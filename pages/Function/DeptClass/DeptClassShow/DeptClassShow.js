// pages/Function/DeptClass/DeptClassShow/DeptClassShow.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    //时间参数
      //01 当前哪一天
      currentday:[],
      //02 当前一周的第几天
      week_day:'',
      //03 本周时间
      current_week_time:[],
      //哪一周的课表
      week_num:17,
      //每天的标记
      week_flag:['Mon','Tue','Wed','Thu','Fri','Sat','Sun'],
      // 当前时间
      nowtime:[new Date().getFullYear(),new Date().getMonth()+1,new Date().getDate()],
    //部门信息
      //当前部门名称
      department_name:'',
      //部门成员
      department_members:[],
      //部门号
      departmentflag:'',
      //部门当前课表数据（有课人员）
      current_datalist:[],
      //部门当前课表数据（无课人员）
      current_datalist01:[],
      //部门当前课表数据（最后显示）
      current_datalist02:[],
      //当前节次的人员
      current_class_datalist:[],
    //选中和状态判断
      //该部门成员是否选中
      is_selected_department_members:[],
      //点击查看每节课具体哪些人有课
      is_check_noclassperson:false,
      //是否处于踢人阶段
      is_going_to_kickout:false,
      //是否处于解散状态
      is_going_to_dissolve:false,
      //显示有课还是没课
      show_have_or_not_class:1,//1为显示有课，0为显示无课
      //当前使用者
      useraccount:'',
      //当前部门的邀请码
      current_code:'',
  },
  //00 全局函数
    //00_1 周时间数组获取
    getweekday() {
      const [year, month, day] = this.data.currentday;
      const currentDate = new Date(year, month - 1, day); // 注意月份需要减1
      const currentDayOfWeek = currentDate.getDay(); // 0表示星期日，1表示星期一，以此类推
      const weekDates = [];
      
      // 计算当天是本周的第几天（星期日为第7天）
      const daysTillEndOfWeek = currentDayOfWeek === 0 ? 7 : currentDayOfWeek;
      
      // 计算本周的第一天是星期几，即 currentDayOfWeek 天前
      const firstDayOfWeek = new Date(currentDate);
      firstDayOfWeek.setDate(currentDate.getDate() - daysTillEndOfWeek + 1);
    
      for (let i = 0; i < 7; i++) {
        const date = new Date(firstDayOfWeek);
        date.setDate(firstDayOfWeek.getDate() + i);
        weekDates.push([date.getFullYear(), date.getMonth() + 1, date.getDate()]);
      }
      
      this.setData({
        current_week_time: weekDates
      });
      
      console.log(weekDates);
    },
    
    //00_2 获取上一周的日期，同时将日期修改
    getpredate(){
      const [year, month, day] = this.data.currentday;
      const currentDate = new Date(year, month - 1, day); // 注意月份需要减1
      currentDate.setDate(currentDate.getDate() - 7); // 7天前的日期
      this.setData({
        currentday:[currentDate.getFullYear(), currentDate.getMonth() + 1, currentDate.getDate()]
      })
      this.setData({
        current_week_time:this.getweekday(),
      })
    },
    //00_3 后一天的日期
    getnextdate(){
      const [year, month, day] = this.data.currentday;
      const currentDate = new Date(year, month - 1, day); // 注意月份需要减1
      currentDate.setDate(currentDate.getDate() + 7); // 7天后的日期
      this.setData({
        currentday:[currentDate.getFullYear(), currentDate.getMonth() + 1, currentDate.getDate()]
      })
      this.setData({
        current_week_time:this.getweekday()
      })
    },
    //00_4 将对应部门的数值赋给current_datalist
    update_current_datalist(list){
       //将当前部门的数值给current_datalist
       this.setData({
         current_datalist:list
       })
       this.update_currentclass()
    },
    //00_5 获取整体部门信息（参数：周，部门号）
      //获取的信息：1. 每周的课表 2. 部门成员
      //应用场景：1.点击已创建的课表 2.点击课表刷新 3.移除成员时的确认触发
    get_department_message(week_num,departmentflag){
      const api=require('../../../../API/shareapi')
      api.getdepartmentinfo(departmentflag,week_num).then(res=>{
        var list=res
        for(var i=0;i<=list.length-1;i++){
          for(var j=0;j<=list[i].length-1;j++){
            var list1=list[i][j]
            for(var k=list1.length-1;k>=0;k--){
              if(list1[k][0].length==[])list1.splice(k,1)
            }
            list[i][j]=list1
          }
        }
        this.update_current_datalist(list)
      });
  
    },
    //00_6 关闭遮掩层
    close_create_shade(e){
      var whichpart=(e.detail.page!=undefined?e.detail.page:e.currentTarget.dataset.whichpart)
      if(whichpart==2){
        this.setData({
          is_check_noclassperson:false
        })
      }
      if(whichpart==3){
        this.setData({
          is_going_to_kickout:false
        })
      }
      if(whichpart==4){
        this.setData({
          is_going_to_dissolve:false
        })
      }
    },
    //00_9 初始化函数
    init_datalist(){
      const api=require('../../../../API/shareapi')
      api.getsharestate().then(res=>{
        var flag=this.data.departmentflag
        var code
        if(flag=='A')code=res.BindDepartA
        if(flag=='B')code=res.BindDepartB
        if(flag=='C')code=res.BindDepartC
        if(flag=='D')code=res.BindDepartD
        this.setData({
          current_code:code
        })
      })
    },
    //00_10 对数组进行异或运算，获取无课的数据
    filterArrays(arr, arr1) {
      return arr.filter(subArr => !arr1.some(subArr1 => subArr1.every((val, i) => val === subArr[i])));
    },
    //00_11 更新当前课表数据
    update_currentclass(){
      //获取部门成员列表
      var status=this.data.show_have_or_not_class
      var list=this.data.current_datalist
      if(status==1){
        this.setData({
          current_datalist02:this.data.current_datalist
        })
      }
      else{
        const api=require('../../../../API/shareapi')
        api.getdepartmentmsg(this.data.departmentflag).catch(res=>{
          this.setData({
            department_members:res.data.map(obj => {
              const [a, b, ...rest] = Object.values(obj);
              return [b, a, ...rest];
            })
          })
          for(var i=0;i<7;i++){
            for(var j=0;j<5;j++){
              list[i][j]=this.filterArrays(this.data.department_members,list[i][j])
            }
          }

          this.setData({
            current_datalist02:list
          })
        })
      }

    },

  //02 课表详情页面
  //02_1 点击有课的节次，查看详情
  check_classperson_detail(e){
    //根据wxml的节次点击获取对应有课的人
    var personlist=e.currentTarget.dataset.personlist
    //判断是否为空，为空则不显示
    if(personlist.length>0){
      this.setData({
        is_check_noclassperson:true,
        current_class_datalist:personlist
      })

    }

  },
  //02_2 点击解散部门，进行解散
  dissolve_department(){
    this.setData({
      is_going_to_dissolve:true
    })
  },
  //02_3 点击显示踢出成员的页面
  kick_out_department(){
    //显示踢人界面
    this.setData({
      is_going_to_kickout:true
    })
    const api=require('../../../../API/shareapi')
    api.getdepartmentmsg(this.data.departmentflag).catch(res=>{
      this.setData({
        department_members:res.data
      })
      //赋值给是否踢出的列表
      var len=this.data.department_members.length
      var list=[]
      for(var i=0;i<len;i++)list[i]=0;
      this.setData({
        is_selected_department_members:list
      })
    })

    
  },
  //02_4 获取上/下一周课表
  get_weekupdate(e){
    //id用于标记是获取上一周还是下一周
    var id=e.currentTarget.dataset.id;
    //获取当天时间
    var _currentday=this.data.currentday
    //判断是否是第一周且是查看前一周的
    if(this.data.week_num==1&&id==1){
      wx.showToast({
        title: '前面没有了~',
        icon:'error'
      })
    }
    else if(this.data.week_num==24&&id==2){
      wx.showToast({
        title: '后面没有了~',
        icon:'error'
      })
    }
    else{
      //上一周日期
      if(id==1){
        this.getpredate()
        var that=this
        this.setData({
          week_num:that.data.week_num-1
        })
      }
      //下一周日期
      else {
        this.getnextdate()
        var that=this
        this.setData({
          week_num:that.data.week_num+1
        })
      }
      //获取最新数据
      this.get_department_message(this.data.week_num,this.data.departmentflag)
    }
  },
  //02_5 点击更新课表数据
  update_class(){
    this.get_department_message(this.data.week_num,this.data.department_name)
    this.update_current_datalist();
  },
  //02_6 点击switch切换显示
  change_checked_status(){
    //更改switch状态
    if(this.data.show_have_or_not_class==0){
      this.get_department_message(this.data.week_num,this.data.departmentflag)
      var list=this.data.current_datalist
      this.setData({
        show_have_or_not_class:1,
        current_datalist02:list
      })
    }
    else {
      this.setData({
        show_have_or_not_class:0
      })
      //获取到部门成员列表
      this.update_currentclass()
    }
    
  },

//03 解散部门页面
  //03_1 点击“确定”解散部门
  confirm_dissolve_department(){
    const api=require('../../../../API/shareapi')
    var flag=this.data.departmentflag
    //部门code为当前页面部门数组的第二个数据，后面可根据接收数据结构进行更改
    // 获取部门邀请码（标识码）解散部门
    //调用函数
    var code=this.data.current_code
    api.deletedepartment(code).then(res=>{
      this.confirm_dissolve_success()
    })
    .catch(res=>{
      if(res.data.error!='')wx.showToast({
        title: '无权限',
        icon:'error'
      })
      
    })
    

  },

  //03_3 解散成功的操作
  confirm_dissolve_success(){
    wx.showToast({
      title: '解散成功',
    })
    //初始化参数
    this.setData({
      is_going_to_dissolve:false,
    })
    wx.redirectTo({
      url: '../DeptClassContent/DeptClassContent',
    })
  },
  
//04 踢出部门成员界面
  //04_1 点击勾选成员
  change_select_status(e){
    var index=e.currentTarget.dataset.index;
    var list=this.data.is_selected_department_members;
    if(list[index]==1)list[index]=0;
    else list[index]=1;
    this.setData({
      is_selected_department_members:list,
    })
  },
  //04_2 点击“确认”踢出
  confirm_kickout_members(){
    const api=require('../../../../API/shareapi')
    var list=this.data.is_selected_department_members
    var code=this.data.current_code
    //删除选中项
    for(var i=0;i<list.length;i++){
      if(list[i]==1){
        api.kickdepartment(code,this.data.department_members[i].Snumber).then(res=>{
          if(res.success==true){
            wx.showToast({
              title: '成员移除成功~',
            })
          }
          else{
            wx.showToast({
              title: '无权限',
              icon:'error'
            })
          }
        })
        .catch(res=>{
          wx.showToast({
            title: '暂无权限~',
            icon:'error'
          })
        })
      }
    }
    //获取最新数据
    this.get_department_message(this.data.week_num,this.data.departmentflag)
    //进行(有课和无课)课表更新
    this.update_currentclass()
    //关闭弹窗
    this.setData({
      is_going_to_kickout:false,
    })

  },
  //04_3 点击“取消”退出
  cancel_kickout_members(){
    this.setData({
      is_going_to_kickout:false
    })
  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    //初始化部门名称和部门号
    this.setData({
      department_name:options.name,
      departmentflag:options.departmentflag
    })
    this.init_datalist()
    const app=getApp()
    //获取时间
    this.setData({
      //01 获取当前周，调用函数，但当前函数无法使用，暂时视为18周
      week_num:app.globalData.week_time,
      //02 获取当前处于星期几
      week_day:new Date().getDay(),
      //03 获取当天时间
      currentday:[new Date().getFullYear(),new Date().getMonth()+1,new Date().getDate()],
    })
    //获取本周时间
    this.setData({
      current_week_time:this.getweekday()
    })
    //获取课表及部门成员
    this.get_department_message(this.data.week_num,this.data.departmentflag)
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady(options) {
    // console.log(wx.getStorageSync('useraccount'))
    this.setData({
      useraccount:wx.getStorageSync('useraccount')
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