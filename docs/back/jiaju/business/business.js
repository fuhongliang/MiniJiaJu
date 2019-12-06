var t = require("../../../api.js"), new_api = require("../../../newapi"), a = getApp(), e = !1, s = !1;

Page({
    data: {
        follow:false,//是否关注
        chooseSpec:0,//选择全部商品或者精选方案
        toggleHeight:"",
        business:{
            avatar:"/images/total/home_bnt_banner@2x.png",
            name:"凯鹰厨卫",
            star:5,
            score:"5.0",
            allGoods:[
                {
                    pic_url:"/images/total/home_bnt_banner@2x.png",
                    title:"北欧简约设计自如布北欧简约设计自如布",
                    price:1648
                },
                {
                    pic_url:"/images/total/home_bnt_banner@2x.png",
                    title:"北欧简约设计自如布北欧简约设计自如布",
                    price:1648
                },
                {
                    pic_url:"/images/total/home_bnt_banner@2x.png",
                    title:"北欧简约设计自如布北欧简约设计自如布",
                    price:1648
                }
            ],
            cases:[
                {
                    pic_url:"/images/total/home_bnt_banner@2x.png",
                    title:"[秒懂装修]干湿分离如何做？这3种方法简单[秒懂装修]干湿分离如何做？这3种方法简单",
                },
                {
                    pic_url:"/images/total/home_bnt_banner@2x.png",
                    title:"[秒懂装修]干湿分离如何做？这3种方法简单[秒懂装修]干湿分离如何做？这3种方法简单",
                },
                {
                    pic_url:"/images/total/home_bnt_banner@2x.png",
                    title:"[秒懂装修]干湿分离如何做？这3种方法简单[秒懂装修]干湿分离如何做？这3种方法简单",
                }
            ]
            
        }
    },
    onLoad: function(t) {
        
    },
    onShow: function() {
        console.log(this.data);
        console.log(this.data.business.allGoods.length);
        var height1 = parseInt(this.data.business.allGoods.length)*500;
        var height2 = parseInt(this.data.business.cases.length)*500;
        this.data.chooseSpec == 0?this.setData({toggleHeight:height1}):this.setData({toggleHeight:height2});
    },
    toggleFollow: function(e) {
        var follow =this.data.follow == true? false:true;
        this.setData({
            follow:follow
        })
    },
    toggleSpec:function(e){
        var chooseS = this.data.chooseSpec == 1 ? 0:1;
         this.setData({
            chooseSpec:chooseS
        })
        console.log(this.data.chooseSpec);
        console.log(e);
    },
    toggleBar:function (e){
        e.detail.current == 0?this.setData({chooseSpec:0}):this.setData({chooseSpec:1});
    }
    
})
