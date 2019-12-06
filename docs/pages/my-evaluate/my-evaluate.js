var e = require("../../api.js"), t = getApp();

Page({
  data:{
    current:0
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
  }
});