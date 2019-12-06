var e = require("../../api.js"), t = getApp(),host = require('../../config.js');

Page({
  data: {
    img_url:host.hostUrl,
    contact:"",
    telephone:"",
    message:"",
    topic_id:"",
  },
  onLoad: function(n) {
    console.log(n);
    this.setData({topic_id:n.id});
  },
  submitMsg:function(){
    var that = this,
    contact = this.data.contact,
    telephone = this.data.telephone,
    message = this.data.message;
    if(contact||telephone||message){
      t.request({
        url:e.user_article.contact_designer,
        method:"post",
        data:{
          topic_id:that.data.topic_id,
          contact:contact,
          telephone:telephone,
          message:message
        },
        success:function(res){
          console.log(res);
          if(res.code == 0){
            that.setData({
              contact:"",
              telephone:"",
              message:""
            })
            wx.showModal({
              title:"提交成功",
              content:"请保持电话畅通，设计师将与您电话联系",
              showCancel:false,
              confirmText:"知道了",
              confirmColor:"#0EC262",
              success(res){
                if(res.confirm){
                  wx.navigateBack({
                    delta: 1
                  })
                }
              }
            })
          }
        }
      })
    }else{
      wx.showToast({
        title:"输入项不能为空"
      })
    }
  },
  inputName:function(e){
    this.setData({
      contact:e.detail.value
    })
  },
  inputPhone:function(e){
    this.setData({
      telephone:e.detail.value
    })
  },
  inputMessage:function(e){
    this.setData({
      message:e.detail.value
    })
  },
  onReady: function() {},
  onShow: function() {},
  onHide: function() {},
  onUnload: function() {},
  onPullDownRefresh: function() {},
  onReachBottom: function() {},
});