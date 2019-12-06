var t = require("../../api.js"), n = getApp(),host = require('../../config.js');

Page({
    data: {
        article_list: [],
        cat_id:0,
        img_url:host.hostUrl
    },
    onLoad: function(a) {
        n.pageOnLoad(this);
        var i = this;
        var articleCat = a.articleCat || 2;
        if(articleCat == 4)wx.setNavigationBarTitle({title: '热点列表'});
        if(articleCat == 5)wx.setNavigationBarTitle({title: '公告列表'});
        wx.showLoading(), n.request({
            url: t.default.article_list,
            data: {
                cat_id: articleCat
            },
            success: function(t) {
                wx.hideLoading(), i.setData({
                    article_list: t.data.list
                });
            }
        });
    },
    onReady: function() {},
    onShow: function() {},
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {}
});