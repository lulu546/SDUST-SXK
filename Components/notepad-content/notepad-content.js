// Components/notepad-content/notepad-content.js
Component({
  options:{
    styleIsolation:"isolated",
    multipleSlots:true,
  },
  externalClasses:[
  ],
  /**
   * 组件的属性列表
   */
  properties: {
    // 数据列表
    datalist:{
      type:Array,
      value:[]
    },
    // 是否打开显示
    open_status:{
      type:Number,
      value:0
    },
    // 是否处于删除状态
    delete_status:{
      type:Number,
      value:0
    },
    // 哪一个列表
    kind:{
      type:Number,
      value:0
    },

  },

  /**
   * 组件的初始数据
   */
  data: {
    datalist:[]
  },


  lifetimes:{
    attached(){
      this.setData({
        datalist:this.properties.datalist
      })
    },
  },
  /**
   * 组件的方法列表
   */
  methods: {
    // 长按删除
    delete_press(){
      this.triggerEvent("click_to_press")
    },
    // 未删除状态点击选择框
    transfer_to_finished(e){
      this.triggerEvent("click_to_transfer",{kind:e.currentTarget.dataset.id,num:e.currentTarget.dataset.num})
    },
    // 删除时勾选前面的选择框，进行勾选
    select_to_delete(e){
      this.triggerEvent("click_select_delete",{kind:e.currentTarget.dataset.id,num:e.currentTarget.dataset.num,status:e.currentTarget.dataset.status})
    },
  }
})
