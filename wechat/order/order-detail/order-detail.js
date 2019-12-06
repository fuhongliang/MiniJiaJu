var api = require("../../api.js"), a = getApp(),host = require('../../config.js');

Page({
    data: {
        order: null,
        img_url:host.hostUrl,
        getGoodsTotalPrice: function() {
            return this.data.order.total_price;
        },
        order_status:0
    },
    onLoad: function(e) {
        console.log(e);
        a.pageOnLoad(this);
        var o = this;
        o.setData({
            store: wx.getStorageSync("store"),
            order_status:parseInt(e.status)
        }), wx.showLoading({
            title: "正在加载"
        }), a.request({
            url: api.order.detail,
            data: {
                order_id: e.id
            },
            success: function(t) {
                console.log(t);
                0 == t.code && o.setData({
                    order: t.data
                });
                console.log(t.data);
            },
            complete: function() {
                wx.hideLoading();
            }
        });
    },
    copyText: function(t) {
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
    },
    cancelOrder:function(){
        console.log(wx.getStorageSync("store"));
        var o = this;
        console.log(o.data.order.order_id);
        wx.showModal({
            title: "提示",
            content: "是否取消该订单？",
            cancelText: "否",
            confirmText: "是",
            success: function(s) {
                if (s.cancel) return !0;
                console.log("a");
                console.log(s);
                s.confirm && (wx.showLoading({
                    title: "操作中"
                }), a.request({
                    url: api.order.revoke,
                    data: {
                        order_id: o.data.order.order_id
                    },
                    success: function(t) {
                        console.log(t);
                        wx.hideLoading(), wx.showModal({
                            title: "提示",
                            content: t.msg,
                            showCancel: !1,
                            success: function(t) {
                                wx.navigateTo({
                                    url:"/order/order/order?status=6"
                                })
                            }
                        });
                    }
                }));
            }
        });
    },
    goto_pay:function(){
        var that = this;
        wx.showModal({
            title: "提示",
            content: "选择支付方式",
            cancelText: "余额支付",
            confirmText: "微信支付",
            success: function(t) {
                wx.showLoading({
                    title: "正在提交",
                    mask: !0
                })
            console.log(t);
                if(t.confirm){
                    console.log("微信支付");
                    a.request({
                        url: api.order.pay_data,
                        data: {
                            order_id: that.data.order.order_id,
                            pay_type: "WECHAT_PAY"
                        },
                        complete: function() {
                            wx.hideLoading();
                        },
                        success: function(t) {
                            console.log(t), 0 == t.code && wx.requestPayment({
                                timeStamp: t.data.timeStamp,
                                nonceStr: t.data.nonceStr,
                                package: t.data.package,
                                signType: t.data.signType,
                                paySign: t.data.paySign,
                                success: function(t) {
                                    console.log("success"), console.log(t);
                                },
                                fail: function(t) {
                                    console.log("fail"), console.log(t);
                                },
                                complete: function(t) {
                                    console.log("complete"), console.log(t), "requestPayment:fail" != t.errMsg && "requestPayment:fail cancel" != t.errMsg ? wx.redirectTo({
                                        url: "/order/order/order?status=1"
                                    }) : wx.showModal({
                                        title: "提示",
                                        content: "订单尚未支付",
                                        showCancel: !1,
                                        confirmText: "确认",
                                        success: function(t) {
                                            t.confirm && wx.redirectTo({
                                                url: "/order/order/order?status=0"
                                            });
                                        }
                                    });
                                }
                            }), 1 == t.code && wx.showToast({
                                title: t.msg,
                                image: "/images/icon-warning.png"
                            });
                        }
                    })
                }else if(t.cancel){
                    console.log("余额支付");
                    a.request({
                        url: api.order.pay_data,
                        data: {
                            order_id: that.data.order.order_id,
                            pay_type: "BALANCE_PAY"
                        },
                        complete: function() {
                            wx.hideLoading();
                        },
                        success: function(t) {
                            console.log(t);
                            0 == t.code && wx.redirectTo({
                                url: "/order/order/order?status=1"
                            }), 1 == t.code && wx.showModal({
                                title: "提示",
                                content: t.msg,
                                showCancel: !1
                            });
                        }
                    })
                }
            }
        })
    },
    confirmReceive:function () {
        var that = this;
        wx.showModal({
            title: "提示",
            content: "是否确认已收到货？",
            cancelText: "否",
            confirmText: "是",
            success: function(s) {
                if (s.cancel) return !0;
                s.confirm && (wx.showLoading({
                    title: "操作中"
                }), a.request({
                    url: api.order.confirm,
                    data: {
                        order_id: that.data.order.order_id
                    },
                    success: function(t) {
                        wx.hideLoading(), wx.showToast({
                            title: t.msg
                        })
                    }
                }));
            }
        });
    }
});