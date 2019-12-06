var link = require("../../api.js"), t = getApp(),host = require('../../config.js');

Page({
  data:{
    isGet: [],
    img_url:host.hostUrl,
    evaluate:[1,2,3],
    evaluate_list:[]
  },
  onLoad: function (e) {
    var that = this;
    t.pageOnLoad(this);
    this.loadEvaluate();
  },
  loadEvaluate:function(){
    var that = this;
    t.request({
      url:link.default.coupon_list,
      data:{
        type:2
      },
      methods:"get",
      success: function(res) {
        console.log(res);
        if(res.code == 0){
          var list = [];
          for(var i in res.data.list){
            if(parseInt(res.data.list[i].is_receive) === 1){
              list.push(parseInt(i));
              console.log(list);
              console.log(parseInt(res.data.list[i].is_receive));
              that.setData({
                isGet:list
              })
            }
          }
          that.setData({
            evaluate_list:res.data.list
          })
        }
      }
    })
  },
  gotoGet:function(e){
    let that = this;
    t.request({
      url:link.coupon.receive,
      data:{
        id:e.currentTarget.dataset.eid
      },
      method:"get",
      success:function(res){
        console.log(res);
        if(res.code == 0){
          let isGet = that.data.isGet;
          console.log(isGet);
          let id = e.currentTarget.dataset.id;
          let index = isGet.indexOf(id);
          index === -1 ? isGet.push(parseInt(id)) : isGet.splice(index, 1);
          that.setData({
            isGet
          });
          console.log(isGet);
          wx.showToast({
            icon: "success",
            title: "领取成功"
          });
        }else{
          wx.showToast({
            icon:"none",
            title:res.msg
          })
        }
      }
    })
    
  },
  gotoGetAll:function(e){
    var list = this.data.isGet;
    for(var i in this.data.evaluate){
      let index = list.indexOf(i);
      index === -1 ? list.push(parseInt(i)) : list.splice(index, 1);
    }
    this.setData({
      isGet:list
    })
    wx.showToast({
      icon: "success",
      title: "领取成功"
    });
  }
});