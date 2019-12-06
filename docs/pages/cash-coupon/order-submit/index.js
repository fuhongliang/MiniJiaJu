var o = require("../../../api.js"), t = getApp(),host = require('../../config.js');

Page({
    data: {
        coupon: {},
        coupon_id:0,
        num:1,
        total_price:0,
        show_payment: !1,
        payment: -1,
        pay_type_list: {},
        other_mobile: "",
        img_url:host.hostUrl
    },
    onLoad: function(n) {
        console.log(n);
        console.log(t);
        this.setData({
            coupon_id: n.coupon_id || 0
        }),
        t.pageOnLoad(this);
        var _this = this;
        wx.showLoading({
            mask: !0
        }), t.request({
            url: o.cash_coupon.cash_coupon_info,
            data:{
                id: this.data.coupon_id
            },
            success: function(o) {
                console.log(o);
                0 == o.code && (_this.setData({
                    coupon: o.data.info,
                    total_price: o.data.info.coupon_price,
                    pay_type_list: o.data.pay_type_list
                }), console.log(o.data.info));
            },
            complete: function() {
                wx.hideLoading();
            }
        });
    },
    loadData: function(a) {
        var n = this;
        t.request({
            url: o.user.index,
            success: function(e) {
                0 == e.code && (wx.setStorageSync("pages_user_user", e.data),
                    wx.setStorageSync("share_setting", e.data.share_setting), wx.setStorageSync("user_info", e.data.user_info),
                    console.log(e.data));
            }
        });
    },
    onReady: function() {},
    onShow: function() {
        t.pageOnShow(this), this.loadData();
    },
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {},
    otherMobile: function (t) {
        this.setData({
            other_mobile: t.detail.value
        });
    },
    cartLess: function(t) {
        var a = this;
        var num = a.data.num;
        var coupon_price = a.data.coupon.coupon_price;
        if (num == 1) {
            return ;
        } else {
            var tmp = (num -1)*coupon_price;
            a.setData({
                total_price: tmp.toFixed(2),
                num: num-1
            });
        }
    },
    cartAdd: function(t) {
        var a = this;
        var num = a.data.num;
        var coupon_price = a.data.coupon.coupon_price;
        var tmp = (num +1)*coupon_price;
        a.setData({
            total_price: tmp.toFixed(2),
            num: num+1
        });
    },
    showPayment: function() {
        this.setData({
            show_payment: !0
        });
    },
    payPicker: function(t) {
        var a = t.currentTarget.dataset.index;
        this.setData({
            payment: a,
            show_payment: !1
        });
    },
    check:function(h){
        var _this = this;
        if (!_this.data.other_mobile || void 0 == _this.data.other_mobile) return void wx.showToast({
            title: "请填写会员手机号",
            image: "/images/icon-warning.png"
        });
        if (!/^\+?\d[\d -]{8,12}\d/.test(_this.data.other_mobile)) return void wx.showModal({
            title: "提示",
            content: "会员手机号格式不正确",
            showCancel: !1
        });
        t.request({
            url: o.cash_coupon.cash_submit_check,
            data: {
                mobile: _this.data.other_mobile,
                coupon_id: _this.data.coupon_id,
                num: _this.data.num
            },
            success: function (r) {
                if (0 == r.code) {
                    _this.orderSubmit(h);
                } else if(2 == r.code) {
                    return void wx.showModal({
                        title: '温馨提示',
                        content: r.msg,
                        success: function (sm) {
                            if (sm.confirm) {
                                _this.orderSubmit(h);
                            } else {
                                console.log(sm);
                            }
                        }
                    });
                } else{
                    return void wx.showModal({
                        title: "提示",
                        content: r.msg,
                        showCancel: !1
                    });
                }
            }
        });
    },
    orderSubmit: function(h) {
        var a = this ,orderData = {};
        orderData.coupon = JSON.stringify(a.data.coupon);
        orderData.num = a.data.num;
        orderData.mobile = a.data.other_mobile;
        orderData.payment = a.data.payment;
        console.log(h);
        if (orderData.payment === -1) {
            return void wx.showModal({
                title: "提示",
                content: "请选择支付方式",
                showCancel: !1
            });
        }
        if (a.data.payment === 3) {
            var i = wx.getStorageSync("user_info");
            wx.showModal({
                title: "当前账户余额：" + i.money,
                content: "是否使用余额",
                success: function (i) {
                    i.confirm && (wx.showLoading({
                        title: "正在提交",
                        mask: !0
                    }), t.request({
                        method: "post",
                        url: o.cash_coupon.cash_order_submit,
                        data: orderData,
                        complete: function () {
                            wx.hideLoading();
                        },
                        success: function (e) {
                            console.log(e);
                            0 == e.code && wx.redirectTo({
                                url: "/pages/cash-coupon/order/coupon?status=1"
                            }), 1 == e.code && wx.showModal({
                                title: "提示",
                                content: e.msg,
                                showCancel: !1
                            });
                        }
                    }));
                }
            });
        } else {
            t.request({
                method: "post",
                url: o.cash_coupon.cash_order_submit,
                data: orderData,
                complete: function() {
                    wx.hideLoading();
                },
                success: function(e) {
                    0 == e.code && wx.requestPayment({
                        timeStamp: e.data.timeStamp,
                        nonceStr: e.data.nonceStr,
                        package: e.data.package,
                        signType: e.data.signType,
                        paySign: e.data.paySign,
                        success: function(e) {
                            console.log("success"), console.log(e);
                        },
                        fail: function(e) {
                            console.log("fail"), console.log(e);
                        },
                        complete: function(e) {
                            "requestPayment:fail" != e.errMsg && "requestPayment:fail cancel" != e.errMsg ? wx.redirectTo({
                                url: "/pages/cash-coupon/order/coupon?status=1"
                            }) : wx.showModal({
                                title: "提示",
                                content: "支付失败",
                                showCancel: !1,
                                confirmText: "确认",
                                success: function(e) {
                                    e.confirm && wx.redirectTo({
                                        url: "pages/cash-coupon/list/coupon-list"
                                    });
                                }
                            });
                        }
                    }), 1 == e.code && wx.showToast({
                        title: e.msg,
                        image: "/images/icon-warning.png"
                    });
                }
            });
        }
    }
});