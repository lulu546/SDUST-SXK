Page({
  data: {
    schedule: [
      [[], [], [], [], []],
      [[], [], [], [], []],
      [[], [], [], [], []],
      [[], [], [], [], []],
      [[], [], [], [], []],
      [[], [], [], [], []],
      [[], [], [], [], []],
    ],
    courseName: '',
    classroom: '',
    teacher: '',
    color: '',
    days: ['星期一', '星期二', '星期三', '星期四', '星期五', '星期六', '星期天'],
    periods: ['第一节', '第二节', '第三节', '第四节', '第五节'],
    selectedDay: '星期一',
    selectedPeriod: '第一节',
    startWeek: 1,
    endWeek: 1
  },

  onLoad() {
    const schedule = wx.getStorageSync('newschedule');
    if (schedule) {
      this.setData({ schedule });
    }
  },

  onCourseNameInput(e) {
    this.setData({
      courseName: e.detail.value
    });
  },

  onClassroomInput(e) {
    this.setData({
      classroom: e.detail.value
    });
  },

  onTeacherInput(e) {
    this.setData({
      teacher: e.detail.value
    });
  },

  onColorInput(e) {
    this.setData({
      color: e.detail.value
    });
  },

  onDayChange(e) {
    this.setData({
      selectedDay: this.data.days[e.detail.value]
    });
  },

  onPeriodChange(e) {
    this.setData({
      selectedPeriod: this.data.periods[e.detail.value]
    });
  },

  onStartWeekInput(e) {
    this.setData({
      startWeek: parseInt(e.detail.value)
    });
  },

  onEndWeekInput(e) {
    this.setData({
      endWeek: parseInt(e.detail.value)
    });
  },

  addCourse() {
    const { schedule, courseName, classroom, teacher, color, selectedDay, selectedPeriod, startWeek, endWeek } = this.data;

    if (!courseName || !classroom || !teacher ) {
      wx.showToast({
        title: '请填写课程信息',
        icon: 'none'
      });
      return;
    }

    if (startWeek > endWeek) {
      wx.showToast({
        title: '开始周数不能大于结束周数',
        icon: 'none'
      });
      return;
    }
    let newcolor;
    const dayIndex = this.data.days.indexOf(selectedDay);
    const periodIndex = this.data.periods.indexOf(selectedPeriod);
    // const tableColor = ["#ebb5cc", "#b2c196", "#edd492", "#fee5a3", "#e9daa3", "#ea7375", "#a286ea", "#776fdf", "#7bc6e6", "#efb293"]; // 颜色表，用于为不同课程名对应不同颜色
    if(!color){
       newcolor="#efb293"
    }
    if (schedule[dayIndex][periodIndex].length > 0) {
      wx.showToast({
        title: '该时间段已有课程',
        icon: 'none'
      });
      return;
    }
    schedule[dayIndex][periodIndex] = [courseName, classroom, teacher, newcolor, startWeek, endWeek,dayIndex,periodIndex];

    this.setData({
      schedule
    });
    console.log(schedule)
    wx.setStorageSync('newschedule', schedule);

    wx.showToast({
      title: '课程添加成功',
      icon: 'success'
    });
  },

  deleteCourse(e) {
    const { day, period } = e.currentTarget.dataset;
    const { schedule } = this.data;
    schedule[day][period] = [];

    this.setData({
      schedule
    });
    wx.setStorageSync('newschedule', schedule);

    wx.showToast({
      title: '课程已删除',
      icon: 'success'
    });
  }
});
