// Components/home-notepad/home-notepad.js
Component({
  externalClasses:[
    'my-class',
  ],
  /**
   * 组件的属性列表
   */
  properties: {
    len:{
      type:Number,
      value:0,
    },
    datalist:{
      type:Array,
      value:[],
    },
    whichone:{
      type:Number,
      value:1,
    },
  },

  /**
   * 组件的初始数据
   */
  data: {
  },
  lifetimes:{
  },
  /**
   * 组件的方法列表
   */
  methods: {
    transfer_to_finished(e){
      this.triggerEvent("click_to_transfer",{id:e.currentTarget.dataset.id,num:e.currentTarget.dataset.num})
    },
  }
})
