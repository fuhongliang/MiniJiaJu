var e = require("../../api.js"), t = getApp(),host = require('../../config.js');

Page({
  data: {
    img_url:host.hostUrl,
    graphic_id:wx.getStorageSync("graphic_id")
  },
  onLoad: function(n) {
    console.log(this.data.graphic_id);
  },
  goto_page:function(){
    wx.navigateBack({
      delta:2
    })
  },
  onReady: function() {},
  onShow: function() {},
  onHide: function() {},
  onUnload: function() {},
  onPullDownRefresh: function() {},
  onReachBottom: function() {},
});