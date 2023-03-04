// index.js
Page({
  data: {
    username: '',
    password: '',
    isSubmitEnabled: false
  },
  inputChange: function(e) {
    var name = e.target.name;
    var value = e.detail.value;
    var data = {};
    data[name] = value;
    this.setData(data);
    this.setData({
      isSubmitEnabled: this.data.username !== '' && this.data.password !== ''
    });
  },
  formSubmit: function(e) {
    var username = e.detail.value.username;
    var password = e.detail.value.password;
    // TODO: 处理表单提交逻辑
  }
});
