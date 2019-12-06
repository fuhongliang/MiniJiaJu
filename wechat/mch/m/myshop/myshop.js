var api = require("../../../api.js"),host = require('../../../config.js'),
    app = getApp();
Page({
    data: {
        img_url:host.hostUrl
    },
    onLoad: function(a) {
        app.pageOnLoad(this);
        var t = this;
        wx.showLoading({
            title: "加载中"
        }), app.request({
            url: api.mch.user.myshop,
            success: function(a) {
                wx.hideLoading(), 0 == a.code && t.setData(a.data), -2 == a.code && wx.redirectTo({
                    url: "/mch/apply/apply"
                })
            }
        })
    },
    onReady: function() {
        app.pageOnReady(this)
    },
    onShow: function() {
        app.pageOnShow(this)
    },
    onHide: function() {
        app.pageOnHide(this)
    },
    onUnload: function() {
        app.pageOnUnload(this)
    },
    navigatorSubmit: function(a) {
        console.log(a), app.request({
            url: api.user.save_form_id + "&form_id=" + a.detail.formId
        }), wx.navigateTo({
            url: a.detail.value.url
        })
    },
    showPcUrl: function() {
        this.setData({
            show_pc_url: !0
        })
    },
    hidePcUrl: function() {
        this.setData({
            show_pc_url: !1
        })
    },
    copyPcUrl: function() {
        var t = this;
        wx.setClipboardData({
            data: t.data.pc_url,
            success: function(a) {
                t.showToast({
                    title: "内容已复制"
                })
            }
        })
    }
});