var t = require("../../../api.js"), a = getApp(),host = require('../../config.js');

Page({
    data: {
        list: [],
        img_url:host.hostUrl
    },
    onLoad: function(t) {
        a.pageOnLoad(this), this.setData({
            status: t.status || 1
        }), this.loadData(t);
    },
    loadData: function(s) {
        var o = this;
        wx.showLoading({
            title: "加载中"
        }), a.request({
            url: t.cash_coupon.cash_order_list,
            data: {
                status: o.data.status
            },
            success: function(t) {
                0 == t.code && o.setData({
                    list: t.data.list
                }), console.log(t.data.list);
            },
            complete: function() {
                wx.hideLoading();
            }
        });
    },
    onShow: function() {},
});