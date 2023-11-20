// Components/notepad-navigator/notepad-navigator.js
Component({
  options:{
    styleIsolation:"isolated",
    multipleSlots:true,
  },
  /**
   * 组件的属性列表
   */
  properties: {
    // 已完成、已过期、未完成的分类
    kind:{
      type:"Number",
      value:0,
    },
    // 打开状态
    open_status:{
      type:"Number",
      value:0,
    }
  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {
    change_open_status(e){
      this.triggerEvent("click_to_change",{kind:e.currentTarget.dataset.id})
    },
  }
})
