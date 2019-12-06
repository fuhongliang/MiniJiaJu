var link = require("../../api.js"), a = getApp();
Page({
    data: {
        page:1,
        nomore:false
    },
    onLoad: function(t) {
      var that = this;
       a.request({
         url:link.my_graphic,
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
        url:link.my_graphic,
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
