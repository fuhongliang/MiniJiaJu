var e = require("../../api.js"), t = getApp();

Page({
    data: {
        selected: -1
    },
    onLoad: function(a) {
        t.pageOnLoad(this);
        var n = this;
        wx.showLoading({
            title: "加载中"
        }), t.request({
            url: e.recharge.list,
            success: function(e) {
                var t = e.data;
                t.balance && 0 != t.balance.status || wx.showModal({
                    title: "提示",
                    content: "充值功能未开启，请联系管理员！",
                    showCancel: !1,
                    success: function(e) {
                        e.confirm && wx.navigateBack({
                            delta: 1
                        });
                    }
                }), n.setData(e.data);
            },
            complete: function(e) {
                wx.hideLoading();
            }
        });
    },
    onReady: function() {
        t.pageOnReady(this);
    },
    onShow: function() {
        t.pageOnShow(this);
    },
    onHide: function() {
        t.pageOnHide(this);
    },
    onUnload: function() {
        t.pageOnUnload(this);
    },
    click: function(e) {
        this.setData({
            selected: e.currentTarget.dataset.index
        });
    },
    pay: function(a) {
        var n = this, i = {}, o = n.data.selected;
        if (-1 == o) {
            var c = n.data.money;
            if (c < .01) return void wx.showModal({
                title: "提示",
                content: "充值金额不能小于0.01",
                showCancel: !1
            });
            i.pay_price = c, i.send_price = 0;
        } else {
            var s = n.data.list;
            i.pay_price = s[o].pay_price, i.send_price = s[o].send_price;
        }
        i.pay_price ? (i.pay_type = "WECHAT_PAY", wx.showLoading({
            title: "提交中"
        }), t.request({
            url: e.recharge.submit,
            data: i,
            method: "POST",
            success: function(e) {
                if (0 == e.code) return setTimeout(function() {
                    wx.hideLoading();
                }, 1e3), void wx.requestPayment({
                    timeStamp: e.data.timeStamp,
                    nonceStr: e.data.nonceStr,
                    package: e.data.package,
                    signType: e.data.signType,
                    paySign: e.data.paySign,
                    complete: function(e) {
                        "requestPayment:fail" != e.errMsg && "requestPayment:fail cancel" != e.errMsg ? "requestPayment:ok" == e.errMsg && wx.showModal({
                            title: "提示",
                            content: "充值成功",
                            showCancel: !1,
                            confirmText: "确认",
                            success: function(e) {
                                wx.navigateBack({
                                    delta: 1
                                });
                            }
                        }) : wx.showModal({
                            title: "提示",
                            content: "订单尚未支付",
                            showCancel: !1,
                            confirmText: "确认"
                        });
                    }
                });
                wx.showModal({
                    title: "提示",
                    content: e.msg,
                    showCancel: !1
                }), wx.hideLoading();
            }
        })) : wx.showModal({
            title: "提示",
            content: "请选择充值金额",
            showCancel: !1
        });
    },
    input: function(e) {
        this.setData({
            money: e.detail.value
        });
    }
});