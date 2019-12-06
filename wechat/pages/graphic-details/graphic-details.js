var a = getApp(),link = require("../../api.js"),parse = require("../../wxParse/wxParse.js"),host = require('../../config.js');

Page({
    data: {
        img_url:host.hostUrl
    },
    onLoad: function(t) {
      var that = this;
      a.request({
        url:link.default.topic,
        data:{
          id:t.id
        },
        success(res){
            console.log(res)
          0 == res.code ? (that.setData(res.data), parse.wxParse("content", "html", res.data.content, that)) : wx.showModal({
              title: "提示",
              content: t.msg,
              showCancel: !1,
              success: function(t) {
                  t.confirm && wx.redirectTo({
                      url: "/pages/index/index"
                  });
              }
          });
        },
        fail(err){
          console.log(err);
          console.log("失败");
        }
      })
    },
    onShow: function() {
        console.log(this.data);
    },
    contactDesigner: function() {
      wx.navigateTo({
          url:"/subpages/contact-designer/contact-designer?id="+this.data.id
      })
    },
    previewImage:function(e){
        a.previewImage(e);
    },
    wxParseTagATap: function(t) {
        if (console.log(t), t.currentTarget.dataset.goods) {
            var a = t.currentTarget.dataset.src || !1;
            if (!a) return;
            wx.navigateTo({
                url: a
            });
        }
    },
    onPullDownRefresh: function() {

    },
    onShareAppMessage: function(t) {

    },
    onConfirm: function(t) {

    },
    onHide: function() {

    },
    onUnload: function() {

    },
    onPageScroll: function(t) {

    }
});
