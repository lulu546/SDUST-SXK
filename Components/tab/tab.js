// components/tab/tab.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    arrayData1:{
      type:Array,
      value:[]
    },
    arrayData2:{
      type:Array,
      value:[]
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    arrayList1:["地点","食物种类"],
    arrayList2:[],
    indexList:{
      index1:0,
      index2:[[1],[1]]
    },
    scrollX:0
  },
 
  /**
   * 组件的方法列表
   */
  methods: {
    changeSelection1(e){
      this.setData({
        'indexList.index1':e.currentTarget.dataset.index1,
        scrollX:0
      })
    },
    changeSelection2(e){
      var index=e.currentTarget.dataset.index2
      var index1=this.data.indexList.index1
      var index2=this.data.indexList.index2
      if(index==0){
        var list= Array.from({ length:  index2[index1].length}, () => 0);
        list[0]=1
        index2[index1]=list
        this.setData({
          'indexList.index2':index2
        })
      }
      else{
        index2[index1][0]=0;
        if(index2[index1][index]==0)index2[index1][index]=1;
        else index2[index1][index]=0;
        var num=0;
        for(var i=0;i<index2[index1].length;i++){
          if(index2[index1][i]==1)num++;
        }
        if(num==0)index2[index1][0]=1;
        this.setData({
          'indexList.index2':index2
        })
      }
      this.triggerEvent('onChange',{indexList:this.data.indexList})
    }
  },
  observers: {
    // 监听 properties 接收的值的变化
    'arrayData2' (val) {
      if (!val || !Array.isArray(val) || val.length === 0) {
        return;
      }
      var list1=this.properties.arrayData1
      var list2=val

      
      var zeroArray1 = Array.from({ length:  list2[0].length}, () => 0);
      var zeroArray2 = Array.from({ length:  list2[1].length}, () => 0);
      zeroArray1[0]=1;
      zeroArray2[0]=1;
      this.setData({
        arrayList1:list1,
        arrayList2:list2,
        'indexList.index2':[zeroArray1,zeroArray2],
        'indexList.index1':0
      })
    },

  },
})
