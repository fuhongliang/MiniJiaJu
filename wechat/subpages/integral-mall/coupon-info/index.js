var t = require("../../../api.js"), n = getApp();

Page({
    data: {
        showModel: !1
    },
    onLoad: function(e) {
        if (getApp().pageOnLoad(this), e.coupon_id) {
            var a = e.coupon_id, o = this;
            n.request({
                url: t.integral.coupon_info,
                data: {
                    coupon_id: a
                },
                success: function(t) {
                    0 == t.code && o.setData({
                        coupon: t.data.coupon,
                        info: t.data.info
                    });
                }
            });
        }
    },
    onReady: function() {},
    onShow: function() {},
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {},
    exchangeCoupon: function(e) {
        var a = this, o = a.data.coupon, s = a.data.__user_info.integral;
        if (parseInt(o.integral) > parseInt(s)) a.setData({
            showModel: !0,
            content: "当前积分不足",
            status: 1
        }); else {
            if (parseFloat(o.price) > 0) i = "需要" + o.integral + "积分+￥" + parseFloat(o.price); else var i = "需要" + o.integral + "积分";
            if (parseInt(o.total_num) <= 0) return void a.setData({
                showModel: !0,
                content: "已领完,来晚一步",
                status: 1
            });
            if (parseInt(o.num) >= parseInt(o.user_num)) return o.type = 1, void a.setData({
                showModel: !0,
                content: "兑换次数已达上限",
                status: 1
            });
            wx.showModal({
                title: "确认兑换",
                content: i,
                success: function(e) {
                    e.confirm && (parseFloat(o.price) > 0 ? (wx.showLoading({
                        title: "提交中"
                    }), n.request({
                        url: t.integral.exchange_coupon,
                        data: {
                            id: o.id,
                            type: 2
                        },
                        success: function(t) {
                            0 == t.code ? wx.requestPayment({
                                timeStamp: t.data.timeStamp,
                                nonceStr: t.data.nonceStr,
                                package: t.data.package,
                                signType: t.data.signType,
                                paySign: t.data.paySign,
                                complete: function(n) {
                                    "requestPayment:fail" != n.errMsg && "requestPayment:fail cancel" != n.errMsg ? "requestPayment:ok" == n.errMsg && (o.num = parseInt(o.num), 
                                    o.num += 1, o.total_num = parseInt(o.total_num), o.total_num -= 1, s = parseInt(s), 
                                    s -= parseInt(o.integral), a.setData({
                                        showModel: !0,
                                        status: 4,
                                        content: t.msg,
                                        coupon: o
                                    })) : wx.showModal({
                                        title: "提示",
                                        content: "订单尚未支付",
                                        showCancel: !1,
                                        confirmText: "确认"
                                    });
                                }
                            }) : a.setData({
                                showModel: !0,
                                content: t.msg,
                                status: 1
                            });
                        },
                        complete: function() {
                            wx.hideLoading();
                        }
                    })) : (wx.showLoading({
                        title: "提交中"
                    }), n.request({
                        url: t.integral.exchange_coupon,
                        data: {
                            id: o.id,
                            type: 1
                        },
                        success: function(t) {
                            0 == t.code ? (o.num = parseInt(o.num), o.num += 1, o.total_num = parseInt(o.total_num), 
                            o.total_num -= 1, s = parseInt(s), s -= parseInt(o.integral), a.setData({
                                showModel: !0,
                                status: 4,
                                content: t.msg,
                                coupon: o
                            })) : a.setData({
                                showModel: !0,
                                content: t.msg,
                                status: 1
                            });
                        },
                        complete: function() {
                            wx.hideLoading();
                        }
                    })));
                }
            });
        }
    },
    hideModal: function() {
        this.setData({
            showModel: !1
        });
    }
});