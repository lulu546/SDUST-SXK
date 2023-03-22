Page({
  data: {
    exams: [],
    searchKeyword: '',
  },

  // 监听搜索输入框内容变化
  onSearchInput: function (e) {
    this.setData({
      searchKeyword: e.detail.value,
    });
  },

  // 搜索按钮点击事件
  onSearch: function () {
    const keyword = this.data.searchKeyword.trim();

    if (keyword === '') {
      wx.showToast({
        title: '请输入关键字',
        icon: 'none',
        duration: 2000,
      });
      return;
    }

    // 模拟获取考试数据
    const examData = [
      {
        id: 1,
        time: '2023-04-10 09:00',
        location: '北京市海淀区',
        subject: '数学',
      },
      {
        id: 2,
        time: '2023-04-11 14:00',
        location: '上海市浦东新区',
        subject: '英语',
      },
      {
        id: 3,
        time: '2023-04-12 09:00',
        location: '广州市天河区',
        subject: '语文',
      },
    ];

    // 根据关键字过滤考试数据
    const filteredExams = examData.filter((exam) =>
      exam.subject.includes(keyword)
    );

    // 更新考试列表
    this.setData({
      exams: filteredExams,
    });
  },
});
