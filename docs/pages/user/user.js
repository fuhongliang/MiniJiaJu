var e = require("../../api.js"), t = getApp();

Page({
    data: {
        contact_tel: "",
        show_customer_service: 0
    },
    onLoad: function(e) {
        t.pageOnLoad(this);
    },
    loadData: function(a) {
        var n = this;
        n.setData({
            store: wx.getStorageSync("store")
        });
        var o = wx.getStorageSync("pages_user_user");
        o && n.setData(o), t.request({
            url: e.user.index,
            success: function(e) {
                console.log(e);
                0 == e.code && (n.setData(e.data), wx.setStorageSync("pages_user_user", e.data), 
                wx.setStorageSync("share_setting", e.data.share_setting), wx.setStorageSync("user_info", e.data.user_info), 
                console.log(e.data));
            }
        });
    },
    onReady: function() {},
    onShow: function() {
        t.pageOnShow(this), this.loadData();
    },
    callTel: function(e) {
        var t = e.currentTarget.dataset.tel;
        wx.makePhoneCall({
            phoneNumber: t
        });
    },
    apply: function(a) {
        var n = wx.getStorageSync("share_setting"), o = wx.getStorageSync("user_info");
        console.log(a), 1 == n.share_condition ? wx.navigateTo({
            url: "/pages/add-share/index"
        }) : 0 != n.share_condition && 2 != n.share_condition || (0 == o.is_distributor ? wx.showModal({
            title: "申请成为土专家",
            content: "是否申请？",
            success: function(s) {
                s.confirm && (wx.showLoading({
                    title: "正在加载",
                    mask: !0
                }), t.request({
                    url: e.share.join,
                    method: "POST",
                    data: {
                        form_id: a.detail.formId
                    },
                    success: function(e) {
                        console.log(e);
                        0 == e.code && (0 == n.share_condition ? (o.is_distributor = 2, wx.navigateTo({
                            url: "/pages/add-share/index"
                        })) : (o.is_distributor = 1, wx.navigateTo({
                            url: "/pages/share/index"
                        })), wx.setStorageSync("user_info", o));
                    },
                    complete: function() {
                        wx.hideLoading();
                    }
                }));
            }
        }) : wx.navigateTo({
            url: "/pages/add-share/index"
        }));
    },
    verify: function(e) {
        wx.scanCode({
            onlyFromCamera: !1,
            success: function(e) {
                console.log(e), wx.navigateTo({
                    url: "/" + e.path
                });
            },
            fail: function(e) {
                wx.showToast({
                    title: "失败"
                });
            }
        });
    },
    member: function() {
        wx.navigateTo({
            url: "/pages/member/member"
        });
    },
    integral_mall: function(e) {
      var user_info = this.data.user_info;
        t.permission_list && t.permission_list.length && function(e, t) {
            return -1 != ("," + e.join(",") + ",").indexOf("," + t + ",");
        }(t.permission_list, "integralmall") && (user_info.level>0) && wx.navigateTo({
            url: "/pages/integral-mall/index/index"
        });
    }
});