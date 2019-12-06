var e = require("../../api.js"), t = getApp(),host = require('../../config.js');

Page({
  data:{
    current:0,
    img_url:host.hostUrl,
    no_use:[],
    used:[],
    outdate:[]
  },
  onLoad:function(){
    var that = this;
    this.loadEvaluate(0,"no_use");
    this.loadEvaluate(1,"used");
    this.loadEvaluate(2,"outdate");
  },
  toggleType:function(t){
    if(t.detail.current){
      this.setData({
        current:t.detail.current
      })
    }else if(t.currentTarget.dataset.id){
      this.setData({
        current:t.currentTarget.dataset.id
      })
    }else{
      this.setData({
        current:0
      })
    }
  },
  loadEvaluate:function(status,key){
    var that = this;
    t.request({
      url:e.coupon.index,
      method:"get",
      data:{
        status:status
      },
      success:function(res){
        console.log(res);
        if(res.code == 0){
          var data = {};
          data[key] = res.data.list;
          that.setData(data);
        }
      }
    })
  }
});