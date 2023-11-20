// Components/Select/Select.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    range_index:{
      type:Number,
      value:0
    },
    is_show:{
      type:Number,
      value:0
    },
    datalist:{
      type:Array,
      value:[]
    },
  },

  /**
   * 组件的初始数据
   */
  data: {
    _range_index:0,
    _is_show:0,
    _datalist:[],
  },

  lifetimes:{
  },
  /**
   * 组件的方法列表
   */
  methods: {
    setText(e){
      var index=e.currentTarget.dataset.index
      this.triggerEvent("click_to_confirm",{index:index})
    },
    change_animation(e){
      this.triggerEvent("click_to_transfer",{status:this.properties.is_show})
    }
  }
})
