var link = require("../../api.js"), a = getApp(),host = require('../../config.js');
Page({
    data: {
        page:1,
        nomore:false,
        notice:true,
        img_url:host.hostUrl
    },
    onLoad: function(t) {
      var that = this;
       a.request({
         url:link.user_article.my_graphic,
         methods:"get",
         data:{
           page:1,
           limit:5
         },
         success(res){
           if(res.code == 0){
             that.setData({
               graphic:res.data.list
             })
           }
         }
       })
    },
    onShow: function() {

    },
    loadGraphic: function() {
      var that = this,list = this.data.graphic,i=this.data.page;
      i++;
      a.request({
        url:link.user_article.my_graphic,
        methods:"get",
        data:{
          page:i,
          limit:5
        },
        success(res){
          if(res.code === 0){
            for(var s in res.data.list){
              list.push(res.data.list[s]);
            }
            if(!res.data.list.length){
              that.setData({
                nomore:true,
                page:i
              })
            }else{
              that.setData({
                graphic:list,
                page:i
              })
              console.log(i);
              console.log(that.data.graphic);
            }
          }
        }
      })
    },
    isDelete:function(e){
      var arr = this.data.graphic,that = this;
      a.request({
        url:link.user_article.delete_graphic,
        method:"post",
        data:{
          id:e.currentTarget.dataset.id
        },
        success:function(res){
          if(res.code == 0){
            for(var i in arr){
              if(arr[i].id == e.currentTarget.dataset.id){
                arr.splice(i,1);
              }
            }
            that.setData({
              graphic:arr
            })
          }
        }
      })
    },
    closeNotice:function(){
      this.setData({
        notice:false
      })
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

    }
});
