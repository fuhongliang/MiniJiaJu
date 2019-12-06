var a = getApp(),link = require("../../api.js"),host = require('../../config.js');

Page({
    data: {
       uploadImg:host.hostUrl+"/fabu_add@2x.png",
       uploadedImgs:[],
       content:"",
       img_url:host.hostUrl
    },
    onLoad: function(t) {
       

    },
    onShow: function() {

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
    bindTextAreaBlur:function(e){
        this.setData({
            content:e.detail.value
        })
    },
    bindUploadImg:function (e) {
        var that = this;
             a.uploader.upload({
                start:function(r){
                    wx.showLoading({
                      title: "正在上传",
                      mask: !0
                    })
                },
                success:function(r) {
                    let tmp = that.data.uploadedImgs;
                    tmp.push(r.data.url);
                    if(0 == r.code){
                        that.setData({
                          uploadedImgs:tmp
                        })
                    }else{
                        wx.showToast({
                            title: r.msg
                        })
                    }
                },
                error:function(r) {
                    console.log(r);
                    wx.showToast({
                      title: r
                    })
                },
                complete: function () {
                  wx.hideLoading();
                }
            })

    },
    bindPublish:function(){
        var that = this;
        wx.showModal({
            title:"确认发布？",
            success(res){
                if(res.confirm){
                    console.log(that.data.content);
                    console.log(that.data.uploadedImgs);
                    if(that.data.content == ""||!that.data.uploadedImgs.length){
                        wx.showToast({
                            title:"图片或内容为空",
                            icon:"none"
                        })
                    }else{
                        if(that.data.uploadedImgs.length>3){
                            console.log("图片数量太多");
                            wx.showToast({
                              title: "图片超过3张",
                              icon:"info"
                            })
                        }else{
                            var msg = JSON.stringify(that.data.uploadedImgs);
                            console.log(msg);
                            a.request({
                                url: link.user_article.publish,
                                method:"post",
                                data:{
                                    article_content:that.data.content,
                                    article_image:msg
                                },
                                success: function(e) {
                                    console.log(e);
                                    if(e.code === 0){
                                        wx.showToast({
                                            title:"发布成功"
                                        })
                                        that.setData({
                                            content:"",
                                            uploadedImgs:[]
                                        })
                                        wx.navigateTo({
                                            url:"/pages/discover/discover"
                                        })
                                    }else{
                                        
                                    }
                                }
                            });
                        }
                    }
                }else if(res.cancel){
                    return
                }
            }
        })

    },
    deleteImge:function (e) {
        var tmp = this.data.uploadedImgs;
        tmp.splice(e.currentTarget.dataset.index,1);
        this.setData({
            uploadedImgs:tmp
        })
        console.log(this.data.uploadedImgs);
    }
});
