// Components/department-view/department-view.js
Component({
  // 选项
  options:{
    // isolated父子组件样式相互独立，apply-shared父影响子，shared父子相互影响
    styleIsolation:"isolated",
    //允许多个插槽
    multipleSlots:true,
  },
  // 外部类,在父组件中使用后，在子组件可调用对应的class名，进行样式重写
  externalClasses:[],
  /**
   * 组件的属性列表
   */
  properties: {
    department_name:{
      type:"String",
      value:"",
    },
    department_invitation:{
      type:"String",
      value:"",
    },
    department_id:{
      type:"String",
      value:"",
    }
  },

  /**
   * 组件的初始数据
   */
  data: {

  },
  // 生命周期函数
  lifetimes:{
    // 当组件的生命周期被挂载时
    attached(){

    }
  },
  /**
   * 组件的方法列表
   */
  methods: {
    //点击创建或加入
    add_department(e){
      this.triggerEvent("click_to_add",{cont:e.currentTarget.dataset.id,kind:e.currentTarget.dataset.kind,function:"点击创建或加入部门，id是哪个部门号，kind是1创建还是0加入"})
    },
    //点击退出
    quit_department(e){
      this.triggerEvent("click_to_quit",{cont:e.currentTarget.dataset.id,function:"点击退出部门"})
    },
    // 点击已创建好的部门查看课表
    click_to_classpage(e){
      this.triggerEvent("click_to_check",{cont:e.currentTarget.dataset.whichone,name:this.properties.department_name})
    }
  }
})
