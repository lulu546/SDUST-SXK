// pages/home/home.js
var user=wx.getStorageSync('useraccount')
var Storage1=user+"_not_selected_time_event_datalist"
var Storage2=user+"_selected_time_event_datalist"
var Storage3=user+"_overtime_event_datalist"
var Storage4=user+"_finished_event_datalist"
Page({
  data: {
    direction:1,
    moonAnimation: null,
    is_have_shade:0,//是否由设置掩膜，用于区分添加页面和初始页面
    time_selection:"（可选）",//添加事件时，时间选择部分的内容，初始设置为（可选），点击可实现数据切换
    event_content:"",//添加时事项内容
    is_have_select_time:0,//是否选择过时间，0为没有
    //用于对选择时间时picker选择的组成部分
    multiArray:[],//实际picker的内容选择
    multiIndex:[],//当前选择年，月，日，时，分
    nowtime:[],//当前时间
    //设置几种事项的分类数组
    not_selected_time_event_datalist:[],//没有选择时间的待办,三个参数：1、时间；2、事件内容；3、是否被选中
    selected_time_event_datalist:[],//已经选择时间的待办
    overtime_event_datalist:[],//超时未完成的事件
    finished_event_datalist:[],//已经完成的事件

    //设置事项的具体展开
    open_status01:1,//未完成的展开与不展开判定
    open_status02:1,//已过期的展开与不展开判定
    open_status03:1,//已完成的展开与不展开判定

    //输入文本的个数
    area_num:0,

    //是否进入删除页面
    is_to_delete:0,

    //获取屏幕高度
    screen_height:0,

    //删除时是否全选了
    is_all_selected:0,

    //删除时选择的个数
    selected_to_delete_num:0,
  },

//00 全局函数声明
  //00_1 获取当前时间
  getnowtime(){
    var myDate=new Date()
    var list=[
      myDate.getFullYear(),
      (myDate.getMonth()+1),
      myDate.getDate(),
      myDate.getHours(),
      myDate.getMinutes(),
      myDate.getSeconds(),
    ]
    this.setData({
      nowtime:list,
    })

  },
  //00_2 自定义range函数，可用于制作日期选择列表
  range(a,b){
    var list=[]
    for(var i=a;i<=b;i++){
      list=[...list,i]
    }
    return list
  },
  //00_3 获取当前时间数组
  gettimelist(){
    //首先定义好各个集合的数组
    var yearlist=this.range(this.data.nowtime[0],100+this.data.nowtime[0])
    var monthlist=this.range(1,12)
    var daylist1=this.range(1,28)
    var daylist2=this.range(1,29)
    var daylist3=this.range(1,30)
    var daylist4=this.range(1,31)
    var hourlist=this.range(0,23)
    var minutelist=this.range(0,59)

    //将我自己定义的各种情况的数组放入timelist集合中储存
    var list=[yearlist,monthlist,daylist1,daylist2,daylist3,daylist4,hourlist,minutelist]
    this.setData({
      timelist:list,
    })

    // 根据各种情况判断daylist的取值，主要时考虑到大月和小月以及二月的情况，然后将更改后的数据统一到list2中作为multiarray的成员
    var daylist
    switch (this.data.nowtime[1]) {
      case 2:
        daylist=daylist1
        break;
      case 1,3,5,7,8,10,12:
        daylist=daylist3
        break;
      default:
        daylist=daylist4
        break;
    }
    if(this.data.nowtime[0]%100!=0&&this.data.nowtime[0]%4==0)daylist=daylist2
    var list2=[
      yearlist,monthlist,daylist,hourlist,minutelist
    ]
    this.setData({
      multiArray:list2
    })

    //获取对应初始元素对应的位置，也就是multiIndex
    var list1=[0,this.data.nowtime[1]-1,this.data.nowtime[2]-1,this.data.nowtime[3],this.data.nowtime[4]]
    this.setData({
      multiIndex:list1
    })
  },
  //00_4 比较两个数组的大小
  list_compare(list1,list2){
    //默认list1小于list2
    var flag=true
    for(var i=0;i<list2.length;i++){
      if(list1[i]>list2[i]){
        flag=false;
        break;
      }
      else if(list1[i]<list2[i]){
        flag=true;
        break;
      }
    }
    return flag
  },
  //00_5 时间数组排序，用于添加有时间的数据时的筛选，时间距离近的在前
  time_sort(){
    var list=this.data.selected_time_event_datalist
    var l=list.length
    var j=0
    var temp=[]
    for(var i=1;i<l;i++){
      if(this.list_compare(list[j][0],list[i][0]))break;
      else{
        temp=list[j]
        list[j]=list[i]
        list[i]=temp
        j=i
      }
    }
    this.setData({
      selected_time_event_datalist:list
    })
    console.log(list)
  },
  //00_6 初始化数组状态,删除勾选状态
  datalist_init(){
    var list1=this.data.not_selected_time_event_datalist
    var list2=this.data.selected_time_event_datalist
    var list3=this.data.finished_event_datalist
    var list4=this.data.overtime_event_datalist
    this.setData({
      not_selected_time_event_datalist:this.reset_to_0(list1),
      selected_time_event_datalist:this.reset_to_0(list2),
      finished_event_datalist:this.reset_to_0(list3),
      overtime_event_datalist:this.reset_to_0(list4)
    })

  },
  //00_7 给数组赋值为0
  reset_to_0(list){
    var l=0;
    if(list!=[])l=list.length
    for(var i=0;i<l;i++){
      list[i][2]=0
    }
    return list
  },
  //00_8 存数据到微信
  setStorageSyncdata(){
    wx.setStorageSync(Storage1, this.data.not_selected_time_event_datalist)
    wx.setStorageSync(Storage2, this.data.selected_time_event_datalist)
    wx.setStorageSync(Storage3, this.data.overtime_event_datalist)
    wx.setStorageSync(Storage4, this.data.finished_event_datalist)
  },
  //00_9 获取微信数据
  getStorageSyncdatda(){

    this.setData({
      not_selected_time_event_datalist:wx.getStorageSync(Storage1),
      selected_time_event_datalist:wx.getStorageSync(Storage2),
      overtime_event_datalist:wx.getStorageSync(Storage3),
      finished_event_datalist:wx.getStorageSync(Storage4),
    })
  },



//01 初始页面的函数设置
  //01_1 点击加号添加事件,此时调用gettimelist获取事件列表
  add_event(){
    this.setData({
      is_have_shade:1,
      area_num:0,
    })
    this.getnowtime()
    this.gettimelist()
  },
  //01_2 点击箭头，进行事项的显示，此函数用于点击图标切换状态
  change_open_status(e){
    const id = e.detail.kind;
    const propName = `open_status0${id}`;
    this.setData({
      [propName]: this.data[propName] === 0 ? 1 : 0,
    });
  },
  //01_3 对未完成的进行监听，当过期时转化为过期的，进行定时器处理
  check_selected_time_event_datalist() {
    // 调用方法获取当前时间，用于比较是否过期了
    this.getnowtime();
    // 存放获取的信息
    var list1 = this.data.selected_time_event_datalist;
    var list2 = this.data.nowtime;
    var list5 = this.data.overtime_event_datalist;
    // 用于存放超时的部分
    var list3 = [];
    // 用于存放未完成部分，已超时的id，用于去除
    var list4 = [];
    // 防止list1为空时，length函数报错
    var len = 0;
    var flag;
    if (list1 != []) len = list1.length;
    
    // 遍历未完成事项数组，判断是否超时
    for (var i = 0; i < len; i++) {
      flag = !this.list_compare(list2, list1[i][0]); // 当前时间，设置的时间
      // 如果超时
      if (flag) {
        // 存放刚过期的数据
        list3 = [list1[i], ...list3];
        // 存放刚过期的数据在未完成中的id
        list4 = [...list4, i];
      }
    }
    
    // 合并过期的数据
    var _list2 = [...list3, ...list5];
    
    // 如果有刚过期的未完成事项，则更新数据并存入微信缓存
    if (list4.length > 0) {
      // 设置已过期的列表展开状态为1（展开）
      this.setData({ open_status02: 1 });
      
      // 倒序遍历删除未完成中已过期的部分
      for (var i = list4.length - 1; i >= 0; i--) {
        list1.splice(list4[i], 1);
      }
      // 赋值给未完成和已过期的数组
      this.setData({
        selected_time_event_datalist: list1,
        overtime_event_datalist: _list2,
      });
  
      // 存入微信缓存
      // wx.setStorageSync(Storage2, list1);
      // wx.setStorageSync(Storage3, _list2);
    }
  },
  
  
  //01_4 点击各部分前面的选择框进行改变
  transfer_to_finished(e){
    var that=this
    //哪一个分类
    var id=e.detail.kind
    //分类中的第几个
    var num=e.detail.num
    console.log(id,num)
    //对每一类进行处理
    var list=this.data.finished_event_datalist//已完成的数据
    var list1=this.data.selected_time_event_datalist//设置时间的未完成事件
    var list2=this.data.not_selected_time_event_datalist//未设置时间的未完成事件
    var list3=this.data.overtime_event_datalist//已过期的事件
    //当处于非删除状态时
    if(this.data.is_to_delete==0){
      // 设置时间的转为完成的
      if(id==1){
        list=[this.data.selected_time_event_datalist[num],...list]
        list1.splice(num,1)
        this.setData({
          open_status03:1
        })
        //如果转换后成空
        if(this.data.selected_time_event_datalist.length+this.data.not_selected_time_event_datalist.length==0)this.setData({
          open_status01:0
        })
      }
      //未设置时间的转为完成的
      else if(id==2){
        list=[this.data.not_selected_time_event_datalist[num],...list]
        list2.splice(num,1)
        this.setData({
          open_status03:1
        })
        //如果转换后为空
        if(this.data.selected_time_event_datalist.length+this.data.not_selected_time_event_datalist.length==0)this.setData({
          open_status01:0
        })
      }
      //超时的转为已完成
      else if(id==3){
        list=[this.data.overtime_event_datalist[num],...list]
        list3.splice(num,1)
        this.setData({
          open_status03:1
        })
        if(this.data.overtime_event_datalist.length==0)this.setData({
          open_status02:0
        })
      }
      //由已完成的变为非已完成的
      else if(id==4){
        var msg=list[num]
        console.log(msg)
        //该项没有设置时间，返回至对应的数组
        if(msg[0].length==0){
          list2=[msg,...list2],
          //第一部分展开
          this.setData({
            open_status01:1
          })
        }
        //设置时间了，分为超时和没有超时的
        else{
          var flag=this.list_compare(this.data.nowtime,msg[0])
          //没有超时
          if(flag){
            list1=[msg,...list1],
            this.setData({
              selected_time_event_datalist:list1,
              open_status01:1,
            })
            this.time_sort()
            list1=this.data.selected_time_event_datalist
          }
          //超时
          else {
            list3=[msg,...list3]
            this.setData({
              open_status02:1
            })
          }
        }
        list.splice(num,1)
        if(list.length==0)this.setData({
          open_status03:0
        })
      }
      //对data赋值
      this.setData({
        not_selected_time_event_datalist:list2,
        selected_time_event_datalist:list1,
        overtime_event_datalist:list3,
        finished_event_datalist:list
      })
    }
    //处于删除状态
    else{

      if(id==1)list1[num][2]=1
      else if(id==2)list2[num][2]=1
      else if(id==3)list3[num][2]=1
      else if(id==4)list[num][2]=1
      //对data赋值
      this.setData({
        not_selected_time_event_datalist:list2,
        selected_time_event_datalist:list1,
        overtime_event_datalist:list3,
        finished_event_datalist:list
      })

    that.startMoonAnimation()

    }
    // console.log(this.data.finished_event_datalist)
    
  },
  //01_5 长按列表进入选中状态
  delete_press(){
    //准备删除，且所有分类都必须显示
    this.setData({
      //准备删除
      is_to_delete:1,

      //是否显示待办
      open_status01:1,
      open_status02:1,
      open_status03:1

    })
  },
  //全局变量初始化
  init_app_datalist(){
    const app=getApp()
    app.globalData.selected_time_event_datalist=this.data.selected_time_event_datalist
    app.globalData.finished_event_datalist=this.data.finished_event_datalist
    app.globalData.overtime_event_datalist=this.data.overtime_event_datalist
    app.globalData.not_selected_time_event_datalist=this.data.not_selected_time_event_datalist
  },


//02 添加记事本页面的函数设置
  //02_1 点击非添加页面部分，关闭弹窗
  close_shade(){
    if(this.data.is_have_shade==1)this.setData({
      is_have_shade:0,
      event_content:[],
      is_have_select_time:0
    })
  },
  //02_2 选择日期后点击确认完成日期的更改
  bindMultiPickerChange(e){
    //更改了所选的序列以及是否选择过时间
    this.getnowtime()
    var flag=true
    for(var i=0;i<5;i++){
      if(this.data.nowtime[i]>this.data.multiArray[i][e.detail.value[i]]){
        flag=false;
        break;
      }
      if(this.data.nowtime[i]<this.data.multiArray[i][e.detail.value[i]]){
        flag=true;
        break;
      }
    }
    //如果时间没问题
    if(flag){
      var list=this.data.whichone
      // list[2]=true
      this.setData({
        multiIndex:e.detail.value,
        ischoosedate:true,
        // whichone:list
        is_have_select_time:1
      })
    }
    //如果时间有问题
    else{
      wx.showToast({
        title: '时间选择错误',
        icon:'error'
      })
    }

    //将时间读入event_time中
    var _timelist=[]
    for(var i=0;i<5;i++){
      _timelist[i]=this.data.multiArray[i][this.data.multiIndex[i]]
    }
    this.setData({
      event_time:_timelist,
    })

  },

  //02_3 在弹出时间选择器时，所滑动绑定的事件
  bindMultiPickerColumnChange(e){
    //当拨动年份时，记录年份，一边二月时间的更改
    if(e.detail.column==0){
      var list=this.data.nowtime
      list[0]=this.data.multiArray[0][e.detail.value]
      //更改multiIndex的值
      var _list=this.data.multiIndex
      _list[0]=e.detail.value
      console.log(_list[0])
      //闰年的2月29日进行更改
      //如果是二月
      if(this.data.multiIndex[1]==1){
        //非闰年
        if(!((this.data.multiArray[0][this.data.multiIndex[0]]%4==0&&this.data.multiArray[0][this.data.multiIndex[0]]%100!=0)||this.data.multiArray[0][this.data.multiIndex[0]]%400==0)){
          //如果为29号，则置0
          if(this.data.multiIndex[2]==28){
            _list[2]=0
            
          }
          var list=[
            this.data.timelist[0],
            this.data.timelist[1],
            this.data.timelist[2],
            this.data.timelist[6],
            this.data.timelist[7],
          ]
          this.setData({
            multiArray:list,
          })
        }
        //闰年
        else{
          var list=[
            this.data.timelist[0],
            this.data.timelist[1],
            this.data.timelist[3],
            this.data.timelist[6],
            this.data.timelist[7],
          ]
          this.setData({
            multiArray:list,
          })
        }
        
      }
      this.setData({
        nowtime:list,
        multiIndex:_list,
      })
    }
    //对月份进行判断
    if(e.detail.column==1){
      //将MultiIndex更新
      var num=e.detail.value
      switch (true) {
        //大月
        case num%2==0&&num!=1:
          var list=[
            this.data.timelist[0],
            this.data.timelist[1],
            this.data.timelist[5],
            this.data.timelist[6],
            this.data.timelist[7],
          ]
          var _list=this.data.multiIndex
          _list[1]=e.detail.value
          this.setData({
            multiArray:list,
            multiIndex:_list
          })
          break;
        //小月
        case num%2==1&&num!=1:
          var list=[
            this.data.timelist[0],
            this.data.timelist[1],
            this.data.timelist[4],
            this.data.timelist[6],
            this.data.timelist[7],
          ]
          var _list=this.data.multiIndex
          _list[1]=e.detail.value
          if(this.data.multiIndex[2]>29)_list[2]=0
          this.setData({
            multiArray:list,
            multiIndex:_list,
          })
          break;
        // 对二月进行判断
        case num==1:
          var _year=this.data.nowtime[0]
          console.log(_year)
          if((_year%100!=0&&_year%4==0)||_year%400==0){
            var list=[
              this.data.timelist[0],
              this.data.timelist[1],
              this.data.timelist[3],
              this.data.timelist[6],
              this.data.timelist[7],
            ]
            var _list=this.data.multiIndex
            _list[1]=e.detail.value
            if(this.data.multiIndex[2]>28)_list[2]=0
            this.setData({
              multiArray:list,
              multiIndex:_list,
            })
          }
          else{
            var list=[
              this.data.timelist[0],
              this.data.timelist[1],
              this.data.timelist[2],
              this.data.timelist[6],
              this.data.timelist[7],
            ]
            var _list=this.data.multiIndex
            _list[1]=e.detail.value
            if(this.data.multiIndex[2]>27)_list[2]=0
            this.setData({
              multiArray:list,
              multiIndex:_list,
            })
          }
          break;
      }
    }
    //对天数进行关联更新，比如每个月的天数不同
    if(e.detail.column==2){
      var list=this.data.multiIndex
      list[2]=e.detail.value
      this.setData({
        multiIndex:list
      })
    }
  },

  //02_4 获取事项内容
  getevent_content(e){
    var len=(e.detail.value.length<=25)?e.detail.value.length:25
    this.setData({
      event_content:e.detail.value,
      area_num:len,
    })
    console.log(e.detail.value)
  },

  //02_5 确定添加事件
  confirm_add_event(){
    var _event_length=this.data.event_content.length
    console.log(this.data.event_content)
    //首先判断事项内容是否为空，若为空，则提示错误
    if(_event_length==[]){
      wx.showToast({
        title: '您还没有输入待办事项呢~',
        icon:'none'
      })
    }
    //事项不为空，进行有没有选择时间的判断
    else {
      //声明两个数组，用于存放两种情况下的数据
      var _not_selected_time_event_datalist=[]
      var _selected_time_event_datalist=[]
      //判断有没有选择数据，划分为上面两类，并赋值
      if(this.data.is_have_select_time==0){
        _not_selected_time_event_datalist=[
          [],//时间
          this.data.event_content,//内容
          0,//是否被选中
        ]
      }
      else{
        _selected_time_event_datalist=[
          [this.data.multiArray[0][this.data.multiIndex[0]],
          this.data.multiArray[1][this.data.multiIndex[1]],
          this.data.multiArray[2][this.data.multiIndex[2]],
          this.data.multiArray[3][this.data.multiIndex[3]],
          this.data.multiArray[4][this.data.multiIndex[4]],0],//时间
          this.data.event_content,//事件内容
          0,//是否被选中
          0,//是否已经标记为已知
        ]
      }
      //对是否选择时间，对data中的数据进行赋值
      if(this.data.is_have_select_time==0){
        this.setData({
          not_selected_time_event_datalist:[_not_selected_time_event_datalist,...this.data.not_selected_time_event_datalist],
        })
      }
      if(this.data.is_have_select_time==1)this.setData({
        selected_time_event_datalist:[_selected_time_event_datalist,...this.data.selected_time_event_datalist],
      })
      //更改相应的数值，open_status01为1，表明未完成部分有数据，此时直接展开；is_have_select_time、is_have_shade、event_content为初始化表单选项
      this.setData({
        open_status01:1,
        is_have_select_time:0,
        is_have_shade:0,
        event_content:[]
      })
      //对选择时间的部分进行时间从近到远的排序，便于显示
      this.time_sort()
      //全局变量
      this.init_app_datalist()
      //将数值存储至微信小程序中

      
    }

  },



//03 删除页面的函数设定
  //03_1 点击取消返回初始界面
  cancel_to_delete(){
    console.log("触发了")
    this.setData({
      is_to_delete:0,
      is_all_selected:0,
    })
    this.datalist_init()
  },
  //03_2 删除时，前面单选框的点击事件
  select_to_delete(e){
    var id=e.detail.kind//哪一类数据
    var num=e.detail.num//对应类中的第几个
    var status=e.detail.status//此时是未勾选（0）还是已经勾选了（1）
    this.change_data_status(id,num,status)
    //判断是否全选了
    this.check_is_all_selected()
  },
  //03_3 处理勾选的结果
  change_data_status(id,num,status){
    if(id==1){
      var list=this.data.selected_time_event_datalist
      console.log(list)
      if(status==0)list[num][2]=1;
      else list[num][2]=0;
      this.setData({
        selected_time_event_datalist:list
      })
    }
    else if(id==2){
      var list1=this.data.not_selected_time_event_datalist
      if(status==0)list1[num][2]=1;
      else list1[num][2]=0;
      this.setData({
        not_selected_time_event_datalist:list1
      })
    }
    else if(id==3){
      var list2=this.data.overtime_event_datalist
      if(status==0)list2[num][2]=1;
      else list2[num][2]=0;
      this.setData({
        overtime_event_datalist:list2
      })
    }
    else if(id==4){
      var list3=this.data.finished_event_datalist
      if(status==0)list3[num][2]=1;
      else list3[num][2]=0;
      this.setData({
        finished_event_datalist:list3
      })
    }
    //判断是否全选了
    this.check_is_all_selected()
  },
  //03_4 点击删除键，进行删除
  confirm_delete(){
    var list1=this.data.not_selected_time_event_datalist
    var list2=this.data.selected_time_event_datalist
    var list3=this.data.finished_event_datalist
    var list4=this.data.overtime_event_datalist
    var that=this
    this.setData({
      not_selected_time_event_datalist:that.datalist_delete(list1),
      selected_time_event_datalist:that.datalist_delete(list2),
      finished_event_datalist:that.datalist_delete(list3),
      overtime_event_datalist:that.datalist_delete(list4),
    })
    //同步全局函数
    this.init_app_datalist()
    this.setData({
      is_to_delete:0,
      is_all_selected:0,
    })

  },
  //03_5 对数组进行删除
  datalist_delete(list){
    var l=0;
    if(list!=[])l=list.length
    for(var i=l-1;i>=0;i--){
      if(list[i][2]==1)list.splice(i,1)
    }
    return list
  },
  //03_5 全选按钮，点击全选和全部不选
  all_select_to_delete(){
    if(this.data.is_all_selected==0){
      this.change_datalist_number(1)
      this.setData({
        is_all_selected:1,
      })
    }
    else{
      this.change_datalist_number(0)
      this.setData({
        is_all_selected:0
      })
    }
    //判断是否全选了
    this.check_is_all_selected()
    // console.log("是否全选："+this.data.is_all_selected)
  },
  //03_6 对数组进行赋值
  change_datalist_number(num){
    var list1=this.data.not_selected_time_event_datalist
    var list2=this.data.selected_time_event_datalist
    var list3=this.data.finished_event_datalist
    var list4=this.data.overtime_event_datalist
    this.setData({
      not_selected_time_event_datalist:this.change_datalist_num(list1,num),
      selected_time_event_datalist:this.change_datalist_num(list2,num),
      finished_event_datalist:this.change_datalist_num(list3,num),
      overtime_event_datalist:this.change_datalist_num(list4,num),
    })
  },
  //03_7 更改数据对应参数
  change_datalist_num(list,num){
    var l=0;
    if(list!=[])l=list.length
    for(var i=l-1;i>=0;i--){
      list[i][2]=num
    }
    return list
  },
  //03_8 对选项个数进行监听
  check_is_all_selected(){
    var list1=this.data.not_selected_time_event_datalist
    var list2=this.data.selected_time_event_datalist
    var list3=this.data.finished_event_datalist
    var list4=this.data.overtime_event_datalist
    var len=this.get_datalist_delete_num(list1)+this.get_datalist_delete_num(list2)+this.get_datalist_delete_num(list3)+this.get_datalist_delete_num(list4)
    this.setData({
      selected_to_delete_num:len
    })
    // 当选项都选了时，标记为全选
    if(len==list1.length+list2.length+list3.length+list4.length){
      this.setData({
        is_all_selected:1
      })
    }
  },
  //03_9 获取数组中删除选项的个数
  get_datalist_delete_num(list){
    var l=0;
    var sum=0;
    if(list!=[])l=list.length
    for(var i=l-1;i>=0;i--){
      if(list[i][2]==1)sum++
    }
    return sum
  },



  onShareAppMessage() {
    return {};
  },
  onLoad(){
    var that=this
    setInterval(function(){
      that.check_selected_time_event_datalist()
    },1000)
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {
    var that=this
    that.startMoonAnimation()
    //02 初始化页面
    this.datalist_init()
    //初始化
    // const app=getApp()
    this.getStorageSyncdatda()


  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {

    const app=getApp()
    this.setData({
      selected_time_event_datalist:app.globalData.selected_time_event_datalist,
      not_selected_time_event_datalist:app.globalData.not_selected_time_event_datalist,
      overtime_event_datalist:app.globalData.overtime_event_datalist,
      finished_event_datalist:app.globalData.finished_event_datalist
    })

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {
    // 储存至微信小程序
    this.setStorageSyncdata()
    this.init_app_datalist()
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {
    // 储存至微信小程序
    this.setStorageSyncdata()
    this.init_app_datalist()
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
  startMoonAnimation: function() {
    var that=this
    const animation = wx.createAnimation({
      duration: 7000, // 动画持续时间
      timingFunction: 'linear',
    });

    // 根据 direction 的值来决定动画的移动方向
    const distance = that.data.direction * 58; // 移动距离
    animation.translateX(distance).step();

    // 更新动画并切换方向
    that.setData({
      moonAnimation: animation.export(),
      direction: -that.data.direction, // 改变方向
    });

    // 循环动画
    setTimeout(() => {
      that.startMoonAnimation();
    }, 7000);
  }

});