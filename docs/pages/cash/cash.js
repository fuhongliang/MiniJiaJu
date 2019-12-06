function a(a, e) {
    return a = parseFloat(a), e = parseFloat(e), a > e ? e : a;
}

var e = require("../../api.js"), t = getApp(),host = require('../../config.js');

Page({
    data: {
        price: 0,
        cash_max_day: -1,
        selected: -1,
        img_url:host.hostUrl
    },
    onLoad: function(a) {
        t.pageOnLoad(this);
    },
    onReady: function() {},
    onShow: function() {
        var a = this, i = wx.getStorageSync("share_setting"), n = wx.getStorageSync("custom");
        a.setData({
            share_setting: i,
            custom: n
        }), t.request({
            url: e.share.get_price,
            success: function(e) {
                if (0 == e.code) {
                    var t = e.data.cash_last, i = "", n = "", s = "", o = "", c = a.data.selected;
                    t && (i = t.name, n = t.mobile, s = t.bank_name, o = t.type), a.setData({
                        price: e.data.price.price,
                        cash_max_day: e.data.cash_max_day,
                        pay_type: e.data.pay_type,
                        bank: e.data.bank,
                        remaining_sum: e.data.remaining_sum,
                        name: i,
                        mobile: n,
                        bank_name: s,
                        selected: c,
                        check: o
                    });
                }
            }
        });
    },
    onPullDownRefresh: function() {},
    formSubmit: function(i) {
        var n = this, s = parseFloat(parseFloat(i.detail.value.cash).toFixed(2)), o = n.data.price;
        if (-1 != n.data.cash_max_day && (o = a(o, n.data.cash_max_day)), s) if (s > o) wx.showToast({
            title: "提现金额不能超过" + o + "元",
            image: "/images/icon-warning.png"
        }); else if (s < parseFloat(n.data.share_setting.min_money)) wx.showToast({
            title: "提现金额不能低于" + n.data.share_setting.min_money + "元",
            image: "/images/icon-warning.png"
        }); else {
            var c = n.data.selected;
            if (0 == c || 1 == c || 2 == c || 3 == c) {
                if (0 == c || 1 == c || 2 == c) {
                    if (!(l = i.detail.value.name) || void 0 == l) return void wx.showToast({
                        title: "姓名不能为空",
                        image: "/images/icon-warning.png"
                    });
                    if (!(d = i.detail.value.mobile) || void 0 == d) return void wx.showToast({
                        title: "账号不能为空",
                        image: "/images/icon-warning.png"
                    });
                }
                if (2 == c) {
                    if (!(r = i.detail.value.bank_name) || void 0 == r) return void wx.showToast({
                        title: "开户行不能为空",
                        image: "/images/icon-warning.png"
                    });
                } else r = "";
                if (3 == c) var r = "", d = "", l = "";
                wx.showLoading({
                    title: "正在提交",
                    mask: !0
                }), t.request({
                    url: e.share.apply,
                    method: "POST",
                    data: {
                        cash: s,
                        name: l,
                        mobile: d,
                        bank_name: r,
                        pay_type: c,
                        scene: "CASH",
                        form_id: i.detail.formId
                    },
                    success: function(a) {
                        wx.hideLoading(), wx.showModal({
                            title: "提示",
                            content: a.msg,
                            showCancel: !1,
                            success: function(e) {
                                e.confirm && 0 == a.code && wx.redirectTo({
                                    url: "/pages/cash-detail/cash-detail"
                                });
                            }
                        });
                    }
                });
            } else wx.showToast({
                title: "请选择提现方式",
                image: "/images/icon-warning.png"
            });
        } else wx.showToast({
            title: "请输入提现金额",
            image: "/images/icon-warning.png"
        });
    },
    showCashMaxDetail: function() {
        wx.showModal({
            title: "提示",
            content: "今日剩余提现金额=平台每日可提现金额-今日所有用户提现金额"
        });
    },
    select: function(a) {
        var e = a.currentTarget.dataset.index;
        e != this.data.check && this.setData({
            name: "",
            mobile: "",
            bank_name: ""
        }), this.setData({
            selected: e
        });
    }
});