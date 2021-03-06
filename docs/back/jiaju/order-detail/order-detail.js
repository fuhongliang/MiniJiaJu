var t = require("../../api.js"), a = getApp();

Page({
    data: {
        order: null,
        getGoodsTotalPrice: function() {
            return this.data.order.total_price;
        },
        order_status:0,
        text:"11582568663526852"
    },
    onLoad: function(e) {
        a.pageOnLoad(this);
        var o = this;
        o.setData({
            store: wx.getStorageSync("store")
        }), wx.showLoading({
            title: "正在加载"
        }), a.request({
            url: t.order.detail,
            data: {
                order_id: e.id
            },
            success: function(t) {
                0 == t.code && o.setData({
                    order: t.data
                });
            },
            complete: function() {
                wx.hideLoading();
            }
        });
    },
    copyText: function(t) {
        console.log(t);
        var a = t.currentTarget.dataset.text;
        wx.setClipboardData({
            data: a,
            success: function() {
                wx.showToast({
                    title: "已复制"
                });
            }
        });
    },
    location: function() {
        var t = this.data.order.shop;
        wx.openLocation({
            latitude: parseFloat(t.latitude),
            longitude: parseFloat(t.longitude),
            address: t.address,
            name: t.name
        });
    }
});