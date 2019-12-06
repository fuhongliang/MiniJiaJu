var t = require("../../api.js"), n = getApp(), e = require("../../wxParse/wxParse.js");

Page({
    data: {
        addtime:'',
        title: ''
    },
    onLoad: function(o) {
        n.pageOnLoad(this);
        var _that = this;
        var te = e;
        var data = {};
        n.request({
            url: t.default.article_detail,
            data: {
                id: o.id
            },
            success: function(t) {
                console.log(_that);
                0 == t.code && (_that.setData({title:t.data.title,addtime:t.data.addtime}), te.wxParse("content", "html", t.data.content,_that)), 1 == t.code && wx.showModal({
                    title: "提示",
                    content: t.msg,
                    showCancel: !1,
                    confirm: function(t) {
                        t.confirm && wx.navigateBack();
                    }
                });
            }
        });
        console.log(data);
    },
    onReady: function() {},
    onShow: function() {},
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {}
});