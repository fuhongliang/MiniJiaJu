var s = require("../../api.js"), a = getApp(),host = require('../../config.js');

Page({
    data: {
        address_list: [],
        img_url:host.hostUrl
    },
    onLoad: function(s) {
        a.pageOnLoad(this);
    },
    onReady: function() {},
    onShow: function() {
        a.pageOnShow(this);
        var e = this;
        wx.showNavigationBarLoading(), a.request({
            url: s.user.address_list,
            success: function(s) {
                wx.hideNavigationBarLoading(), 0 == s.code && e.setData({
                    address_list: s.data.list
                }), e.setData({
                    show_no_data_tip: 0 == e.data.address_list.length
                });
            }
        });
    },
    setDefaultAddress: function(e) {
        var t = this, d = e.currentTarget.dataset.index, i = t.data.address_list[d];
        wx.showLoading({
            title: "正在保存",
            mask: !0
        }), a.request({
            url: s.user.address_set_default,
            data: {
                address_id: i.id
            },
            success: function(s) {
                if (wx.hideLoading(), 0 == s.code) {
                    var a = t.data.address_list;
                    for (var e in a) a[e].is_default = e == d ? 1 : 0;
                    t.setData({
                        address_list: a
                    });
                }
            }
        });
    },
    deleteAddress: function(e) {
        var t = e.currentTarget.dataset.id;
        e.currentTarget.dataset.index;
        wx.showModal({
            title: "提示",
            content: "确认删除改收货地址？",
            success: function(e) {
                e.confirm && (wx.showLoading({
                    title: "正在删除",
                    mask: !0
                }), a.request({
                    url: s.user.address_delete,
                    data: {
                        address_id: t
                    },
                    success: function(s) {
                        0 == s.code && wx.redirectTo({
                            url: "/address/address/address"
                        }), 1 == s.code && (wx.hideLoading(), wx.showToast({
                            title: s.msg,
                            image: "/images/icon-warning.png"
                        }));
                    }
                }));
            }
        });
    }
});