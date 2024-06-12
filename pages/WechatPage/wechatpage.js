Page({
  data: {
    webViewSrc: ''
  },
  onLoad: function (options) {
    if (options.src) {
      this.setData({
        webViewSrc: decodeURIComponent(options.src)
      });
    }
  }
});
