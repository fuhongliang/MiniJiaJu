var t = require("../../../api.js"), a = getApp(), e = require("../../../wxParse/wxParse.js");

Page({
    data: {
        title: '',
        content: ''
    },
    onLoad: function(i) {
        a.pageOnLoad(this);
        var n = this;
        var te = e;
        a.request({
            url: t.default.secure_shopping,
            data: {},
            success: function(r) {
                0 == r.code ? (n.setData({title:r.data.title,content:r.data.content,id:r.data.id}), te.wxParse("content", "html", r.data.content, n)) : wx.showModal({
                    title: "提示",
                    content: r.msg,
                    showCancel: !1,
                    success: function(r) {
                        t.confirm && wx.redirectTo({
                            url: "/pages/index/index"
                        });
                    }
                });
            }
        });
    },
    onReady: function() {},
    onShow: function() {},
    onHide: function() {},
    onUnload: function() {},
});
