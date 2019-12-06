var t = require("../../../api.js"), newapi = require("../../../newapi.js"), a = getApp(), e = !1, i = !1;
Page({
  data: {
    business: {
        pic_url:"",
        name:"",
        message:""
      },
    goods:[
      {
        pic_url:"",
        title:"",
        spec:"",
        price:"",
        num:""
      },
      ],
      totalPrice:6999,
      totalFreight:22
    },
  onPullDownRefresh: function() {
       
    },
    as:function(){
        console.log("a");
    },

  onLoad: function (options) {
    a.pageOnLoad(this);
  },

  onReady: function () {
    
  },

  onShow: function () {
    
  },

  inputMessage: function(e) {
    this.setData({
      message:e.detail.value
    });
    console.log(e);
  },

  onHide: function () {

  },

  onUnload: function () {

  },

  onPullDownRefresh: function () {

  },

  onReachBottom: function () {

  },

  onShareAppMessage: function () {

  }
});
