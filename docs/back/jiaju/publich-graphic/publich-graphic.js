var a = getApp(),link = require("../../../api.js");

Page({
    data: {
       uploadImg:"/images/total/fabu_add@2x.png",
       uploadedImgs:[],
       content:"",
        image:[]
    },
    onLoad: function(t) {
        console.log('fdsfsfdsfd',t)
    },
    onShow: function() {

    },
    onPullDownRefresh: function() {

    },
    testPublish: function(e) {
        this.setData({
            image:this.image.push('http://xxxxxx.jpg')
        })
        console.log(this.data.image);
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
                    if(that.data.content == ""||that.data.uploadedImgs==[]){
                        
                    }else{
                        if(that.data.uploadedImgs.length>3){
                            console.log("图片数量太多");
                            wx.showToast({
                              title: "图片超过3张",
                              icon:"info"
                            })
                        }else{
                            a.request({
                                url: link.publish,
                                method:"post",
                                data:{
                                    article_content:that.data.content,
                                    article_image:that.data.uploadedImgs
                                },
                                success: function(e) {
                                    console.log(e);
                                    if(e.data.code === 0){
                                        wx.showToast({
                                            title:"发布成功"
                                        })
                                        that.setData({
                                            content:"",
                                            uploadedImgs:[]
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
