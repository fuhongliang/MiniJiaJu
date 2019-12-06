var link = require("../../api.js"), a = getApp();

Page({
    data: {
        mode:0,//0是图文  1是装修方案
        page1:1,
        page2:1,
        nomore:false
    },
    onLoad: function(s) {
        
    },
    onReady: function() {
        var that = this;
        a.request({
            url:link.user_article.discover,
            methods:"get",
            data:{
                page:1,
                limit:6
            },
            success(res){
                var image_list1 = [];
                var image_list2 = [];
                for(var l in res.data.list){
                    if(l%2 === 0){
                        image_list1.push(res.data.list[l]);
                    }else if(l%2 === 1){
                        image_list2.push(res.data.list[l]);
                    }
                }
                console.log(image_list1,image_list2);
                if(res.code === 0){
                    that.setData({
                        image_list1:image_list1,
                        image_list2:image_list2,
                    })
                }
            }
        })
        a.request({
            url:link.default.topic_list,
            methods:"get",
            data:{
                page:1,
                limit:6
            },
            success(res){
                if(res.code === 0){
                    that.setData({
                        cases:res.data.list
                    })
                }
            }
        })
    },
    onShow: function() {
 
    },
    loadDiscover:function() {
        var that = this;
        var dataList = this.data.image_list;
        var i = this.data.page1;
        i++;
        a.request({
            url:link.user_article.discover,
            methods:"get",
            data:{
              page:i,
              limit:6
            },
            success(res){
                var list1 = that.data.image_list1,list2 = that.data.image_list2;
                if(res.code === 0){
                    if(!res.data.list.length){
                        that.setData({
                            nomore:true,
                            page1:i
                        })
                    }else{
                        for(var s in res.data.list){
                            if(s%2 === 0){
                                list1.push(res.data.list[s]);
                            }else if(s%2 === 1){
                                list2.push(res.data.list[s]);
                            }
                        }
                        that.setData({
                            image_list1:list1,
                            image_list2:list2,
                            page1:i
                        });
                    }
                }
                console.log(i);
                console.log(that.data.image_list1,that.data.image_list2);
            }
        })
    },
    loadCases:function() {
        var that = this;
        var dataList = this.data.image_list;
        var i = this.data.page2;
        i++;
        a.request({
            url:link.default.topic_list,
            methods:"get",
            data:{
              page2:i,
              limit:6
            },
            success(res){
                var list = that.data.cases;
                if(res.code === 0){
                    console.log(res.data.list);
                    if(!res.data.list.length){
                        that.setData({
                            nomore:true,
                            page2:i,
                        })
                    }else{
                        for(var s in res.data.list){
                            list.push(res.data.list[s]);
                        }
                        that.setData({
                            cases:list,
                            page2:i
                        });
                        console.log(that.data.cases);
                        console.log(i);
                    }
                }
            }
        })
    },
    toggleTypes:function(e) {
        this.setData({
            mode:e.detail.current
        })
    },
    toggleBar:function(e){
        if(e.currentTarget.dataset.mode == 0){
            this.setData({
                mode:0
            })
        }else if(e.currentTarget.dataset.mode == 1){
            this.setData({
                mode:1
            })
        }
    }
});