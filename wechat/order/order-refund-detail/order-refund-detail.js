var e = require("../../api.js"), d = getApp(),host = require('../../config.js');

Page({
    data: {
        order_refund: null,
        express_index: null,
        img_url:host.hostUrl
    },
    onLoad: function(r) {
        d.pageOnLoad(this);
        var n = this;
        wx.showLoading({
            title: "正在加载"
        }), d.request({
            url: e.order.refund_detail,
            data: {
                order_refund_id: r.id
            },
            success: function(e) {
                0 == e.code && n.setData({
                    order_refund: e.data
                });
            },
            complete: function() {
                wx.hideLoading();
            }
        });
    },
    viewImage: function(e) {
        var d = this, r = e.currentTarget.dataset.index;
        wx.previewImage({
            current: d.data.order_refund.refund_pic_list[r],
            urls: d.data.order_refund.refund_pic_list
        });
    },
    onReady: function() {},
    onShow: function() {},
    onHide: function() {},
    onUnload: function() {},
    bindExpressPickerChange: function(e) {
        console.log(e), this.setData({
            express_index: e.detail.value
        });
    },
    sendFormSubmit: function(d) {
        console.log(d);
        var r = this;
        wx.showLoading({
            title: "正在提交",
            mask: !0
        }), getApp().request({
            url: e.order.refund_send,
            method: "POST",
            data: {
                order_refund_id: r.data.order_refund.order_refund_id,
                express: null !== r.data.express_index ? r.data.order_refund.express_list[r.data.express_index].name : "",
                express_no: d.detail.value.express_no
            },
            success: function(e) {
                wx.showModal({
                    title: "提示",
                    content: e.msg,
                    showCancel: !1,
                    success: function(d) {
                        0 == e.code && wx.redirectTo({
                            url: "/order/order-refund-detail/order-refund-detail?id=" + r.data.order_refund.order_refund_id
                        });
                    }
                });
            },
            complete: function() {
                wx.hideLoading();
            }
        });
    }
});