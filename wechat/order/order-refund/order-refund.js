var t = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(t) {
    return typeof t;
} : function(t) {
    return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t;
}, a = require("../../api.js"), e = getApp(),host = require('../../config.js');

Page({
    data: {
        switch_tab_1: "active",
        switch_tab_2: "",
        img_url:host.hostUrl,
        goods: {
            goods_pic: "https://goss1.vcg.com/creative/vcg/800/version23/VCG21f302700c4.jpg"
        },
        refund_data_1: {},
        refund_data_2: {}
    },
    onLoad: function(t) {
        e.pageOnLoad(this);
        var i = this;
        e.request({
            url: a.order.refund_preview,
            data: {
                order_detail_id: t.id
            },
            success: function(t) {
                console.log(t);
                0 == t.code && i.setData({
                    goods: t.data
                }), 1 == t.code && wx.showModal({
                    title: "提示",
                    content: t.msg,
                    image: "/images/icon-warning.png",
                    success: function(t) {
                        t.confirm && wx.navigateBack();
                    }
                });
            }
        });
    },
    onReady: function() {},
    onShow: function() {},
    switchTab: function(t) {
        var a = this;
        1 == t.currentTarget.dataset.id ? a.setData({
            switch_tab_1: "active",
            switch_tab_2: ""
        }) : a.setData({
            switch_tab_1: "",
            switch_tab_2: "active"
        });
    },
    descInput: function(t) {
        var a = this, e = t.currentTarget.dataset.type, i = t.detail.value;
        if (1 == e) {
            var d = a.data.refund_data_1;
            d.desc = i, a.setData({
                refund_data_1: d
            });
        }
        if (2 == e) {
            var n = a.data.refund_data_2;
            n.desc = i, a.setData({
                refund_data_2: n
            });
        }
    },
    chooseImage: function(t) {
        var a = this, e = t.currentTarget.dataset.type;
        if (1 == e) {
            var i = a.data.refund_data_1, d = 0;
            i.pic_list && (d = i.pic_list.length || 0);
            s = 6 - d;
            wx.chooseImage({
                count: s,
                success: function(t) {
                    i.pic_list || (i.pic_list = []), i.pic_list = i.pic_list.concat(t.tempFilePaths), 
                    a.setData({
                        refund_data_1: i
                    });
                }
            });
        }
        if (2 == e) {
            var n = a.data.refund_data_2, d = 0;
            n.pic_list && (d = n.pic_list.length || 0);
            var s = 6 - d;
            wx.chooseImage({
                count: s,
                success: function(t) {
                    n.pic_list || (n.pic_list = []), n.pic_list = n.pic_list.concat(t.tempFilePaths), 
                    a.setData({
                        refund_data_2: n
                    });
                }
            });
        }
    },
    deleteImage: function(t) {
        var a = this, e = t.currentTarget.dataset.type, i = t.currentTarget.dataset.index;
        if (1 == e) {
            var d = a.data.refund_data_1;
            d.pic_list.splice(i, 1), a.setData({
                refund_data_1: d
            });
        }
        if (2 == e) {
            var n = a.data.refund_data_2;
            n.pic_list.splice(i, 1), a.setData({
                refund_data_2: n
            });
        }
    },
    refundSubmit: function(i) {
        var d = this, n = i.currentTarget.dataset.type;
        if (1 == n) {
            var s, o, c = function() {
                var t = function() {
                    wx.showLoading({
                        title: "正在提交",
                        mask: !0
                    }), e.request({
                        url: a.order.refund,
                        method: "post",
                        data: {
                            type: 1,
                            order_detail_id: d.data.goods.order_detail_id,
                            desc: r,
                            pic_list: JSON.stringify(u)
                        },
                        success: function(t) {
                            wx.hideLoading(), 0 == t.code && wx.showModal({
                                title: "提示",
                                content: t.msg,
                                showCancel: !1,
                                success: function(t) {
                                    t.confirm && wx.redirectTo({
                                        url: "/order/order/order?status=4"
                                    });
                                }
                            }), 1 == t.code && wx.showModal({
                                title: "提示",
                                content: t.msg,
                                showCancel: !1,
                                success: function(t) {
                                    t.confirm && wx.navigateBack({
                                        delta: 2
                                    });
                                }
                            });
                        }
                    });
                };
                if (0 == (r = d.data.refund_data_1.desc || "").length) return wx.showToast({
                    title: "请填写退款原因",
                    image: "/images/icon-warning.png"
                }), {
                    v: void 0
                };
                if (u = [], _ = 0, s = e.siteInfo, o = {}, -1 != s.uniacid && "-1" != s && (o._uniacid = s.uniacid, 
                o._acid = s.acid), d.data.refund_data_1.pic_list && d.data.refund_data_1.pic_list.length > 0) {
                    wx.showLoading({
                        title: "正在上传图片",
                        mask: !0
                    });
                    for (f in d.data.refund_data_1.pic_list) !function(e) {
                        wx.uploadFile({
                            url: a.default.upload_image,
                            filePath: d.data.refund_data_1.pic_list[e],
                            name: "image",
                            formData: o,
                            success: function(t) {},
                            complete: function(a) {
                                _++, 200 == a.statusCode && 0 == (a = JSON.parse(a.data)).code && (u[e] = a.data.url), 
                                _ == d.data.refund_data_1.pic_list.length && (wx.hideLoading(), t());
                            }
                        });
                    }(f);
                } else t();
            }();
            if ("object" === (void 0 === c ? "undefined" : t(c))) return c.v;
        }
        if (2 == n) {
            var r, u, _, f, l = function() {
                var t = function() {
                    wx.showLoading({
                        title: "正在提交",
                        mask: !0
                    }), e.request({
                        url: a.order.refund,
                        method: "post",
                        data: {
                            type: 2,
                            order_detail_id: d.data.goods.order_detail_id,
                            desc: r,
                            pic_list: JSON.stringify(u)
                        },
                        success: function(t) {
                            wx.hideLoading(), 0 == t.code && wx.showModal({
                                title: "提示",
                                content: t.msg,
                                showCancel: !1,
                                success: function(t) {
                                    t.confirm && wx.redirectTo({
                                        url: "/order/order/order?status=4"
                                    });
                                }
                            }), 1 == t.code && wx.showModal({
                                title: "提示",
                                content: t.msg,
                                showCancel: !1,
                                success: function(t) {
                                    t.confirm && wx.navigateBack({
                                        delta: 2
                                    });
                                }
                            });
                        }
                    });
                };
                if (0 == (r = d.data.refund_data_2.desc || "").length) return wx.showToast({
                    title: "请填写换货说明",
                    image: "/images/icon-warning.png"
                }), {
                    v: void 0
                };
                if (u = [], _ = 0, d.data.refund_data_2.pic_list && d.data.refund_data_2.pic_list.length > 0) {
                    wx.showLoading({
                        title: "正在上传图片",
                        mask: !0
                    });
                    for (f in d.data.refund_data_2.pic_list) !function(e) {
                        wx.uploadFile({
                            url: a.default.upload_image,
                            filePath: d.data.refund_data_2.pic_list[e],
                            name: "image",
                            success: function(t) {},
                            complete: function(a) {
                                _++, 200 == a.statusCode && 0 == (a = JSON.parse(a.data)).code && (u[e] = a.data.url), 
                                _ == d.data.refund_data_2.pic_list.length && (wx.hideLoading(), t());
                            }
                        });
                    }(f);
                } else t();
            }();
            if ("object" === (void 0 === l ? "undefined" : t(l))) return l.v;
        }
    }
});