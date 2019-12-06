var t = require("../../api.js"), e = require("../../area-picker/area-picker.js"), i = getApp(),host = require('../../config.js');

Page({
    data: {
        name: "",
        mobile: "",
        detail: "",
        district: null,
        img_url:host.hostUrl
    },
    onLoad: function(a) {
        i.pageOnLoad(this);
        var d = this;
        d.getDistrictData(function(t) {
            e.init({
                page: d,
                data: t
            });
        }), d.setData({
            address_id: a.id
        }), a.id && (wx.showLoading({
            title: "正在加载",
            mask: !0
        }), i.request({
            url: t.user.address_detail,
            data: {
                id: a.id
            },
            success: function(t) {
                wx.hideLoading(), 0 == t.code && d.setData(t.data);
            }
        }));
    },
    getDistrictData: function(e) {
        var a = wx.getStorageSync("district");
        if (!a) return wx.showLoading({
            title: "正在加载",
            mask: !0
        }), void i.request({
            url: t.default.district,
            success: function(t) {
                wx.hideLoading(), 0 == t.code && (a = t.data, wx.setStorageSync("district", a), 
                e(a));
            }
        });
        e(a);
    },
    onAreaPickerConfirm: function(t) {
        this.setData({
            district: {
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
        });
    },
    saveAddress: function() {
        var _that = this, a = /^([0-9]{6,12})$/, d = /^(\d{3,4}-\d{6,9})$/, s = /^\+?\d[\d -]{8,12}\d/;
        if (console.log(d.test(_that.data.mobile)), !a.test(_that.data.mobile) && !d.test(_that.data.mobile) && !s.test(_that.data.mobile)) return wx.showToast({
            title: "联系电话格式不正确",
            image: "/images/icon-warning.png"
        }), !1;
        wx.showLoading({
            title: "正在保存",
            mask: !0
        });
        var n = _that.data.district;
        n || (n = {
            province: {
                id: ""
            },
            city: {
                id: ""
            },
            district: {
                id: ""
            }
        }), i.request({
            url: t.user.address_save,
            method: "post",
            data: {
                address_id: _that.data.address_id || "",
                name: _that.data.name,
                mobile: _that.data.mobile,
                province_id: n.province.id,
                city_id: n.city.id,
                district_id: n.district.id,
                detail: _that.data.detail
            },
            success: function(t) {
                wx.hideLoading(), 0 == t.code && wx.navigateBack(),1 == t.code && wx.showToast({
                    title: t.msg,
                    image: "/images/icon-warning.png"
                });
            }
        });
    },
    inputBlur: function(t) {
        var e = '{"' + t.currentTarget.dataset.name + '":"' + t.detail.value + '"}';
        this.setData(JSON.parse(e));
    },
    getWechatAddress: function(e) {
        var a = this;
        wx.chooseAddress({
            success: function(e) {
                "chooseAddress:ok" == e.errMsg && (wx.showLoading(), i.request({
                    url: t.user.wechat_district,
                    data: {
                        national_code: e.nationalCode,
                        province_name: e.provinceName,
                        city_name: e.cityName,
                        county_name: e.countyName
                    },
                    success: function(t) {
                        1 == t.code && wx.showModal({
                            title: "提示",
                            content: t.msg,
                            showCancel: !1
                        }), a.setData({
                            name: e.userName || "",
                            mobile: e.telNumber || "",
                            detail: e.detailInfo || "",
                            district: t.data.district
                        });
                    },
                    complete: function() {
                        wx.hideLoading();
                    }
                }));
            }
        });
    },
    onReady: function() {},
    onShow: function() {
        i.pageOnShow(this);
    }
});