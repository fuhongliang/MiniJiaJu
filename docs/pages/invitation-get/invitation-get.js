var e = require("../../api.js"), t = getApp(),host = require('../../config.js');

Page({
  data:{
    isGet:false,
    img_url:host.hostUrl
  },
  gotoGet:function(){
    this.setData({
      isGet:true
    })
  },
  hide:function(){
    this.setData({
      isGet:false
    })
  }
  
});