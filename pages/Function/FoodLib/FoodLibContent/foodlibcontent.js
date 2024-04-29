// pages/test/test.js
const foodapi=require("../../../../API/foodapi")
var setTimeID=null
Page({

  /**
   * 页面的初始数据
   */
  data: {
    arrayList1:["地点","食物种类"],
    arrayList2:[],
    indexList:[],// 筛选选中项
    foodList:[],// 全部的数据
    currentList:[], //筛选后的数组
    pageList:[],//分页数组
    randomList:[], // 随机的食物库列表
    instanceR:false,// 拖动块距离右侧的距离远
    functionStatus:true,// 功能切换状态，false为食物原始列表，true为随机列表
  },
  // 点击获取随机食物库
  startRandomSelection(){
    wx.showLoading({
      title: '随机生成中',
      icon:'none'
    })
    setTimeout(()=>{
      this.getRandomElementsFromArray(this.data.currentList)
      wx.hideLoading()
    },1000)
  },
  // 随机获取食物库
  getRandomElementsFromArray(arr) {
    // 确保数组中至少有三个元素，否则返回空数组
    if (arr.length < 3) {
      this.setData({
        randomList:arr
      })
      wx.showToast({
        title: '暂无食物库',
        icon:'error'
      })
      return []
    }
    const randomIndexes = [];
    
    // 生成三个不重复的随机索引
    while (randomIndexes.length < 3) {
      const randomIndex = Math.floor(Math.random() * arr.length);
      if (!randomIndexes.includes(randomIndex)) {
        randomIndexes.push(randomIndex);
      }
    }
  
    const randomElements = randomIndexes.map(index => arr[index]);
    this.setData({
      randomList:randomElements
    })
  },
  // 根据筛选项进行数据筛选
  filterFoodList() {
    const selectedIndexes = this.data.indexList.index2;
    const filterAddress = this.data.arrayList2[0];
    const filterKind = this.data.arrayList2[1];
  
    // 创建一个函数来检查是否满足筛选条件
    function isItemMatch(item) {
      if (!selectedIndexes[0][0]) {
        // 如果 "全部" 没有选中，检查地址是否满足筛选条件
        const addressMatch = filterAddress.some((address, index) => {
          return selectedIndexes[0][index] && item.location.includes(address);
        });
        if (!addressMatch) {
          return false;
        }
      }
  
      if (!selectedIndexes[1][0]) {
        // 如果 "全部" 没有选中，检查食物种类是否满足筛选条件
        const kindMatch = filterKind.some((kind, index) => {

          return selectedIndexes[1][index] && item.kind.includes(kind);
        });
        if (!kindMatch) {
          return false;
        }
      }
  
      // 如果通过上述筛选条件，返回 true 表示满足条件
      return true;
    }
  
    // 使用筛选函数过滤 foodList
    const filteredList = this.data.foodList.filter((item) => isItemMatch(item));
  
    // 将筛选后的结果赋值给 currentList
    this.setData({
      currentList: filteredList
    });
  },
  // 筛选食物库的点击事件
  classifyFood(e){
    this.setData({
      indexList:e.detail.indexList,
      scrollY:0
    })
    this.filterFoodList()
    if(this.data.functionStatus)this.startRandomSelection()
    // console.log(this.data.indexList)
  },
  // 拖动图标的触摸事件
  onTouchStart: function (e) {
    if(setTimeID!=null)clearTimeout(setTimeID);

    this.setData({
      instanceR: true
    });
  },
  // 拖动图标的触摸结束事件
  onTouchEnd: function (e) {
    const x = e.changedTouches[0].clientX; // 获取触摸结束时的 X 坐标
    const y = e.changedTouches[0].clientY; // 获取触摸结束时的 Y 坐标
    setTimeID=setTimeout(()=>{
      this.setData({
        instanceR: false,
        movableY:y-40
      });
    },3000)
  },
  // 点击图标改变功能
  changeFunctionStatus(){
    this.setData({
      functionStatus:!this.data.functionStatus
    })
  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    foodapi.getFoodItems().then((res)=>{

console.log(res.foodList)
       // 假设每个对象都有一个 'type' 属性，我们将基于这个属性来筛选
      let uniqueTypes = new Set(res.foodList.map(item => item.kind));
      // 将 Set 转换回数组
   
      let uniqueTypesArray = Array.from(uniqueTypes);
       uniqueTypesArray = ['全部', ...uniqueTypesArray];

      let arrayList2New=[
        ["全部","A餐","B餐","C餐","北门","南门","外卖"],
        uniqueTypesArray
      ]
      console.log(arrayList2New);
      this.setData({
        foodList:res.foodList,//全部的数据
        currentList:res.foodList,//筛选后的数据
        arrayList2:arrayList2New
      })
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {
    wx.showToast({
      title: '....正在统计咱山科的食物中QAQ',
      icon:'none'
    })
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