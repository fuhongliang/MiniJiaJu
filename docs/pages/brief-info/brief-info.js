var a = getApp(),link = require("../../api.js");
Page({
    data: {
        tag:5
    },
    onLoad: function(t) {
        var that = this;
        console.log(t);
        a.request({
            url:link.user_article.discover_detail,
            methods:"get",
            data:{
                id:t.id
            },
            success(res){
                console.log(res);
                if(res.code === 0){
                     that.setData({
                        info:res.data.detail,
                        article_image:JSON.parse(res.data.detail.article_image)
                    })
                    wx.setNavigationBarTitle({
                        title:res.data.detail.created_date
                    })
                }else{
                    
                }
            },
            fail(err){
                console.log(err);
                console.log("请求失败");
            }
        })
    },
    onShow: function() {

    },
    previewImage:function(e){
        a.previewImage(e);
    },
    onPullDownRefresh: function() {

    },
    onShareAppMessage: function(t) {

    },
    onConfirm: function(t) {

    },
    onHide: function() {

    },
    onUnload: function() {

    },
    onPageScroll: function(t) {

    },
    toggleTag:function (e) {
      console.log(e);
    }
});
