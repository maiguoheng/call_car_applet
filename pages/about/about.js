getApp();
Page({
  data: {
    versionData: "1.0",
    aboutImg: ""
  },
  onLoad: function (t) {
    this.requestAbout();
  },
  requestAbout: function () {
    var o = this;
    o.setData({
      aboutMenuList: [{
        groupName: "版本号",
        aboutText: "V1.0",
      },
      {
        groupName: "联系电话",
        aboutText: "18620800888",
      }
      ]
    });
  },
});