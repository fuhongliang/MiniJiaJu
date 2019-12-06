var t = require("../../api.js"), new_api = require("../../newapi"), a = getApp(), e = !1, s = !1;

Page({
    data: {
        cat_list: [],
        sub_cat_list_scroll_top: 0,
        scrollLeft: 0,
        page: 1,
        cat_style: 0,
        height: 0,
        catheight: 120,
        cid:0
    },
    onLoad: function(t) {
        a.pageOnLoad(this);
        var e = wx.getStorageSync("store");
        this.setData({
            store: e
        });
    },
    onShow: function() {
        wx.hideLoading(), a.pageOnShow(this), this.newLoadData();
    },
    newLoadData: function(e) {
        var s = this;
        var i = wx.getStorageSync("cat_list");
        i && s.setData({
            cat_list: i,
            current_cat: null
        }), a.request({
            url: new_api.goods.category_list,
            data:{
                cid: s.data.cid
            },
            success: function(t) {
                0 == t.code && (s.data.cat_list = t.data,s.setData({
                    cat_list: t.data,
                    current_cat: null
                }), wx.setStorageSync("cat_list", t.data),s.catItemClick({
                    currentTarget: {
                        dataset: {
                            index: 0
                        }
                    }
                }));
                },
            complete: function() {
                wx.stopPullDownRefresh();
            }
        });
    },
    childrenCat: function(s) {
        var i = this;
        e = !1;
        i.data.page;
        a.request({
            url: new_api.goods.category_list,
            success: function(t) {
                if (0 == t.code) {
                    var a = !0;
                    for (var e in t.data) {
                        t.data[e].stc_id == s && (a = !1, i.data.current_cat = t.data[e], t.data[e].child.length > 0 ? (i.setData({
                            catheight: 100
                        }), i.firstcat({
                            currentTarget: {
                                dataset: {
                                    index: 0
                                }
                            }
                        })) : i.firstcat({
                            currentTarget: {
                                dataset: {
                                    index: 0
                                }
                            }
                        }, !1));
                        for (var c in t.data[e].child) t.data[e].child[c].stc_id == s && (a = !1, i.data.current_cat = t.data[e]);
                    }
                    a && i.setData({
                        show_no_data_tip: !0
                    });
                }
            },
            complete: function() {
                wx.stopPullDownRefresh(), wx.createSelectorQuery().select("#cat").boundingClientRect(function(t) {
                    console.log("21分类" + t.height), i.setData({
                        height: t.height
                    });
                }).exec();
            }
        });
    },
    catItemClick: function(t) {
        var a = this, e = t.currentTarget.dataset.index, s = a.data.cat_list, i = null;
        for (var c in s) c == e ? (s[c].active = !0, !1, i = s[c]) : s[c].active = !1;
        console.log(i,e), a.setData({
            cat_list: s,
            sub_cat_list_scroll_top: 0,
            current_cat: i
        });
    },
    firstcat: function(t) {
        var a = !(arguments.length > 1 && void 0 !== arguments[1]) || arguments[1], e = this.data.current_cat;
        this.setData({
            page: 1,
            goods_list: [],
            show_no_data_tip: !1,
            current_cat: a ? e : []
        });
    },
});
