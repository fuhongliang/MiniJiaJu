var o = require("../../../api.js"), t = getApp(),host = require('../../config.js');

Page({
    data: {
        img_url:host.hostUrl
    },
    onLoad: function(n) {
        t.pageOnLoad(this);
        var e = this;
        wx.showLoading({
            mask: !0
        }), t.request({
            url: o.cash_coupon.cash_coupon_list,
            success: function(o) {
                console.log(o);
                0 == o.code && (e.setData({
                    coupon_list: o.data.list
                }), console.log(o.data.list));
            },
            complete: function() {
                wx.hideLoading();
            }
        });
    },
    onReady: function() {},
    onShow: function() {},
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {},
    buyCoupon: function(n) {
        var a = n.target.dataset.index;
        wx.navigateTo({
            url:"/pages/cash-coupon/order-submit/index?coupon_id="+a
        });
    },
    closeCouponBox: function(o) {
        this.setData({
            get_coupon_list: ""
        });
    },
    goodsList: function(o) {
        var t = o.currentTarget.dataset.goods, n = [];
        for (var e in t) n.push(t[e].id);
        wx.navigateTo({
            url: "/pages/list/list?goods_id=" + n,
            success: function(o) {},
            fail: function(o) {}
        });
    }
});