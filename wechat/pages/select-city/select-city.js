var t = require("../../api.js"), a = getApp();

Page({
    data: {
        load_more_count: 0,
        last_load_more_time: 0,
        is_loading: !1,
        loading_class: "",
        cat_id: !1,
        keyword: !1,
        page: 1,
        limit: 20,
        goods_list: [],
        show_history: !0,
        show_result: !1,
        history_list: [],
        is_search: !0,
        city_list:[],
        current_district:"",
    },
    onLoad: function(t) {
        a.pageOnLoad(this);
        var _that = this;
        _that.setData({current_district:wx.getStorageSync("current_district")});
        a.request({
            url: getApp().api.default.district_list,
            data: {},
            success: function(res) {
                console.log(res)
                0 == res.code && _that.setData({district_list:res.data});
            }
        });
    },
    onReady: function() {},
    onShow: function() {
        a.pageOnShow(this);
        var t = this;
    },
    selectCity:function(e) {
        var current_district = e.currentTarget.dataset.district;
        wx.setStorageSync("current_district",current_district);
        wx.reLaunch({
            url: '/pages/index/index'
        })
    },
});