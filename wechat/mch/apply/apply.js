var api = require("../../api.js"),host = require('../../config.js'),
    area_picker = require("../../area-picker/area-picker.js"),
    app = getApp();
Page({
    data: {
        img_url:host.hostUrl
    },
    onLoad: function(t) {
        app.pageOnLoad(this);
        var a = this;
        a.getDistrictData(function(t) {
            area_picker.init({
                page: a,
                data: t
            })
        }), wx.showLoading({
            title: "正在加载",
            mask: !0
        }), app.request({
            url: api.mch.apply,
            success: function(t) {
                wx.hideLoading(), 0 == t.code && (t.data.apply && (t.data.show_result = !0), a.setData(t.data))
            }
        })
    },
    getDistrictData: function(a) {
        var e = wx.getStorageSync("district");
        if (!e) return wx.showLoading({
            title: "正在加载",
            mask: !0
        }), void app.request({
            url: api.
            default.district,
            success: function(t) {
                wx.hideLoading(), 0 == t.code && (e = t.data, wx.setStorageSync("district", e), a(e))
            }
        });
        a(e)
    },
    onAreaPickerConfirm: function(t) {
        this.setData({
            edit_district: {
                province: {
                    id: t[0].id,
                    name: t[0].name
                },
                city: {
                    id: t[1].id,
                    name: t[1].name
                },
                district: {
                    id: t[2].id,
                    name: t[2].name
                }
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
    onPullDownRefresh: function() {},
    onReachBottom: function() {},
    mchCommonCatChange: function(t) {
        this.setData({
            mch_common_cat_index: t.detail.value
        })
    },
    applySubmit: function(t) {
        console.log(t);
        var a = this;
        !a.data.entry_rules || a.data.agree_entry_rules ? (wx.showLoading({
            title: "正在提交",
            mask: !0
        }), app.request({
            url: api.mch.apply_submit,
            method: "post",
            data: {
                realname: t.detail.value.realname,
                tel: t.detail.value.tel,
                name: t.detail.value.name,
                province_id: t.detail.value.province_id,
                city_id: t.detail.value.city_id,
                district_id: t.detail.value.district_id,
                address: t.detail.value.address,
                mch_common_cat_id: a.data.mch_common_cat_index ? a.data.mch_common_cat_list[a.data.mch_common_cat_index].id : a.data.apply && a.data.apply.mch_common_cat_id ? a.data.apply.mch_common_cat_id : "",
                service_tel: t.detail.value.service_tel,
                form_id: t.detail.formId
            },
            success: function(t) {
                wx.hideLoading(), 0 == t.code && wx.showModal({
                    title: "提示",
                    content: t.msg,
                    showCancel: !1,
                    success: function(t) {
                        t.confirm && wx.redirectTo({
                            url: "/mch/apply/apply"
                        })
                    }
                }), 1 == t.code && a.showToast({
                    title: t.msg
                })
            }
        })) : wx.showModal({
            title: "提示",
            content: "请先阅读并同意《入驻协议》。",
            showCancel: !1
        })
    },
    hideApplyResult: function() {
        this.setData({
            show_result: !1
        })
    },
    showApplyResult: function() {
        this.setData({
            show_result: !0
        })
    },
    showEntryRules: function() {
        this.setData({
            show_entry_rules: !0
        })
    },
    disagreeEntryRules: function() {
        this.setData({
            agree_entry_rules: !1,
            show_entry_rules: !1
        })
    },
    agreeEntryRules: function() {
        this.setData({
            agree_entry_rules: !0,
            show_entry_rules: !1
        })
    }
});