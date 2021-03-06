var t = require("../../api.js"), a = getApp(), e = !1,host = require('../../config.js');

Page({
    data: {
        show: !1,
        img_url:host.hostUrl
    },
    onLoad: function(t) {
        a.pageOnLoad(this);
    },
    getData: function() {
        var n = this;
        wx.showLoading({
            title: "加载中"
        }), a.request({
            url: t.recharge.record,
            data: {
                date: n.data.date_1 || ""
            },
            success: function(t) {
                n.setData({
                    list: t.data.list
                }), wx.hideLoading(), e = !1;
            }
        });
    },
    onReady: function() {
        a.pageOnReady(this);
    },
    onShow: function() {
        a.pageOnShow(this);
        var e = this;
        wx.showLoading({
            title: "加载中"
        });
        var n = wx.getStorageSync("user_info");
        a.request({
            url: t.recharge.index,
            success: function(t) {
                n.money = t.data.money, wx.setStorageSync("user_info", n), e.setData({
                    user_info: n,
                    list: t.data.list,
                    setting: t.data.setting,
                    date_1: t.data.date,
                    date: t.data.date.replace("-", "年") + "月"
                }), wx.hideLoading();
            }
        });
    },
    onHide: function() {
        a.pageOnHide(this);
    },
    onUnload: function() {
        a.pageOnUnload(this);
    },
    onPullDownRefresh: function() {},
    onReachBottom: function() {},
    dateChange: function(t) {
        if (!e) {
            e = !0;
            var a = t.detail.value, n = a.replace("-", "年") + "月";
            this.setData({
                date: n,
                date_1: a
            }), this.getData();
        }
    },
    dateUp: function() {
        var t = this;
        if (!e) {
            e = !0;
            var a = t.data.date_1, n = (t.data.date, new Date(a));
            n.setMonth(n.getMonth() + 1);
            var i = n.getMonth() + 1;
            i = (i = i.toString())[1] ? i : "0" + i, t.setData({
                date: n.getFullYear() + "年" + i + "月",
                date_1: n.getFullYear() + "-" + i
            }), t.getData();
        }
    },
    dateDown: function() {
        var t = this;
        if (!e) {
            e = !0;
            var a = t.data.date_1, n = (t.data.date, new Date(a));
            n.setMonth(n.getMonth() - 1);
            var i = n.getMonth() + 1;
            i = (i = i.toString())[1] ? i : "0" + i, t.setData({
                date: n.getFullYear() + "年" + i + "月",
                date_1: n.getFullYear() + "-" + i
            }), t.getData();
        }
    },
    click: function() {
        this.setData({
            show: !0
        });
    },
    close: function() {
        this.setData({
            show: !1
        });
    },
    GoToDetail: function(t) {
        var a = this, e = t.currentTarget.dataset.index, n = a.data.list[e];
        console.log(e), wx.navigateTo({
            url: "/pages/balance/detail?order_type=" + n.order_type + "&id=" + n.id
        });
    }
});