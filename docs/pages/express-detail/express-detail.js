var t = require("../../api.js"), a = getApp(),host = require('../../config.js');

Page({
    data: {
        img_url:host.hostUrl
    },
    onLoad: function(t) {
        if (a.pageOnLoad(this), t.inId) o = {
            order_id: t.inId,
            type: "IN"
        }; else var o = {
            order_id: t.id,
            type: "mall"
        };
        this.loadData(o);
    },
    loadData: function(o) {
        var n = this;
        wx.showLoading({
            title: "正在加载"
        }), a.request({
            url: t.order.express_detail,
            data: o,
            success: function(t) {
                wx.hideLoading(), 0 == t.code && n.setData({
                    data: t.data
                }), 1 == t.code && wx.showModal({
                    title: "提示",
                    content: t.msg,
                    showCancel: !1,
                    success: function(t) {
                        t.confirm && wx.navigateBack();
                    }
                });
            }
        });
    },
    onReady: function() {},
    onShow: function() {},
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {},
    copyText: function(t) {
        var a = t.currentTarget.dataset.text;
        wx.setClipboardData({
            data: a,
            success: function() {
                wx.showToast({
                    title: "已复制"
                });
            }
        });
    }
});