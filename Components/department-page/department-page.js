// Components/department-page/department-page.js
Component({
  options:{
    styleIsolation:"isolated",
    multipleSlots:true,
  },
  /**
   * 组件的属性列表
   */
  properties: {
    //是新建页面，还是加入页面
    which_page:{
      type:"Number",
      value:0,
    },
    // 是否处于显示状态，例如is_create_departmen
    which_status:{
      type:"Boolean",
      value:false,
    },
  },

  /**
   * 组件的初始数据
   */
  data: {
    placeholder:"",
  },
  lifetimes:{
    attached(){
      if(this.properties.which_page==1){
        this.setData({
          placeholder:"请输入部门名称~"
        })
      }
      else if(this.properties.which_page==2){
        this.setData({
          placeholder:"请输入部门暗号~"
        })
      }
    },
  },

  /**
   * 组件的方法列表
   */
  methods: {
    close_create_shade(e){
      this.triggerEvent("click_to_close",{page:e.currentTarget.dataset.page})
    },
    show_create_shade(){},
    get_created_department_msg(e){
      this.triggerEvent("input_event",{content:e.detail.value,kind:this.properties.which_page})
    },
    confirm_department(){
      this.triggerEvent("click_to_confirm",{page:this.properties.which_page})
    },
  }
})
