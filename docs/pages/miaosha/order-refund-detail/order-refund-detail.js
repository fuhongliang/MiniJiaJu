var e = require("../../../api.js"), n = getApp();

Page({
    data: {
        order_refund: null
    },
    onLoad: function(r) {
        n.pageOnLoad(this);
        var t = this;
        wx.showLoading({
            title: "正在加载"
        }), n.request({
            url: e.miaosha.refund_detail,
            data: {
                order_refund_id: r.id
            },
            success: function(e) {
                0 == e.code && t.setData({
                    order_refund: e.data
                });
            },
            complete: function() {
                wx.hideLoading();
            }
        });
    },
    viewImage: function(e) {
        var n = this, r = e.currentTarget.dataset.index;
        wx.previewImage({
            current: n.data.order_refund.refund_pic_list[r],
            urls: n.data.order_refund.refund_pic_list
        });
    },
    onReady: function() {},
    onShow: function() {},
    onHide: function() {},
    onUnload: function() {}
});